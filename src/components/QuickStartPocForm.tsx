import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { PocProgressBar } from "@/components/poc/PocProgressBar";
import { VisualStyleCard } from "@/components/poc/VisualStyleCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X, ArrowLeft, ArrowRight, User, Lightbulb, Users, List, Palette, CalendarIcon } from "lucide-react";

interface QuickStartPocFormProps {
  children: React.ReactNode;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  problem: string;
  targetAudience: string;
  features: string[];
  visualStyle: 'modern' | 'minimal' | 'colorful' | 'professional' | '';
  inspirationLinks: string;
  timeline: 'asap' | 'standard' | 'flexible' | 'specific' | '';
  specificDate?: Date;
}

export const QuickStartPocForm = ({ children }: QuickStartPocFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation('quickStartPoc');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    problem: '',
    targetAudience: '',
    features: ['', '', ''],
    visualStyle: '',
    inspirationLinks: '',
    timeline: '',
    specificDate: undefined
  });

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.name || formData.name.length < 2) {
          toast.error(t('validation.nameMin'));
          return false;
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error(t('validation.emailInvalid'));
          return false;
        }
        if (!formData.phone || !/^\+?[0-9]{9,15}$/.test(formData.phone.replace(/\s/g, ''))) {
          toast.error(t('validation.phoneInvalid'));
          return false;
        }
        return true;
      case 2:
        if (!formData.problem || formData.problem.length < 50) {
          toast.error(t('validation.problemMin'));
          return false;
        }
        return true;
      case 3:
        if (!formData.targetAudience || formData.targetAudience.length < 20) {
          toast.error(t('validation.audienceMin'));
          return false;
        }
        return true;
      case 4:
        const validFeatures = formData.features.filter(f => f.trim().length >= 5);
        if (validFeatures.length < 3) {
          toast.error(t('validation.featureMin'));
          return false;
        }
        return true;
      case 5:
        if (!formData.visualStyle) {
          toast.error(t('validation.styleRequired'));
          return false;
        }
        return true;
      case 6:
        if (!formData.timeline) {
          toast.error(t('validation.timelineRequired'));
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        problem: formData.problem,
        message: formData.targetAudience,
        service: "Szybki Start PoC",
        source_form: "quick-start-poc",
        status: "new",
        metadata: {
          form_type: "quick-start-poc",
          target_audience: formData.targetAudience,
          key_features: formData.features.filter(f => f.trim().length > 0),
          visual_style: formData.visualStyle,
          inspiration_links: formData.inspirationLinks,
          timeline_preference: formData.timeline,
          specific_date: formData.specificDate?.toISOString(),
          submitted_at: new Date().toISOString()
        }
      });

      if (error) throw error;

      toast.success(t('success.title'), { description: t('success.message') });
      handleClose();
    } catch (error) {
      console.error("Error submitting Quick Start PoC form:", error);
      toast.error(t('error.title'), { description: t('error.message') });
    } finally {
      setIsSubmitting(false);
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
      features: ['', '', ''],
      visualStyle: '',
      inspirationLinks: '',
      timeline: '',
      specificDate: undefined
    });
  };

  const addFeature = () => {
    if (formData.features.length < 6) {
      setFormData({
        ...formData,
        features: [...formData.features, '']
      });
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSuggestionClick = (suggestion: string) => {
    const suggestionText = t(`step3.suggestions.${suggestion}`);
    const current = formData.targetAudience;
    setFormData({
      ...formData,
      targetAudience: current + (current ? ', ' : '') + suggestionText
    });
  };

  const renderLeftContent = () => {
    const stepKey = `step${currentStep}`;
    return (
      <div className="space-y-4">
        <div className="text-6xl font-bold text-primary">{t(`${stepKey}.number`)}</div>
        <h2 className="text-3xl font-bold text-foreground leading-tight">
          {t(`${stepKey}.title`)}
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t(`${stepKey}.description`)}
        </p>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('step1.fields.name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('step1.placeholders.name')}
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('step1.fields.phone')}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('step1.placeholders.phone')}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="problem">{t('step2.field')}</Label>
              <Textarea
                id="problem"
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder={t('step2.placeholder')}
                rows={5}
                className="sm:min-h-[200px]"
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground">
                {t('step2.charCounter', { current: formData.problem.length, max: 500 })}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="audience">{t('step3.field')}</Label>
              <Textarea
                id="audience"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder={t('step3.placeholder')}
                rows={4}
                className="sm:min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('step3.suggestions.title')}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['entrepreneurs', 'students', 'parents', 'freelancers', 'b2b', 'b2c'].map((s) => (
                  <Button
                    key={s}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {t(`step3.suggestions.${s}`)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {formData.features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`feature-${index}`}>
                    {index < 3 ? t(`step4.fields.feature${index + 1}`) : `Funkcja ${index + 1}`}
                  </Label>
                  <Input
                    id={`feature-${index}`}
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={t(`step4.placeholders.feature${Math.min(index + 1, 3)}`)}
                  />
                </div>
              ))}
            </div>
            {formData.features.length < 6 && (
              <Button type="button" variant="outline" onClick={addFeature} className="w-full">
                {t('step4.addMore')}
              </Button>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {(['modern', 'minimal', 'colorful', 'professional'] as const).map((style) => (
                <VisualStyleCard
                  key={style}
                  title={t(`step5.styles.${style}.title`)}
                  description={t(`step5.styles.${style}.description`)}
                  selected={formData.visualStyle === style}
                  onClick={() => setFormData({ ...formData, visualStyle: style })}
                />
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspiration">{t('step5.inspirationField')}</Label>
              <Textarea
                id="inspiration"
                value={formData.inspirationLinks}
                onChange={(e) => setFormData({ ...formData, inspirationLinks: e.target.value })}
                placeholder={t('step5.inspirationPlaceholder')}
                rows={3}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4 sm:space-y-6">
            <RadioGroup
              value={formData.timeline}
              onValueChange={(value: any) => setFormData({ ...formData, timeline: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asap" id="asap" />
                <Label htmlFor="asap">{t('step6.options.asap')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">{t('step6.options.standard')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="flexible" />
                <Label htmlFor="flexible">{t('step6.options.flexible')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific">{t('step6.options.specific')}</Label>
              </div>
            </RadioGroup>
            
            {formData.timeline === 'specific' && (
              <div className="space-y-2 pt-4">
                <Label>{t('step6.selectDate')}</Label>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={formData.specificDate}
                    onSelect={(date) => setFormData({ ...formData, specificDate: date })}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border scale-90 sm:scale-100"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <SummarySection
              icon={User}
              title={t('step7.sections.contact')}
              onEdit={() => goToStep(1)}
            >
              <p className="text-sm">{formData.name}</p>
              <p className="text-sm">{formData.email}</p>
              <p className="text-sm">{formData.phone}</p>
            </SummarySection>

            <SummarySection
              icon={Lightbulb}
              title={t('step7.sections.problem')}
              onEdit={() => goToStep(2)}
            >
              <p className="text-sm">{formData.problem}</p>
            </SummarySection>

            <SummarySection
              icon={Users}
              title={t('step7.sections.audience')}
              onEdit={() => goToStep(3)}
            >
              <p className="text-sm">{formData.targetAudience}</p>
            </SummarySection>

            <SummarySection
              icon={List}
              title={t('step7.sections.features')}
              onEdit={() => goToStep(4)}
            >
              <ul className="list-disc list-inside space-y-1">
                {formData.features.filter(f => f.trim()).map((f, i) => (
                  <li key={i} className="text-sm">{f}</li>
                ))}
              </ul>
            </SummarySection>

            <SummarySection
              icon={Palette}
              title={t('step7.sections.style')}
              onEdit={() => goToStep(5)}
            >
              <p className="text-sm">{formData.visualStyle && t(`step5.styles.${formData.visualStyle}.title`)}</p>
              {formData.inspirationLinks && (
                <p className="text-sm text-muted-foreground mt-1">{formData.inspirationLinks}</p>
              )}
            </SummarySection>

            <SummarySection
              icon={CalendarIcon}
              title={t('step7.sections.timeline')}
              onEdit={() => goToStep(6)}
            >
              <p className="text-sm">{formData.timeline && t(`step6.options.${formData.timeline}`)}</p>
              {formData.specificDate && (
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.specificDate.toLocaleDateString()}
                </p>
              )}
            </SummarySection>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] sm:w-full p-0 overflow-hidden max-h-[95vh] sm:max-h-[90vh]">
        <div className="flex flex-col lg:grid lg:grid-cols-2 h-full max-h-[95vh] sm:max-h-[90vh]">
          {/* Left column - Question */}
          <div className="bg-muted/30 p-4 sm:p-6 lg:p-12 flex flex-col justify-between overflow-y-auto lg:min-h-0">
            {/* Mobile: kompaktowy widok */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">P</span>
                </div>
                <span className="text-sm font-semibold text-primary">
                  Krok {currentStep}/7
                </span>
              </div>
              {currentStep <= 6 && (
                <div>
                  <h2 className="text-xl font-bold text-foreground leading-tight mb-2">
                    {t(`step${currentStep}.title`)}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t(`step${currentStep}.description`)}
                  </p>
                </div>
              )}
            </div>

            {/* Desktop: pełny widok */}
            <div className="hidden lg:block">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-8">
                <span className="text-primary-foreground font-bold text-xl">P</span>
              </div>
              {currentStep <= 6 && renderLeftContent()}
            </div>

            {/* Progress bar */}
            {currentStep <= 6 && (
              <div className="mt-4 lg:mt-8">
                <PocProgressBar
                  currentStep={currentStep}
                  steps={[
                    t('steps.contact'),
                    t('steps.problem'),
                    t('steps.audience'),
                    t('steps.features'),
                    t('steps.style'),
                    t('steps.timeline')
                  ]}
                  totalSteps={6}
                />
              </div>
            )}
          </div>

          {/* Right column - Form */}
          <div className="p-4 sm:p-6 lg:p-12 flex flex-col overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[90vh] lg:min-h-0">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="flex-1 mt-8">
              {renderStep()}
            </div>

        <div className="flex flex-row justify-between gap-2 pt-4 sm:pt-6 border-t border-border mt-4 sm:mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="h-10 w-10 sm:w-auto px-0 sm:px-4"
          >
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">{t('buttons.back')}</span>
          </Button>

          {currentStep < 7 ? (
            <Button 
              onClick={handleNext}
              className="h-10 flex-1 sm:flex-none sm:w-auto px-4 sm:px-6"
            >
              <span className="hidden sm:inline sm:mr-2">{t('buttons.next')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="h-10 flex-1 sm:flex-none sm:w-auto text-sm px-4 sm:px-6"
            >
              {isSubmitting ? (
                <span className="truncate text-sm">{t('step7.submitting')}</span>
              ) : (
                <>
                  <span className="hidden sm:inline truncate">{t('step7.confirmButton', { price: t('price') })}</span>
                  <span className="sm:hidden">Wyślij</span>
                </>
              )}
            </Button>
          )}
        </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface SummarySectionProps {
  icon: any;
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

const SummarySection = ({ icon: Icon, title, onEdit, children }: SummarySectionProps) => {
  const { t } = useTranslation('quickStartPoc');
  
  return (
    <div className="p-4 rounded-lg border border-border bg-muted/30">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          {t('step7.editButton')}
        </Button>
      </div>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
};
