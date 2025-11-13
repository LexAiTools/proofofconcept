import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ArrowLeft, X, Upload, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PocProgressBar } from "./poc/PocProgressBar";
import { VisualStyleCard } from "./poc/VisualStyleCard";
import { Separator } from "@/components/ui/separator";

interface CompletePackagePocFormProps {
  children: React.ReactNode;
}

interface FormData {
  // Krok 1: Kontakt
  name: string;
  company: string;
  email: string;
  phone: string;
  
  // Krok 2: Produkt
  productName: string;
  productDescription: string;
  productProblem: string;
  
  // Krok 3: Grupa docelowa
  targetCustomers: string;
  targetCharacteristics: string;
  targetNeeds: string;
  
  // Krok 4: Film - długość
  videoLength: '30' | '60' | '90' | '120' | '';
  
  // Krok 5: Styl filmu
  videoStyles: string[];
  videoStyleCustom: string;
  
  // Krok 6: Treść filmu
  videoContent: string[];
  videoContentNotes: string;
  
  // Krok 7: Cel LP
  landingGoal: 'email' | 'leads' | 'demo' | 'sales' | 'downloads' | 'webinar' | '';
  landingGoalAdditional: string;
  
  // Krok 8: Sekcje LP
  landingSections: string[];
  landingSectionsOther: string;
  
  // Krok 9: Wygląd LP
  landingStyle: 'modern' | 'minimal' | 'colorful' | 'professional' | '';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: File | null;
  graphics: File[];
  inspirationLinks: string;
  
  // Krok 10: Ton komunikacji
  communicationTone: 'formal' | 'friendly' | 'technical' | 'emotional' | 'humorous' | '';
  toneGuidelines: string;
  
  // Krok 11: Korzyści
  benefits: Array<{
    title: string;
    description: string;
  }>;
  
  // Krok 12: Konkurencja
  competitors: string;
  competitiveAdvantage: string;
  targetFit: string;
  
  // Krok 13: Materiały
  availableMaterials: string[];
  materialFiles: File[];
  materialLinks: string;
  
  // Krok 14: Termin
  timeline: 'express' | 'standard' | 'comfort' | 'specific' | '';
  specificDate?: Date;
  keyDates: string;
  additionalNotes: string;
}

export const CompletePackagePocForm = ({ children }: CompletePackagePocFormProps) => {
  const { t } = useTranslation('completePackagePoc');
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 14;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    productName: '',
    productDescription: '',
    productProblem: '',
    targetCustomers: '',
    targetCharacteristics: '',
    targetNeeds: '',
    videoLength: '',
    videoStyles: [],
    videoStyleCustom: '',
    videoContent: ['problem', 'presentation', 'howItWorks', 'benefits', 'socialProof', 'cta'],
    videoContentNotes: '',
    landingGoal: '',
    landingGoalAdditional: '',
    landingSections: ['hero', 'description', 'benefits', 'cta'],
    landingSectionsOther: '',
    landingStyle: '',
    primaryColor: '#0D9488',
    secondaryColor: '#6366F1',
    accentColor: '#F59E0B',
    logo: null,
    graphics: [],
    inspirationLinks: '',
    communicationTone: '',
    toneGuidelines: '',
    benefits: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    competitors: '',
    competitiveAdvantage: '',
    targetFit: '',
    availableMaterials: [],
    materialFiles: [],
    materialLinks: '',
    timeline: '',
    specificDate: undefined,
    keyDates: '',
    additionalNotes: '',
  });

  const validateCurrentStep = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s+()-]{9,}$/;

    switch (currentStep) {
      case 1:
        if (formData.name.length < 2) {
          toast({ title: t('validation.nameRequired'), variant: "destructive" });
          return false;
        }
        if (formData.company.length < 2) {
          toast({ title: t('validation.companyRequired'), variant: "destructive" });
          return false;
        }
        if (!emailRegex.test(formData.email)) {
          toast({ title: t('validation.emailInvalid'), variant: "destructive" });
          return false;
        }
        if (!phoneRegex.test(formData.phone)) {
          toast({ title: t('validation.phoneInvalid'), variant: "destructive" });
          return false;
        }
        return true;

      case 2:
        if (formData.productName.length < 2) {
          toast({ title: t('validation.productNameRequired'), variant: "destructive" });
          return false;
        }
        if (formData.productDescription.length < 50) {
          toast({ title: t('validation.productDescriptionTooShort'), variant: "destructive" });
          return false;
        }
        if (formData.productProblem.length < 50) {
          toast({ title: t('validation.productProblemTooShort'), variant: "destructive" });
          return false;
        }
        return true;

      case 3:
        if (formData.targetCustomers.length < 100) {
          toast({ title: t('validation.targetCustomersTooShort'), variant: "destructive" });
          return false;
        }
        if (formData.targetCharacteristics.length < 50) {
          toast({ title: t('validation.targetCharacteristicsTooShort'), variant: "destructive" });
          return false;
        }
        if (formData.targetNeeds.length < 50) {
          toast({ title: t('validation.targetNeedsTooShort'), variant: "destructive" });
          return false;
        }
        return true;

      case 4:
        if (!formData.videoLength) {
          toast({ title: t('validation.videoLengthRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 5:
        if (formData.videoStyles.length === 0) {
          toast({ title: t('validation.videoStyleRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 6:
        if (formData.videoContent.length === 0) {
          toast({ title: t('validation.videoContentRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 7:
        if (!formData.landingGoal) {
          toast({ title: t('validation.landingGoalRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 8:
        if (formData.landingSections.length === 0) {
          toast({ title: t('validation.landingSectionsRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 9:
        if (!formData.landingStyle) {
          toast({ title: t('validation.landingStyleRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 10:
        if (!formData.communicationTone) {
          toast({ title: t('validation.communicationToneRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 11:
        const validBenefits = formData.benefits.filter(
          b => b.title.length >= 5 && b.description.length >= 20
        );
        if (validBenefits.length < 3) {
          toast({ title: t('validation.benefitsMinRequired'), variant: "destructive" });
          return false;
        }
        return true;

      case 12:
        if (formData.competitiveAdvantage.length < 100) {
          toast({ title: t('validation.competitiveAdvantageTooShort'), variant: "destructive" });
          return false;
        }
        return true;

      case 13:
        return true;

      case 14:
        if (!formData.timeline) {
          toast({ title: t('validation.timelineRequired'), variant: "destructive" });
          return false;
        }
        if (formData.timeline === 'specific' && !formData.specificDate) {
          toast({ title: t('validation.specificDateRequired'), variant: "destructive" });
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 15) {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const { error } = await supabase.from("leads").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: "Complete Package PoC",
      source_form: "complete_package_poc",
      metadata: {
        product: {
          name: formData.productName,
          description: formData.productDescription,
          problem: formData.productProblem,
        },
        targetAudience: {
          customers: formData.targetCustomers,
          characteristics: formData.targetCharacteristics,
          needs: formData.targetNeeds,
        },
        video: {
          length: formData.videoLength,
          styles: formData.videoStyles,
          styleCustom: formData.videoStyleCustom,
          content: formData.videoContent,
          contentNotes: formData.videoContentNotes,
        },
        landingPage: {
          goal: formData.landingGoal,
          goalAdditional: formData.landingGoalAdditional,
          sections: formData.landingSections,
          sectionsOther: formData.landingSectionsOther,
          style: formData.landingStyle,
          primaryColor: formData.primaryColor,
          secondaryColor: formData.secondaryColor,
          accentColor: formData.accentColor,
          inspirationLinks: formData.inspirationLinks,
          logoFileName: formData.logo?.name,
          graphicsCount: formData.graphics.length,
        },
        content: {
          tone: formData.communicationTone,
          toneGuidelines: formData.toneGuidelines,
          benefits: formData.benefits,
          competitors: formData.competitors,
          competitiveAdvantage: formData.competitiveAdvantage,
          targetFit: formData.targetFit,
        },
        materials: {
          available: formData.availableMaterials,
          filesCount: formData.materialFiles.length,
          links: formData.materialLinks,
        },
        timeline: {
          option: formData.timeline,
          specificDate: formData.specificDate?.toISOString(),
          keyDates: formData.keyDates,
          additionalNotes: formData.additionalNotes,
        },
        price: "2800 PLN / 651 EUR",
      },
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: t('error.title'),
        description: t('error.message'),
        variant: "destructive",
      });
    } else {
      toast({
        title: t('success.title'),
        description: t('success.message'),
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      productName: '',
      productDescription: '',
      productProblem: '',
      targetCustomers: '',
      targetCharacteristics: '',
      targetNeeds: '',
      videoLength: '',
      videoStyles: [],
      videoStyleCustom: '',
      videoContent: ['problem', 'presentation', 'howItWorks', 'benefits', 'socialProof', 'cta'],
      videoContentNotes: '',
      landingGoal: '',
      landingGoalAdditional: '',
      landingSections: ['hero', 'description', 'benefits', 'cta'],
      landingSectionsOther: '',
      landingStyle: '',
      primaryColor: '#0D9488',
      secondaryColor: '#6366F1',
      accentColor: '#F59E0B',
      logo: null,
      graphics: [],
      inspirationLinks: '',
      communicationTone: '',
      toneGuidelines: '',
      benefits: [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
      ],
      competitors: '',
      competitiveAdvantage: '',
      targetFit: '',
      availableMaterials: [],
      materialFiles: [],
      materialLinks: '',
      timeline: '',
      specificDate: undefined,
      keyDates: '',
      additionalNotes: '',
    });
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, { title: '', description: '' }],
    });
  };

  const updateBenefit = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...formData.benefits];
    updated[index][field] = value;
    setFormData({ ...formData, benefits: updated });
  };

  const removeBenefit = (index: number) => {
    if (formData.benefits.length > 1) {
      setFormData({
        ...formData,
        benefits: formData.benefits.filter((_, i) => i !== index),
      });
    }
  };

  const handleVideoStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, videoStyles: [...formData.videoStyles, style] });
    } else {
      setFormData({
        ...formData,
        videoStyles: formData.videoStyles.filter(s => s !== style),
      });
    }
  };

  const handleVideoContentChange = (content: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, videoContent: [...formData.videoContent, content] });
    } else {
      setFormData({
        ...formData,
        videoContent: formData.videoContent.filter(c => c !== content),
      });
    }
  };

  const handleLandingSectionChange = (section: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, landingSections: [...formData.landingSections, section] });
    } else {
      setFormData({
        ...formData,
        landingSections: formData.landingSections.filter(s => s !== section),
      });
    }
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, availableMaterials: [...formData.availableMaterials, material] });
    } else {
      setFormData({
        ...formData,
        availableMaterials: formData.availableMaterials.filter(m => m !== material),
      });
    }
  };

  const renderLeftContent = () => (
    <div className="bg-muted/30 p-3 sm:p-6 lg:p-12 flex flex-col justify-between overflow-y-auto lg:min-h-0 w-full max-w-full">
      <div>
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
          <span className="text-primary text-2xl font-bold">P</span>
        </div>
        
        <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary mb-6">
          {currentStep}
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 break-words">
          {t(`step${currentStep}.title`)}
        </h2>
        
        <p className="text-muted-foreground text-sm sm:text-base break-words">
          {t(`step${currentStep}.description`)}
        </p>
      </div>
      
      {currentStep <= 14 && (
        <div className="mt-8 lg:mt-12">
          <PocProgressBar
            currentStep={currentStep}
            steps={[
              t('steps.contact'),
              t('steps.product'),
              t('steps.client'),
              t('steps.video'),
              t('steps.videoStyle'),
              t('steps.videoContent'),
              t('steps.landing'),
              t('steps.landingGoal'),
              t('steps.sections'),
              t('steps.landingStyle'),
              t('steps.tone'),
              t('steps.benefits'),
              t('steps.competition'),
              t('steps.timeline'),
            ]}
            totalSteps={totalSteps}
          />
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step1.sectionTitle')}</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">{t('step1.fields.name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('step1.placeholders.name')}
                className="max-w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">{t('step1.fields.company')}</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={t('step1.placeholders.company')}
                className="max-w-full"
              />
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
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
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step2.sectionTitle')}</h3>
            
            <div className="space-y-2">
              <Label htmlFor="productName">{t('step2.fields.productName')}</Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder={t('step2.placeholders.productName')}
                className="max-w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription">{t('step2.fields.productDescription')}</Label>
              <Textarea
                id="productDescription"
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                placeholder={t('step2.placeholders.productDescription')}
                rows={4}
                maxLength={500}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.productDescription.length} / 500
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productProblem">{t('step2.fields.productProblem')}</Label>
              <Textarea
                id="productProblem"
                value={formData.productProblem}
                onChange={(e) => setFormData({ ...formData, productProblem: e.target.value })}
                placeholder={t('step2.placeholders.productProblem')}
                rows={4}
                maxLength={500}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.productProblem.length} / 500
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step3.sectionTitle')}</h3>
            
            <div className="space-y-2">
              <Label htmlFor="targetCustomers">{t('step3.fields.targetCustomers')}</Label>
              <Textarea
                id="targetCustomers"
                value={formData.targetCustomers}
                onChange={(e) => setFormData({ ...formData, targetCustomers: e.target.value })}
                placeholder={t('step3.placeholders.targetCustomers')}
                rows={5}
                maxLength={800}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.targetCustomers.length} / 800
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetCharacteristics">{t('step3.fields.targetCharacteristics')}</Label>
              <Textarea
                id="targetCharacteristics"
                value={formData.targetCharacteristics}
                onChange={(e) => setFormData({ ...formData, targetCharacteristics: e.target.value })}
                placeholder={t('step3.placeholders.targetCharacteristics')}
                rows={4}
                maxLength={500}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.targetCharacteristics.length} / 500
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetNeeds">{t('step3.fields.targetNeeds')}</Label>
              <Textarea
                id="targetNeeds"
                value={formData.targetNeeds}
                onChange={(e) => setFormData({ ...formData, targetNeeds: e.target.value })}
                placeholder={t('step3.placeholders.targetNeeds')}
                rows={4}
                maxLength={500}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.targetNeeds.length} / 500
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step4.sectionTitle')}</h3>
            
            <RadioGroup
              value={formData.videoLength}
              onValueChange={(value) => setFormData({ ...formData, videoLength: value as any })}
            >
              <div className="flex items-start space-x-3 mb-6 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <RadioGroupItem value="30" id="video-30" />
                <div className="flex-1">
                  <Label htmlFor="video-30" className="text-base font-semibold cursor-pointer">
                    {t('step4.options.30.title')}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{t('step4.options.30.desc1')}</p>
                  <p className="text-sm text-muted-foreground">{t('step4.options.30.desc2')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-6 p-4 rounded-lg border-2 border-primary/30 bg-primary/5">
                <RadioGroupItem value="60" id="video-60" />
                <div className="flex-1">
                  <Label htmlFor="video-60" className="text-base font-semibold cursor-pointer">
                    {t('step4.options.60.title')} <span className="text-primary">⭐ {t('step4.recommended')}</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{t('step4.options.60.desc1')}</p>
                  <p className="text-sm text-muted-foreground">{t('step4.options.60.desc2')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-6 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <RadioGroupItem value="90" id="video-90" />
                <div className="flex-1">
                  <Label htmlFor="video-90" className="text-base font-semibold cursor-pointer">
                    {t('step4.options.90.title')}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{t('step4.options.90.desc1')}</p>
                  <p className="text-sm text-muted-foreground">{t('step4.options.90.desc2')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-6 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <RadioGroupItem value="120" id="video-120" />
                <div className="flex-1">
                  <Label htmlFor="video-120" className="text-base font-semibold cursor-pointer">
                    {t('step4.options.120.title')}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{t('step4.options.120.desc1')}</p>
                  <p className="text-sm text-muted-foreground">{t('step4.options.120.desc2')}</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step5.sectionTitle')}</h3>
            
            <div className="space-y-3">
              {['animation2d', 'characters', 'screencast', 'motion', 'whiteboard', 'mixed'].map((style) => (
                <div key={style} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <Checkbox
                    id={`style-${style}`}
                    checked={formData.videoStyles.includes(style)}
                    onCheckedChange={(checked) => handleVideoStyleChange(style, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`style-${style}`} className="font-medium cursor-pointer">
                      {t(`step5.styles.${style}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground">{t(`step5.styles.${style}.description`)}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                <Checkbox
                  id="style-custom"
                  checked={formData.videoStyles.includes('custom')}
                  onCheckedChange={(checked) => handleVideoStyleChange('custom', checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="style-custom" className="font-medium cursor-pointer">
                    {t('step5.styles.custom.title')}
                  </Label>
                  {formData.videoStyles.includes('custom') && (
                    <Textarea
                      value={formData.videoStyleCustom}
                      onChange={(e) => setFormData({ ...formData, videoStyleCustom: e.target.value })}
                      placeholder={t('step5.customPlaceholder')}
                      rows={3}
                      className="mt-2 max-w-full resize-none"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step6.sectionTitle')}</h3>
            
            <div className="space-y-3">
              {['problem', 'presentation', 'howItWorks', 'benefits', 'socialProof', 'cta', 'caseStudy', 'comparison'].map((content) => (
                <div key={content} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <Checkbox
                    id={`content-${content}`}
                    checked={formData.videoContent.includes(content)}
                    onCheckedChange={(checked) => handleVideoContentChange(content, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`content-${content}`} className="font-medium cursor-pointer">
                      {t(`step6.content.${content}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground">{t(`step6.content.${content}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="videoContentNotes">{t('step6.notesLabel')}</Label>
              <Textarea
                id="videoContentNotes"
                value={formData.videoContentNotes}
                onChange={(e) => setFormData({ ...formData, videoContentNotes: e.target.value })}
                placeholder={t('step6.notesPlaceholder')}
                rows={4}
                className="max-w-full resize-none"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step7.sectionTitle')}</h3>
            
            <RadioGroup
              value={formData.landingGoal}
              onValueChange={(value) => setFormData({ ...formData, landingGoal: value as any })}
            >
              {['email', 'leads', 'demo', 'sales', 'downloads', 'webinar'].map((goal) => (
                <div key={goal} className="flex items-start space-x-3 mb-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <RadioGroupItem value={goal} id={`goal-${goal}`} />
                  <div className="flex-1">
                    <Label htmlFor={`goal-${goal}`} className="text-base font-semibold cursor-pointer">
                      {t(`step7.goals.${goal}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{t(`step7.goals.${goal}.description`)}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="space-y-2 mt-6">
              <Label htmlFor="landingGoalAdditional">{t('step7.additionalLabel')}</Label>
              <Textarea
                id="landingGoalAdditional"
                value={formData.landingGoalAdditional}
                onChange={(e) => setFormData({ ...formData, landingGoalAdditional: e.target.value })}
                placeholder={t('step7.additionalPlaceholder')}
                rows={3}
                className="max-w-full resize-none"
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step8.sectionTitle')}</h3>
            
            <div className="space-y-3">
              {['hero', 'description', 'benefits', 'cta', 'socialProof', 'pricing', 'faq', 'caseStudies', 'comparison', 'contact', 'video', 'timeline'].map((section) => (
                <div key={section} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <Checkbox
                    id={`section-${section}`}
                    checked={formData.landingSections.includes(section)}
                    onCheckedChange={(checked) => handleLandingSectionChange(section, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`section-${section}`} className="font-medium cursor-pointer">
                      {t(`step8.sections.${section}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground">{t(`step8.sections.${section}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="landingSectionsOther">{t('step8.otherLabel')}</Label>
              <Input
                id="landingSectionsOther"
                value={formData.landingSectionsOther}
                onChange={(e) => setFormData({ ...formData, landingSectionsOther: e.target.value })}
                placeholder={t('step8.otherPlaceholder')}
                className="max-w-full"
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step9.sectionTitle')}</h3>
            
            <div>
              <Label className="mb-3 block">{t('step9.styleLabel')}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['modern', 'minimal', 'colorful', 'professional'].map((style) => (
                  <VisualStyleCard
                    key={style}
                    title={t(`step9.styles.${style}.title`)}
                    description={t(`step9.styles.${style}.description`)}
                    selected={formData.landingStyle === style}
                    onClick={() => setFormData({ ...formData, landingStyle: style as any })}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label className="mb-3 block">{t('step9.colorsLabel')}</Label>
              
              <div className="space-y-4">
                <div className="space-y-2">
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
                      className="w-16 h-10 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
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
                      className="w-16 h-10 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">{t('step9.accentColorLabel')}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      placeholder="#F59E0B"
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-16 h-10 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="mb-3 block">{t('step9.logoLabel')}</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/svg+xml,image/png"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFormData({ ...formData, logo: e.target.files[0] });
                    }
                  }}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formData.logo ? formData.logo.name : t('step9.logoPlaceholder')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t('step9.logoFormats')}</p>
                </label>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">{t('step9.graphicsLabel')}</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFormData({ ...formData, graphics: Array.from(e.target.files) });
                    }
                  }}
                  className="hidden"
                  id="graphics-upload"
                />
                <label htmlFor="graphics-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formData.graphics.length > 0
                      ? `${formData.graphics.length} ${t('step9.filesSelected')}`
                      : t('step9.graphicsPlaceholder')}
                  </p>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inspirationLinks">{t('step9.inspirationLabel')}</Label>
              <Textarea
                id="inspirationLinks"
                value={formData.inspirationLinks}
                onChange={(e) => setFormData({ ...formData, inspirationLinks: e.target.value })}
                placeholder={t('step9.inspirationPlaceholder')}
                rows={4}
                className="max-w-full resize-none"
              />
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step10.sectionTitle')}</h3>
            
            <RadioGroup
              value={formData.communicationTone}
              onValueChange={(value) => setFormData({ ...formData, communicationTone: value as any })}
            >
              {['formal', 'friendly', 'technical', 'emotional', 'humorous'].map((tone) => (
                <div key={tone} className="flex items-start space-x-3 mb-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <RadioGroupItem value={tone} id={`tone-${tone}`} />
                  <div className="flex-1">
                    <Label htmlFor={`tone-${tone}`} className="text-base font-semibold cursor-pointer">
                      {t(`step10.tones.${tone}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{t(`step10.tones.${tone}.description`)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t(`step10.tones.${tone}.for`)}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="space-y-2 mt-6">
              <Label htmlFor="toneGuidelines">{t('step10.guidelinesLabel')}</Label>
              <Textarea
                id="toneGuidelines"
                value={formData.toneGuidelines}
                onChange={(e) => setFormData({ ...formData, toneGuidelines: e.target.value })}
                placeholder={t('step10.guidelinesPlaceholder')}
                rows={4}
                className="max-w-full resize-none"
              />
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step11.sectionTitle')}</h3>
            
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="p-4 rounded-lg border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">
                    {t('step11.benefitLabel')} {index + 1}
                  </Label>
                  {formData.benefits.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBenefit(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                    placeholder={t(`step11.placeholders.title${index + 1}`)}
                    className="max-w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    value={benefit.description}
                    onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                    placeholder={t('step11.placeholders.description')}
                    rows={3}
                    maxLength={300}
                    className="max-w-full resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {benefit.description.length} / 300
                  </p>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addBenefit}
              className="w-full"
            >
              + {t('step11.addMore')}
            </Button>
          </div>
        );

      case 12:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step12.sectionTitle')}</h3>
            
            <div className="space-y-2">
              <Label htmlFor="competitors">{t('step12.fields.competitors')}</Label>
              <Textarea
                id="competitors"
                value={formData.competitors}
                onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                placeholder={t('step12.placeholders.competitors')}
                rows={4}
                maxLength={500}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.competitors.length} / 500
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competitiveAdvantage">{t('step12.fields.competitiveAdvantage')}</Label>
              <Textarea
                id="competitiveAdvantage"
                value={formData.competitiveAdvantage}
                onChange={(e) => setFormData({ ...formData, competitiveAdvantage: e.target.value })}
                placeholder={t('step12.placeholders.competitiveAdvantage')}
                rows={5}
                maxLength={800}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.competitiveAdvantage.length} / 800
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetFit">{t('step12.fields.targetFit')}</Label>
              <Textarea
                id="targetFit"
                value={formData.targetFit}
                onChange={(e) => setFormData({ ...formData, targetFit: e.target.value })}
                placeholder={t('step12.placeholders.targetFit')}
                rows={4}
                maxLength={500}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.targetFit.length} / 500
              </p>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step13.sectionTitle')}</h3>
            
            <div className="space-y-3">
              {['descriptions', 'companyInfo', 'caseStudies', 'testimonials', 'certificates', 'productPhotos', 'teamPhotos', 'logo', 'brandGuidelines'].map((material) => (
                <div key={material} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <Checkbox
                    id={`material-${material}`}
                    checked={formData.availableMaterials.includes(material)}
                    onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`material-${material}`} className="font-medium cursor-pointer">
                      {t(`step13.materials.${material}.title`)}
                    </Label>
                    <p className="text-sm text-muted-foreground">{t(`step13.materials.${material}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div>
              <Label className="mb-3 block">{t('step13.uploadLabel')}</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.svg"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFormData({ ...formData, materialFiles: Array.from(e.target.files) });
                    }
                  }}
                  className="hidden"
                  id="materials-upload"
                />
                <label htmlFor="materials-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formData.materialFiles.length > 0
                      ? `${formData.materialFiles.length} ${t('step13.filesSelected')}`
                      : t('step13.uploadPlaceholder')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t('step13.acceptedFormats')}</p>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materialLinks">{t('step13.linksLabel')}</Label>
              <Textarea
                id="materialLinks"
                value={formData.materialLinks}
                onChange={(e) => setFormData({ ...formData, materialLinks: e.target.value })}
                placeholder={t('step13.linksPlaceholder')}
                rows={3}
                className="max-w-full resize-none"
              />
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('step14.sectionTitle')}</h3>
            
            <RadioGroup
              value={formData.timeline}
              onValueChange={(value) => setFormData({ ...formData, timeline: value as any })}
            >
              <div className="flex items-start space-x-3 mb-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <RadioGroupItem value="express" id="timeline-express" />
                <div className="flex-1">
                  <Label htmlFor="timeline-express" className="text-base font-semibold cursor-pointer">
                    {t('step14.options.express.title')} <span className="text-primary">+700 zł</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{t('step14.options.express.desc1')}</p>
                  <p className="text-sm text-muted-foreground">{t('step14.options.express.desc2')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4 p-4 rounded-lg border-2 border-primary/30 bg-primary/5">
                <RadioGroupItem value="standard" id="timeline-standard" />
                <div className="flex-1">
                  <Label htmlFor="timeline-standard" className="text-base font-semibold cursor-pointer">
                    {t('step14.options.standard.title')} <span className="text-primary">⭐ {t('step14.recommended')}</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{t('step14.options.standard.desc1')}</p>
                  <p className="text-sm text-muted-foreground">{t('step14.options.standard.desc2')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <RadioGroupItem value="comfort" id="timeline-comfort" />
                <div className="flex-1">
                  <Label htmlFor="timeline-comfort" className="text-base font-semibold cursor-pointer">
                    {t('step14.options.comfort.title')}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{t('step14.options.comfort.desc1')}</p>
                  <p className="text-sm text-muted-foreground">{t('step14.options.comfort.desc2')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <RadioGroupItem value="specific" id="timeline-specific" />
                <div className="flex-1">
                  <Label htmlFor="timeline-specific" className="text-base font-semibold cursor-pointer">
                    {t('step14.options.specific.title')}
                  </Label>
                  {formData.timeline === 'specific' && (
                    <div className="mt-3">
                      <Calendar
                        mode="single"
                        selected={formData.specificDate}
                        onSelect={(date) => setFormData({ ...formData, specificDate: date })}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </RadioGroup>

            <Separator className="my-6" />

            <div className="space-y-2">
              <Label htmlFor="keyDates">{t('step14.keyDatesLabel')}</Label>
              <Textarea
                id="keyDates"
                value={formData.keyDates}
                onChange={(e) => setFormData({ ...formData, keyDates: e.target.value })}
                placeholder={t('step14.keyDatesPlaceholder')}
                rows={3}
                maxLength={500}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.keyDates.length} / 500
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">{t('step14.notesLabel')}</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder={t('step14.notesPlaceholder')}
                rows={4}
                maxLength={1000}
                className="max-w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.additionalNotes.length} / 1000
              </p>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">{t('step15.title')}</h2>
              <p className="text-xl text-primary font-semibold">{t('step15.subtitle')}</p>
            </div>

            {/* PODSTAWOWE INFORMACJE */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {t('step15.sections.basic')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.contact')}</p>
                    <p className="text-muted-foreground">{formData.name} | {formData.company}</p>
                    <p className="text-muted-foreground">{formData.email} | {formData.phone}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(1)}>
                    {t('step15.edit')}
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{t('step15.product')}</p>
                    <p className="text-muted-foreground">{t('step15.productName')}: {formData.productName}</p>
                    <p className="text-muted-foreground text-sm mt-1 break-words">{formData.productDescription.substring(0, 100)}...</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(2)}>
                    {t('step15.edit')}
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{t('step15.targetAudience')}</p>
                    <p className="text-muted-foreground text-sm break-words">{formData.targetCustomers.substring(0, 100)}...</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(3)}>
                    {t('step15.edit')}
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* FILM EXPLAINER */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {t('step15.sections.video')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.videoParams')}</p>
                    <p className="text-muted-foreground">{t('step15.videoLength')}: {formData.videoLength}s</p>
                    <p className="text-muted-foreground">{t('step15.videoStyle')}: {formData.videoStyles.join(', ')}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(4)}>
                    {t('step15.edit')}
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.videoStructure')}</p>
                    <p className="text-muted-foreground">{formData.videoContent.length} {t('step15.videoElements')}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(6)}>
                    {t('step15.edit')}
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* LANDING PAGE */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {t('step15.sections.landing')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.landingGoal')}</p>
                    <p className="text-muted-foreground">{formData.landingGoal}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(7)}>
                    {t('step15.edit')}
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.landingSections')} ({formData.landingSections.length})</p>
                    <p className="text-muted-foreground text-sm">{formData.landingSections.join(', ')}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(8)}>
                    {t('step15.edit')}
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.landingStyle')}</p>
                    <p className="text-muted-foreground">{formData.landingStyle}</p>
                    <p className="text-muted-foreground text-sm">{t('step15.colors')}: {formData.primaryColor}, {formData.secondaryColor}, {formData.accentColor}</p>
                    {formData.logo && <p className="text-muted-foreground text-sm">✓ {t('step15.logoAttached')}</p>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(9)}>
                    {t('step15.edit')}
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* TREŚĆ */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {t('step15.sections.content')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.communicationTone')}</p>
                    <p className="text-muted-foreground">{formData.communicationTone}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(10)}>
                    {t('step15.edit')}
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{t('step15.keyBenefits')} ({formData.benefits.filter(b => b.title).length})</p>
                    <ul className="text-muted-foreground text-sm mt-1">
                      {formData.benefits.filter(b => b.title).map((benefit, i) => (
                        <li key={i}>• {benefit.title}</li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(11)}>
                    {t('step15.edit')}
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{t('step15.competitiveAdvantage')}</p>
                    <p className="text-muted-foreground text-sm break-words">{formData.competitiveAdvantage.substring(0, 100)}...</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => goToStep(12)}>
                    {t('step15.edit')}
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* MATERIAŁY */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {t('step15.sections.materials')}
              </h3>
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">{t('step15.providedMaterials')}</p>
                  <p className="text-muted-foreground">{formData.availableMaterials.length} {t('step15.materialsTypes')}</p>
                  {formData.materialFiles.length > 0 && (
                    <p className="text-muted-foreground text-sm">[{formData.materialFiles.length} {t('step15.filesAttached')}]</p>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => goToStep(13)}>
                  {t('step15.edit')}
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* REALIZACJA */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {t('step15.sections.delivery')}
              </h3>
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">{t('step15.timeline')}</p>
                  <p className="text-muted-foreground">{formData.timeline}</p>
                  {formData.keyDates && (
                    <p className="text-muted-foreground text-sm mt-1">{t('step15.keyDate')}: {formData.keyDates.substring(0, 50)}...</p>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => goToStep(14)}>
                  {t('step15.edit')}
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* CENA */}
            <div className="bg-primary/10 p-6 rounded-lg">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {t('step15.sections.price')}
              </h3>
              
              <p className="text-2xl font-bold text-foreground mb-4">
                {t('step15.priceDetails.total')}
              </p>

              <div>
                <p className="font-semibold text-foreground mb-2">{t('step15.priceDetails.includes')}</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>✓ {t('step15.priceDetails.item1')}</li>
                  <li>✓ {t('step15.priceDetails.item2')}</li>
                  <li>✓ {t('step15.priceDetails.item3')}</li>
                  <li>✓ {t('step15.priceDetails.item4')}</li>
                  <li>✓ {t('step15.priceDetails.item5')}</li>
                </ul>
              </div>
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
      <DialogContent className="max-w-6xl w-[90vw] sm:w-full p-0 overflow-hidden max-h-[95vh] sm:max-h-[90vh]">
        <div className="flex flex-col lg:grid lg:grid-cols-2 h-full max-h-[95vh] sm:max-h-[90vh] w-full max-w-full overflow-x-hidden">
          
          {renderLeftContent()}
          
          <div className="p-3 sm:p-6 lg:p-12 flex flex-col overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[90vh] lg:min-h-0 w-full max-w-full">
            {renderStep()}
            
            <div className="flex gap-3 mt-6 flex-shrink-0">
              {currentStep > 1 && currentStep <= 14 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('buttons.back')}
                </Button>
              )}
              {currentStep < 14 && (
                <Button onClick={handleNext} className="flex-1">
                  {t('buttons.next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {currentStep === 14 && (
                <Button onClick={handleNext} className="flex-1">
                  {t('buttons.review')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {currentStep === 15 && (
                <>
                  <Button variant="outline" onClick={() => goToStep(14)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('buttons.back')}
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
};
