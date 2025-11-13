import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PocProgressBar } from "@/components/poc/PocProgressBar";
import { VisualStyleCard } from "@/components/poc/VisualStyleCard";

interface InteractiveAppPocFormProps {
  children: React.ReactNode;
}

interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  
  // Step 2
  problem: string;
  
  // Step 3
  targetAudience: string;
  
  // Step 4
  features: Array<{
    text: string;
    isImportant: boolean;
  }>;
  
  // Step 5
  leadData: {
    basicContact: string[];
    additionalInfo: string[];
    otherData: string;
  };
  
  // Step 6
  leadType: 'contact' | 'registration' | 'demo' | 'quote' | 'subscription' | 'other' | '';
  leadTypeOther: string;
  
  // Step 7
  appType: 'web' | 'mobile' | 'both' | '';
  
  // Step 8
  screens: string[];
  screensDescription: string;
  
  // Step 9
  visualStyle: 'modern' | 'minimal' | 'colorful' | 'professional' | '';
  primaryColor: string;
  secondaryColor: string;
  inspirationLinks: string;
  
  // Step 10
  timeline: 'express' | 'standard' | 'comfort' | 'specific' | '';
  specificDate?: Date;
  deadlineNotes: string;
}

export const InteractiveAppPocForm = ({ children }: InteractiveAppPocFormProps) => {
  const { t } = useTranslation('interactiveAppPoc');
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    problem: '',
    targetAudience: '',
    features: [
      { text: '', isImportant: false },
      { text: '', isImportant: false },
      { text: '', isImportant: false },
    ],
    leadData: {
      basicContact: ['email', 'phone'],
      additionalInfo: [],
      otherData: '',
    },
    leadType: '',
    leadTypeOther: '',
    appType: '',
    screens: ['', '', ''],
    screensDescription: '',
    visualStyle: '',
    primaryColor: '#0D9488',
    secondaryColor: '#6366F1',
    inspirationLinks: '',
    timeline: '',
    specificDate: undefined,
    deadlineNotes: '',
  });

  const steps = [
    t('steps.contact'),
    t('steps.problem'),
    t('steps.audience'),
    t('steps.features'),
    t('steps.leads'),
    t('steps.leadType'),
    t('steps.appType'),
    t('steps.screens'),
    t('steps.style'),
    t('steps.timeline'),
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === totalSteps) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.name || formData.name.length < 2) {
          toast({ title: t('validation.nameRequired'), variant: "destructive" });
          return false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
          toast({ title: t('validation.emailInvalid'), variant: "destructive" });
          return false;
        }
        if (!formData.phone) {
          toast({ title: t('validation.phoneRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 2:
        if (!formData.problem || formData.problem.length < 100) {
          toast({ title: t('validation.problemMin'), variant: "destructive" });
          return false;
        }
        return true;

      case 3:
        if (!formData.targetAudience || formData.targetAudience.length < 20) {
          toast({ title: t('validation.audienceMin'), variant: "destructive" });
          return false;
        }
        return true;

      case 4:
        const validFeatures = formData.features.filter(f => f.text.length >= 5);
        if (validFeatures.length < 3) {
          toast({ title: t('validation.featuresMin'), variant: "destructive" });
          return false;
        }
        return true;

      case 5:
        if (formData.leadData.basicContact.length === 0 && formData.leadData.additionalInfo.length === 0) {
          toast({ title: t('validation.leadsRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 6:
        if (!formData.leadType) {
          toast({ title: t('validation.leadTypeRequired'), variant: "destructive" });
          return false;
        }
        if (formData.leadType === 'other' && !formData.leadTypeOther) {
          toast({ title: t('validation.leadTypeOtherRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 7:
        if (!formData.appType) {
          toast({ title: t('validation.appTypeRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 8:
        const validScreens = formData.screens.filter(s => s.length >= 5);
        if (validScreens.length < 3) {
          toast({ title: t('validation.screensMin'), variant: "destructive" });
          return false;
        }
        return true;

      case 9:
        if (!formData.visualStyle) {
          toast({ title: t('validation.styleRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 10:
        if (!formData.timeline) {
          toast({ title: t('validation.timelineRequired'), variant: "destructive" });
          return false;
        }
        if (formData.timeline === 'specific' && !formData.specificDate) {
          toast({ title: t('validation.dateRequired'), variant: "destructive" });
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("leads").insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        problem: formData.problem,
        service: "Interactive App PoC",
        source_form: "interactive_app_poc",
        metadata: {
          targetAudience: formData.targetAudience,
          features: formData.features.filter(f => f.text.length > 0),
          leadData: formData.leadData,
          leadType: formData.leadType,
          leadTypeOther: formData.leadTypeOther,
          appType: formData.appType,
          screens: formData.screens.filter(s => s.length > 0),
          screensDescription: formData.screensDescription,
          visualStyle: formData.visualStyle,
          primaryColor: formData.primaryColor,
          secondaryColor: formData.secondaryColor,
          inspirationLinks: formData.inspirationLinks,
          timeline: formData.timeline,
          specificDate: formData.specificDate?.toISOString(),
          deadlineNotes: formData.deadlineNotes,
          price: "2100 PLN / 488 EUR"
        }
      }]);

      if (error) throw error;

      toast({
        title: t('success.title'),
        description: t('success.message'),
      });

      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('error.title'),
        description: t('error.message'),
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      problem: '',
      targetAudience: '',
      features: [
        { text: '', isImportant: false },
        { text: '', isImportant: false },
        { text: '', isImportant: false },
      ],
      leadData: {
        basicContact: ['email', 'phone'],
        additionalInfo: [],
        otherData: '',
      },
      leadType: '',
      leadTypeOther: '',
      appType: '',
      screens: ['', '', ''],
      screensDescription: '',
      visualStyle: '',
      primaryColor: '#0D9488',
      secondaryColor: '#6366F1',
      inspirationLinks: '',
      timeline: '',
      specificDate: undefined,
      deadlineNotes: '',
    });
  };

  const addFeature = () => {
    if (formData.features.length < 6) {
      setFormData({
        ...formData,
        features: [...formData.features, { text: '', isImportant: false }]
      });
    }
  };

  const updateFeature = (index: number, field: 'text' | 'isImportant', value: string | boolean) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const addScreen = () => {
    if (formData.screens.length < 8) {
      setFormData({
        ...formData,
        screens: [...formData.screens, '']
      });
    }
  };

  const updateScreen = (index: number, value: string) => {
    const newScreens = [...formData.screens];
    newScreens[index] = value;
    setFormData({ ...formData, screens: newScreens });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({
      ...formData,
      targetAudience: formData.targetAudience 
        ? `${formData.targetAudience}, ${suggestion}` 
        : suggestion
    });
  };

  const handleLeadDataChange = (category: 'basicContact' | 'additionalInfo', item: string, checked: boolean | 'indeterminate') => {
    const currentArray = formData.leadData[category];
    const newArray = checked === true
      ? [...currentArray, item]
      : currentArray.filter(i => i !== item);
    
    setFormData({
      ...formData,
      leadData: {
        ...formData.leadData,
        [category]: newArray
      }
    });
  };

  const renderLeftContent = () => (
    <div className="bg-muted/30 p-3 sm:p-6 lg:p-12 flex flex-col">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
        <span className="text-primary text-xl sm:text-2xl font-bold">P</span>
      </div>
      <div className="text-5xl sm:text-6xl lg:text-8xl font-bold text-primary mb-4 sm:mb-6">
        {currentStep}
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4 break-words">
        {t(`step${currentStep}.title`)}
      </h2>
      <p className="text-muted-foreground text-xs sm:text-sm lg:text-base break-words">
        {t(`step${currentStep}.description`)}
      </p>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">{t('step1.fields.name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('step1.placeholders.name')}
                className="max-w-full"
              />
            </div>
            <div>
              <Label htmlFor="email">{t('step1.fields.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('step1.placeholders.email')}
                className="max-w-full"
              />
            </div>
            <div>
              <Label htmlFor="phone">{t('step1.fields.phone')}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('step1.placeholders.phone')}
                className="max-w-full"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="problem">{t('step2.field')}</Label>
              <Textarea
                id="problem"
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder={t('step2.placeholder')}
                className="min-h-[200px] max-w-full"
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('step2.charCounter', { current: formData.problem.length, max: 1000 })}
              </p>
              {formData.problem.length < 100 && (
                <p className="text-xs text-destructive mt-1">{t('step2.minChars')}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="targetAudience">{t('step3.field')}</Label>
              <Textarea
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder={t('step3.placeholder')}
                className="min-h-[120px] max-w-full"
              />
            </div>
            <div>
              <Label className="text-sm">{t('step3.suggestions.title')}</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['entrepreneurs', 'students', 'parents', 'freelancers', 'b2b', 'b2c'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(t(`step3.suggestions.${suggestion}`))}
                    className="text-xs sm:text-sm"
                  >
                    {t(`step3.suggestions.${suggestion}`)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={index} className="space-y-2">
                <Label>{t('step4.fields.feature')} {index + 1}</Label>
                <Input
                  value={feature.text}
                  onChange={(e) => updateFeature(index, 'text', e.target.value)}
                  placeholder={t(`step4.placeholders.feature${Math.min(index + 1, 5)}`)}
                  className="max-w-full"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={feature.isImportant}
                    onCheckedChange={(checked) => updateFeature(index, 'isImportant', checked as boolean)}
                  />
                  <Label className="text-sm">{t('step4.importantLabel')}</Label>
                </div>
              </div>
            ))}
            {formData.features.length < 6 && (
              <Button type="button" variant="ghost" onClick={addFeature} className="w-full">
                + {t('step4.addMore')}
              </Button>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-3 block">{t('step5.basicContact')}</Label>
              <div className="space-y-3">
                {['email', 'phone', 'company', 'position'].map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.leadData.basicContact.includes(item)}
                      onCheckedChange={(checked) => handleLeadDataChange('basicContact', item, checked)}
                    />
                    <Label className="text-sm">{t(`step5.fields.${item}`)}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">{t('step5.additionalInfo')}</Label>
              <div className="space-y-3">
                {['budget', 'timeline', 'requirements', 'source'].map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.leadData.additionalInfo.includes(item)}
                      onCheckedChange={(checked) => handleLeadDataChange('additionalInfo', item, checked)}
                    />
                    <Label className="text-sm">{t(`step5.fields.${item}`)}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="otherData">{t('step5.otherLabel')}</Label>
              <Textarea
                id="otherData"
                value={formData.leadData.otherData}
                onChange={(e) => setFormData({
                  ...formData,
                  leadData: { ...formData.leadData, otherData: e.target.value }
                })}
                placeholder={t('step5.otherPlaceholder')}
                className="max-w-full"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <RadioGroup
              value={formData.leadType}
              onValueChange={(value) => setFormData({ ...formData, leadType: value as any })}
            >
              {['contact', 'registration', 'demo', 'quote', 'subscription', 'other'].map(type => (
                <div key={type} className="flex items-start space-x-3 mb-4 p-3 rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={type} id={type} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={type} className="text-base font-semibold cursor-pointer">
                      {t(`step6.types.${type}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(`step6.types.${type}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            {formData.leadType === 'other' && (
              <div className="mt-4">
                <Label htmlFor="leadTypeOther">{t('step6.otherLabel')}</Label>
                <Input
                  id="leadTypeOther"
                  value={formData.leadTypeOther}
                  onChange={(e) => setFormData({ ...formData, leadTypeOther: e.target.value })}
                  placeholder={t('step6.otherPlaceholder')}
                  className="max-w-full"
                />
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <RadioGroup
              value={formData.appType}
              onValueChange={(value) => setFormData({ ...formData, appType: value as any })}
            >
              {['web', 'mobile', 'both'].map(type => (
                <div key={type} className="flex items-start space-x-3 mb-6 p-4 rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={type} id={type} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={type} className="text-lg font-semibold cursor-pointer">
                      {t(`step7.types.${type}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t(`step7.types.${type}.description`)}
                    </p>
                    {type === 'web' && (
                      <ul className="text-xs text-muted-foreground mt-2 ml-4 space-y-1">
                        <li>• {t('step7.types.web.benefit1')}</li>
                        <li>• {t('step7.types.web.benefit2')}</li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {formData.screens.map((screen, index) => (
                <div key={index}>
                  <Label>{t('step8.screenLabel')} {index + 1}</Label>
                  <Input
                    value={screen}
                    onChange={(e) => updateScreen(index, e.target.value)}
                    placeholder={t(`step8.placeholders.screen${Math.min(index + 1, 5)}`)}
                    className="max-w-full"
                  />
                </div>
              ))}
            </div>
            {formData.screens.length < 8 && (
              <Button type="button" variant="ghost" onClick={addScreen} className="w-full">
                + {t('step8.addMore')}
              </Button>
            )}
            <div className="mt-6">
              <Label htmlFor="screensDescription">{t('step8.descriptionLabel')}</Label>
              <Textarea
                id="screensDescription"
                value={formData.screensDescription}
                onChange={(e) => setFormData({ ...formData, screensDescription: e.target.value })}
                placeholder={t('step8.descriptionPlaceholder')}
                rows={6}
                className="max-w-full"
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-3 block">{t('step9.styleLabel')}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['modern', 'minimal', 'colorful', 'professional'].map(style => (
                  <VisualStyleCard
                    key={style}
                    title={t(`step9.styles.${style}.title`)}
                    description={t(`step9.styles.${style}.description`)}
                    selected={formData.visualStyle === style}
                    onClick={() => setFormData({ ...formData, visualStyle: style as any })}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">{t('step9.primaryColorLabel')}</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    placeholder="#0D9488"
                    className="flex-1"
                  />
                  <Input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-16"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="secondaryColor">{t('step9.secondaryColorLabel')}</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondaryColor"
                    type="text"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    placeholder="#6366F1"
                    className="flex-1"
                  />
                  <Input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="w-16"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="inspirationLinks">{t('step9.inspirationLabel')}</Label>
              <Textarea
                id="inspirationLinks"
                value={formData.inspirationLinks}
                onChange={(e) => setFormData({ ...formData, inspirationLinks: e.target.value })}
                placeholder={t('step9.inspirationPlaceholder')}
                className="max-w-full"
              />
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <RadioGroup
              value={formData.timeline}
              onValueChange={(value) => setFormData({ ...formData, timeline: value as any })}
            >
              <div className="flex items-start space-x-3 mb-4 p-3 rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="express" id="express" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="express" className="text-base font-semibold cursor-pointer">
                    {t('step10.options.express')} <span className="text-primary">+500 zł</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('step10.expressDescription')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4 p-3 rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="standard" id="standard" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="standard" className="text-base font-semibold cursor-pointer">
                    {t('step10.options.standard')}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('step10.standardDescription')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4 p-3 rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="comfort" id="comfort" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="comfort" className="text-base font-semibold cursor-pointer">
                    {t('step10.options.comfort')}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('step10.comfortDescription')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4 p-3 rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="specific" id="specific" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="specific" className="text-base font-semibold cursor-pointer">
                    {t('step10.options.specific')}
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {formData.timeline === 'specific' && (
              <div className="mt-4">
                <Label>{t('step10.selectDate')}</Label>
                <Calendar
                  mode="single"
                  selected={formData.specificDate}
                  onSelect={(date) => setFormData({ ...formData, specificDate: date })}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border mt-2"
                />
              </div>
            )}

            <div className="mt-6">
              <Label htmlFor="deadlineNotes">{t('step10.notesLabel')}</Label>
              <Textarea
                id="deadlineNotes"
                value={formData.deadlineNotes}
                onChange={(e) => setFormData({ ...formData, deadlineNotes: e.target.value })}
                placeholder={t('step10.notesPlaceholder')}
                className="max-w-full"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-[90vw] max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] min-h-[600px]">
            {renderLeftContent()}

            <div className="p-3 sm:p-6 lg:p-12 flex flex-col">
              <div className="flex-1">
                {renderStep()}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="mb-6">
                  <PocProgressBar
                    currentStep={currentStep}
                    steps={steps}
                    totalSteps={totalSteps}
                  />
                </div>

                <div className="flex justify-between gap-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {t('buttons.back')}
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 ml-auto"
                  >
                    {currentStep === totalSteps ? t('buttons.submit') : t('buttons.next')}
                    {currentStep < totalSteps && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
