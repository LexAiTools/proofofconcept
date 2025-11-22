import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CompactPocProgressBar } from "@/components/poc/CompactPocProgressBar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Loader2, X, ArrowLeft, ArrowRight } from "lucide-react";

interface ProfessionalWebsitePocFormProps {
  children: React.ReactNode;
}

interface AIQuestion {
  question: string;
  answer: string;
}

interface Inspiration {
  url: string;
  notes: string;
}

interface FormData {
  name: string;
  company: string;
  currentWebsite: string;
  email: string;
  phone: string;
  industry: string;
  mainProducts: string;
  businessDescription: string;
  yearsOnMarket: string;
  companySize: string;
  clientType: string;
  clientCharacteristics: string;
  frequentQuestions: string;
  clientNeeds: string;
  subpages: string[];
  customSubpageName: string;
  customSubpageContent: string;
  siteGoal: string;
  siteGoalOther: string;
  additionalGoals: string;
  userActions: string[];
  otherActions: string;
  actionPriority: string;
  formTypes: string[];
  additionalFields: string;
  formDestination: string;
  integrations: string[];
  crmSystem: string;
  emailSystem: string;
  calendarSystem: string;
  chatSystem: string;
  paymentSystem: string;
  accountingSystem: string;
  otherIntegrations: string;
  aiTone: string;
  aiGuidelines: string;
  companyValues: string;
  aiQuestions: AIQuestion[];
  additionalTopics: string;
  aiFunctions: string[];
  aiSpecialCases: string;
  aiLimits: string;
  aiAvailability: string;
  businessHoursFrom: string;
  businessHoursTo: string;
  businessDays: string[];
  aiWelcomeMessage: string;
  aiOutOfHoursMessage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  colorScheme: string;
  hasBrandBook: boolean;
  availableMaterials: string[];
  materialLinks: string;
  needsPhotography: boolean;
  needsGraphics: boolean;
  inspirations: Inspiration[];
  dislikedSites: string;
  preferredStyle: string;
  contentStatus: string;
  availableContent: string[];
  keyMessages: string;
  trackingMetrics: string[];
  conversionGoals: string;
  conversionValue: string;
  reportingFrequency: string;
  reportContent: string;
  analyticsAccess: string;
  wantsTraining: boolean;
  wantsLookerStudio: boolean;
  timeline: string;
  specificDate: string;
  keyDates: string;
  priority: string;
  complianceRequirements: string[];
  languages: string;
  specificTechnology: string;
  legalRequirements: string;
  premiumFeatures: string;
  needsHosting: boolean;
  needsDomain: boolean;
  projectContactName: string;
  projectContactRole: string;
  projectContactEmail: string;
  projectContactPhone: string;
  preferredChannel: string;
  decisionMakers: string;
  decisionProcess: string;
  communicationExpectations: string;
  finalNotes: string;
  mainConcerns: string;
  mostImportant: string;
  wantsAdditionalServices: boolean;
  gdprConsent: boolean;
  termsAccepted: boolean;
}

export const ProfessionalWebsitePocForm = ({ children }: ProfessionalWebsitePocFormProps) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    currentWebsite: "",
    email: "",
    phone: "",
    industry: "",
    mainProducts: "",
    businessDescription: "",
    yearsOnMarket: "",
    companySize: "",
    clientType: "",
    clientCharacteristics: "",
    frequentQuestions: "",
    clientNeeds: "",
    subpages: ["home", "contact"],
    customSubpageName: "",
    customSubpageContent: "",
    siteGoal: "",
    siteGoalOther: "",
    additionalGoals: "",
    userActions: [],
    otherActions: "",
    actionPriority: "",
    formTypes: [],
    additionalFields: "",
    formDestination: "",
    integrations: ["analytics"],
    crmSystem: "",
    emailSystem: "",
    calendarSystem: "",
    chatSystem: "",
    paymentSystem: "",
    accountingSystem: "",
    otherIntegrations: "",
    aiTone: "",
    aiGuidelines: "",
    companyValues: "",
    aiQuestions: [{ question: "", answer: "" }],
    additionalTopics: "",
    aiFunctions: [],
    aiSpecialCases: "",
    aiLimits: "",
    aiAvailability: "",
    businessHoursFrom: "",
    businessHoursTo: "",
    businessDays: [],
    aiWelcomeMessage: "",
    aiOutOfHoursMessage: "",
    primaryColor: "#0D9488",
    secondaryColor: "#6366F1",
    accentColor: "#F59E0B",
    textColor: "dark",
    colorScheme: "light",
    hasBrandBook: false,
    availableMaterials: [],
    materialLinks: "",
    needsPhotography: false,
    needsGraphics: false,
    inspirations: [{ url: "", notes: "" }],
    dislikedSites: "",
    preferredStyle: "",
    contentStatus: "",
    availableContent: [],
    keyMessages: "",
    trackingMetrics: [],
    conversionGoals: "",
    conversionValue: "",
    reportingFrequency: "",
    reportContent: "",
    analyticsAccess: "",
    wantsTraining: false,
    wantsLookerStudio: false,
    timeline: "",
    specificDate: "",
    keyDates: "",
    priority: "",
    complianceRequirements: [],
    languages: "",
    specificTechnology: "",
    legalRequirements: "",
    premiumFeatures: "",
    needsHosting: false,
    needsDomain: false,
    projectContactName: "",
    projectContactRole: "",
    projectContactEmail: "",
    projectContactPhone: "",
    preferredChannel: "",
    decisionMakers: "",
    decisionProcess: "",
    communicationExpectations: "",
    finalNotes: "",
    mainConcerns: "",
    mostImportant: "",
    wantsAdditionalServices: false,
    gdprConsent: false,
    termsAccepted: false,
  });

  const stepLabels = [
    t('professionalWebsitePoc:steps.contact'),
    t('professionalWebsitePoc:steps.company'),
    t('professionalWebsitePoc:steps.clients'),
    t('professionalWebsitePoc:steps.subpages'),
    t('professionalWebsitePoc:steps.goal'),
    t('professionalWebsitePoc:steps.actions'),
    t('professionalWebsitePoc:steps.forms'),
    t('professionalWebsitePoc:steps.integrations'),
    t('professionalWebsitePoc:steps.aiLanguage'),
    t('professionalWebsitePoc:steps.aiQuestions'),
    t('professionalWebsitePoc:steps.aiActions'),
    t('professionalWebsitePoc:steps.aiAvailability'),
    t('professionalWebsitePoc:steps.colors'),
    t('professionalWebsitePoc:steps.materials'),
    t('professionalWebsitePoc:steps.inspirations'),
    t('professionalWebsitePoc:steps.content'),
    t('professionalWebsitePoc:steps.analytics'),
    t('professionalWebsitePoc:steps.reports'),
    t('professionalWebsitePoc:steps.timeline'),
    t('professionalWebsitePoc:steps.additional'),
    t('professionalWebsitePoc:steps.projectContact'),
    t('professionalWebsitePoc:steps.summary'),
  ];

  const handleNext = () => {
    if (currentStep < 22) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addQuestion = () => {
    if (formData.aiQuestions.length < 10) {
      setFormData({
        ...formData,
        aiQuestions: [...formData.aiQuestions, { question: "", answer: "" }],
      });
    }
  };

  const updateQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    const newQuestions = [...formData.aiQuestions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, aiQuestions: newQuestions });
  };

  const addInspiration = () => {
    if (formData.inspirations.length < 5) {
      setFormData({
        ...formData,
        inspirations: [...formData.inspirations, { url: "", notes: "" }],
      });
    }
  };

  const updateInspiration = (index: number, field: 'url' | 'notes', value: string) => {
    const newInspirations = [...formData.inspirations];
    newInspirations[index][field] = value;
    setFormData({ ...formData, inspirations: newInspirations });
  };

  const calculateTotal = () => {
    let total = 16400;
    if (formData.timeline === 'express') total += 2000;
    if (formData.contentStatus === 'needed') total += 1500;
    if (formData.needsHosting) total += 200;
    if (formData.needsDomain) total += 50;
    return total;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const metadata = {
        industry: formData.industry,
        mainProducts: formData.mainProducts,
        businessDescription: formData.businessDescription,
        clientType: formData.clientType,
        subpages: formData.subpages,
        siteGoal: formData.siteGoal,
        userActions: formData.userActions,
        formTypes: formData.formTypes,
        integrations: formData.integrations,
        aiTone: formData.aiTone,
        aiQuestions: formData.aiQuestions,
        aiFunctions: formData.aiFunctions,
        aiAvailability: formData.aiAvailability,
        colors: { primary: formData.primaryColor, secondary: formData.secondaryColor, accent: formData.accentColor },
        timeline: formData.timeline,
        totalPrice: calculateTotal(),
        language: i18n.language,
      };

      const { error } = await supabase
        .from('leads')
        .insert([{
          source_form: 'professional_website_poc',
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.businessDescription,
          metadata: metadata as any,
        }]);

      if (error) throw error;

      toast.success(t('professionalWebsitePoc:success.title'), {
        description: t('professionalWebsitePoc:success.description'),
      });

      setIsOpen(false);
      setCurrentStep(1);
      setFormData({
        name: "",
        company: "",
        currentWebsite: "",
        email: "",
        phone: "",
        industry: "",
        mainProducts: "",
        businessDescription: "",
        yearsOnMarket: "",
        companySize: "",
        clientType: "",
        clientCharacteristics: "",
        frequentQuestions: "",
        clientNeeds: "",
        subpages: ["home", "contact"],
        customSubpageName: "",
        customSubpageContent: "",
        siteGoal: "",
        siteGoalOther: "",
        additionalGoals: "",
        userActions: [],
        otherActions: "",
        actionPriority: "",
        formTypes: [],
        additionalFields: "",
        formDestination: "",
        integrations: ["analytics"],
        crmSystem: "",
        emailSystem: "",
        calendarSystem: "",
        chatSystem: "",
        paymentSystem: "",
        accountingSystem: "",
        otherIntegrations: "",
        aiTone: "",
        aiGuidelines: "",
        companyValues: "",
        aiQuestions: [{ question: "", answer: "" }],
        additionalTopics: "",
        aiFunctions: [],
        aiSpecialCases: "",
        aiLimits: "",
        aiAvailability: "",
        businessHoursFrom: "",
        businessHoursTo: "",
        businessDays: [],
        aiWelcomeMessage: "",
        aiOutOfHoursMessage: "",
        primaryColor: "#0D9488",
        secondaryColor: "#6366F1",
        accentColor: "#F59E0B",
        textColor: "dark",
        colorScheme: "light",
        hasBrandBook: false,
        availableMaterials: [],
        materialLinks: "",
        needsPhotography: false,
        needsGraphics: false,
        inspirations: [{ url: "", notes: "" }],
        dislikedSites: "",
        preferredStyle: "",
        contentStatus: "",
        availableContent: [],
        keyMessages: "",
        trackingMetrics: [],
        conversionGoals: "",
        conversionValue: "",
        reportingFrequency: "",
        reportContent: "",
        analyticsAccess: "",
        wantsTraining: false,
        wantsLookerStudio: false,
        timeline: "",
        specificDate: "",
        keyDates: "",
        priority: "",
        complianceRequirements: [],
        languages: "",
        specificTechnology: "",
        legalRequirements: "",
        premiumFeatures: "",
        needsHosting: false,
        needsDomain: false,
        projectContactName: "",
        projectContactRole: "",
        projectContactEmail: "",
        projectContactPhone: "",
        preferredChannel: "",
        decisionMakers: "",
        decisionProcess: "",
        communicationExpectations: "",
        finalNotes: "",
        mainConcerns: "",
        mostImportant: "",
        wantsAdditionalServices: false,
        gdprConsent: false,
        termsAccepted: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t('professionalWebsitePoc:error.title'), {
        description: t('professionalWebsitePoc:error.description'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step1.sectionTitle')}</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('professionalWebsitePoc:step1.fields.name')}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step1.placeholders.name')}
                  />
                </div>
                <div>
                  <Label htmlFor="company">{t('professionalWebsitePoc:step1.fields.company')}</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step1.placeholders.company')}
                  />
                </div>
                <div>
                  <Label htmlFor="currentWebsite">{t('professionalWebsitePoc:step1.fields.currentWebsite')}</Label>
                  <Input
                    id="currentWebsite"
                    value={formData.currentWebsite}
                    onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step1.placeholders.currentWebsite')}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('professionalWebsitePoc:step1.fields.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step1.placeholders.email')}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('professionalWebsitePoc:step1.fields.phone')}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step1.placeholders.phone')}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step2.sectionTitle')}</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="industry">{t('professionalWebsitePoc:step2.fields.industry')}</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step2.placeholders.industry')}
                  />
                </div>
                <div>
                  <Label htmlFor="mainProducts">{t('professionalWebsitePoc:step2.fields.mainProducts')}</Label>
                  <Textarea
                    id="mainProducts"
                    value={formData.mainProducts}
                    onChange={(e) => setFormData({ ...formData, mainProducts: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step2.placeholders.mainProducts')}
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.mainProducts.length} / 800
                  </p>
                </div>
                <div>
                  <Label htmlFor="businessDescription">{t('professionalWebsitePoc:step2.fields.businessDescription')}</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step2.placeholders.businessDescription')}
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.businessDescription.length} / 1000
                  </p>
                </div>
                <div>
                  <Label htmlFor="yearsOnMarket">{t('professionalWebsitePoc:step2.fields.yearsOnMarket')}</Label>
                  <Input
                    id="yearsOnMarket"
                    value={formData.yearsOnMarket}
                    onChange={(e) => setFormData({ ...formData, yearsOnMarket: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step2.placeholders.yearsOnMarket')}
                  />
                </div>
                <div>
                  <Label>{t('professionalWebsitePoc:step2.fields.companySize')}</Label>
                  <RadioGroup value={formData.companySize} onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
                    {['1-5', '6-20', '21-50', '51-100', '100+'].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <RadioGroupItem value={size} id={`size-${size}`} />
                        <Label htmlFor={`size-${size}`}>{size} {t('professionalWebsitePoc:step2.labels.employees')}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step3.sectionTitle')}</h3>
              <div className="space-y-4">
                <div>
                  <Label>{t('professionalWebsitePoc:step3.fields.clientType')}</Label>
                  <RadioGroup value={formData.clientType} onValueChange={(value) => setFormData({ ...formData, clientType: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="b2b" id="b2b" />
                      <Label htmlFor="b2b">B2B ({t('professionalWebsitePoc:step3.labels.businesses')})</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="b2c" id="b2c" />
                      <Label htmlFor="b2c">B2C ({t('professionalWebsitePoc:step3.labels.consumers')})</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="mixed" />
                      <Label htmlFor="mixed">{t('professionalWebsitePoc:step3.labels.mixed')}</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="clientCharacteristics">{t('professionalWebsitePoc:step3.fields.clientCharacteristics')}</Label>
                  <Textarea
                    id="clientCharacteristics"
                    value={formData.clientCharacteristics}
                    onChange={(e) => setFormData({ ...formData, clientCharacteristics: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step3.placeholders.clientCharacteristics')}
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.clientCharacteristics.length} / 1000
                  </p>
                </div>
                <div>
                  <Label htmlFor="frequentQuestions">{t('professionalWebsitePoc:step3.fields.frequentQuestions')}</Label>
                  <Textarea
                    id="frequentQuestions"
                    value={formData.frequentQuestions}
                    onChange={(e) => setFormData({ ...formData, frequentQuestions: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step3.placeholders.frequentQuestions')}
                    rows={6}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.frequentQuestions.length} / 1500
                  </p>
                </div>
                <div>
                  <Label htmlFor="clientNeeds">{t('professionalWebsitePoc:step3.fields.clientNeeds')}</Label>
                  <Textarea
                    id="clientNeeds"
                    value={formData.clientNeeds}
                    onChange={(e) => setFormData({ ...formData, clientNeeds: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step3.placeholders.clientNeeds')}
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.clientNeeds.length} / 800
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step4.sectionTitle')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 opacity-50">
                  <Checkbox checked disabled id="home" />
                  <Label htmlFor="home">{t('professionalWebsitePoc:step4.pages.home')}</Label>
                </div>
                <div className="flex items-center space-x-2 opacity-50">
                  <Checkbox checked disabled id="contact" />
                  <Label htmlFor="contact">{t('professionalWebsitePoc:step4.pages.contact')}</Label>
                </div>
                {['about', 'offer', 'portfolio', 'blog', 'pricing', 'faq', 'career', 'privacy', 'terms'].map((page) => (
                  <div key={page} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.subpages.includes(page)}
                      onCheckedChange={() => setFormData({ ...formData, subpages: toggleArrayItem(formData.subpages, page) })}
                      id={page}
                    />
                    <Label htmlFor={page}>{t(`professionalWebsitePoc:step4.pages.${page}`)}</Label>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <Label htmlFor="customSubpage">{t('professionalWebsitePoc:step4.fields.customSubpage')}</Label>
                  <Input
                    id="customSubpage"
                    value={formData.customSubpageName}
                    onChange={(e) => setFormData({ ...formData, customSubpageName: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step4.placeholders.customSubpage')}
                  />
                  {formData.customSubpageName && (
                    <Textarea
                      className="mt-2"
                      value={formData.customSubpageContent}
                      onChange={(e) => setFormData({ ...formData, customSubpageContent: e.target.value })}
                      placeholder={t('professionalWebsitePoc:step4.placeholders.customContent')}
                      rows={3}
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {t('professionalWebsitePoc:step4.selected')}: {formData.subpages.length} / 4
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step5.sectionTitle')}</h3>
              <div className="space-y-4">
                <RadioGroup value={formData.siteGoal} onValueChange={(value) => setFormData({ ...formData, siteGoal: value })}>
                  {['leads', 'sales', 'branding', 'information', 'recruitment', 'support', 'other'].map((goal) => (
                    <div key={goal} className="flex flex-col space-y-1 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={goal} id={goal} />
                        <Label htmlFor={goal} className="font-semibold">
                          {t(`professionalWebsitePoc:step5.goals.${goal}.title`)}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {t(`professionalWebsitePoc:step5.goals.${goal}.description`)}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
                {formData.siteGoal === 'other' && (
                  <Input
                    value={formData.siteGoalOther}
                    onChange={(e) => setFormData({ ...formData, siteGoalOther: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step5.placeholders.other')}
                  />
                )}
                <div className="mt-4">
                  <Label htmlFor="additionalGoals">{t('professionalWebsitePoc:step5.fields.additionalGoals')}</Label>
                  <Textarea
                    id="additionalGoals"
                    value={formData.additionalGoals}
                    onChange={(e) => setFormData({ ...formData, additionalGoals: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step5.placeholders.additionalGoals')}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step6.sectionTitle')}</h3>
              <div className="space-y-3">
                {['contact_form', 'newsletter', 'download', 'consultation', 'purchase', 'ai_chat', 'call', 'application', 'event_signup'].map((action) => (
                  <div key={action} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.userActions.includes(action)}
                        onCheckedChange={() => setFormData({ ...formData, userActions: toggleArrayItem(formData.userActions, action) })}
                        id={action}
                      />
                      <Label htmlFor={action} className="font-semibold">
                        {t(`professionalWebsitePoc:step6.actions.${action}.title`)}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {t(`professionalWebsitePoc:step6.actions.${action}.description`)}
                    </p>
                  </div>
                ))}
                <div className="mt-4">
                  <Label htmlFor="otherActions">{t('professionalWebsitePoc:step6.fields.otherActions')}</Label>
                  <Input
                    id="otherActions"
                    value={formData.otherActions}
                    onChange={(e) => setFormData({ ...formData, otherActions: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step6.placeholders.otherActions')}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="actionPriority">{t('professionalWebsitePoc:step6.fields.priority')}</Label>
                  <Textarea
                    id="actionPriority"
                    value={formData.actionPriority}
                    onChange={(e) => setFormData({ ...formData, actionPriority: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step6.placeholders.priority')}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step7.sectionTitle')}</h3>
              <div className="space-y-3">
                {['simple', 'quote', 'consultation', 'calculator', 'recruitment', 'newsletter', 'booking'].map((form) => (
                  <div key={form} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.formTypes.includes(form)}
                        onCheckedChange={() => setFormData({ ...formData, formTypes: toggleArrayItem(formData.formTypes, form) })}
                        id={form}
                      />
                      <Label htmlFor={form} className="font-semibold">
                        {t(`professionalWebsitePoc:step7.forms.${form}.title`)}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {t(`professionalWebsitePoc:step7.forms.${form}.description`)}
                    </p>
                  </div>
                ))}
                <div className="mt-4">
                  <Label htmlFor="additionalFields">{t('professionalWebsitePoc:step7.fields.additionalFields')}</Label>
                  <Textarea
                    id="additionalFields"
                    value={formData.additionalFields}
                    onChange={(e) => setFormData({ ...formData, additionalFields: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step7.placeholders.additionalFields')}
                    rows={4}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="formDestination">{t('professionalWebsitePoc:step7.fields.destination')}</Label>
                  <Textarea
                    id="formDestination"
                    value={formData.formDestination}
                    onChange={(e) => setFormData({ ...formData, formDestination: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step7.placeholders.destination')}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step8.sectionTitle')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 opacity-50">
                  <Checkbox checked disabled id="analytics" />
                  <Label htmlFor="analytics">{t('professionalWebsitePoc:step8.integrations.analytics')}</Label>
                </div>
                {['crm', 'email_marketing', 'facebook_pixel', 'google_tag_manager', 'linkedin_tag', 'calendar', 'live_chat', 'payments', 'accounting'].map((integration) => (
                  <div key={integration}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.integrations.includes(integration)}
                        onCheckedChange={() => setFormData({ ...formData, integrations: toggleArrayItem(formData.integrations, integration) })}
                        id={integration}
                      />
                      <Label htmlFor={integration}>{t(`professionalWebsitePoc:step8.integrations.${integration}`)}</Label>
                    </div>
                    {formData.integrations.includes(integration) && ['crm', 'email_marketing', 'calendar', 'live_chat', 'payments', 'accounting'].includes(integration) && (
                      <Input
                        className="mt-2 ml-6"
                        value={formData[`${integration === 'email_marketing' ? 'emailSystem' : integration === 'live_chat' ? 'chatSystem' : integration === 'payments' ? 'paymentSystem' : integration === 'accounting' ? 'accountingSystem' : integration === 'calendar' ? 'calendarSystem' : 'crmSystem'}` as keyof FormData] as string}
                        onChange={(e) => setFormData({ ...formData, [`${integration === 'email_marketing' ? 'emailSystem' : integration === 'live_chat' ? 'chatSystem' : integration === 'payments' ? 'paymentSystem' : integration === 'accounting' ? 'accountingSystem' : integration === 'calendar' ? 'calendarSystem' : 'crmSystem'}`]: e.target.value })}
                        placeholder={t('professionalWebsitePoc:step8.placeholders.system')}
                      />
                    )}
                  </div>
                ))}
                <div className="mt-4">
                  <Label htmlFor="otherIntegrations">{t('professionalWebsitePoc:step8.fields.other')}</Label>
                  <Input
                    id="otherIntegrations"
                    value={formData.otherIntegrations}
                    onChange={(e) => setFormData({ ...formData, otherIntegrations: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step8.placeholders.other')}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step9.sectionTitle')}</h3>
              <div className="space-y-4">
                <RadioGroup value={formData.aiTone} onValueChange={(value) => setFormData({ ...formData, aiTone: value })}>
                  {['formal', 'friendly', 'expert', 'motivating', 'direct'].map((tone) => (
                    <div key={tone} className="flex flex-col space-y-1 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={tone} id={tone} />
                        <Label htmlFor={tone} className="font-semibold">
                          {t(`professionalWebsitePoc:step9.tones.${tone}.title`)}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {t(`professionalWebsitePoc:step9.tones.${tone}.for`)}
                      </p>
                      <p className="text-sm text-muted-foreground ml-6 italic">
                        {t(`professionalWebsitePoc:step9.tones.${tone}.example`)}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
                <div className="mt-4">
                  <Label htmlFor="aiGuidelines">{t('professionalWebsitePoc:step9.fields.guidelines')}</Label>
                  <Textarea
                    id="aiGuidelines"
                    value={formData.aiGuidelines}
                    onChange={(e) => setFormData({ ...formData, aiGuidelines: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step9.placeholders.guidelines')}
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.aiGuidelines.length} / 1000
                  </p>
                </div>
                <div>
                  <Label htmlFor="companyValues">{t('professionalWebsitePoc:step9.fields.values')}</Label>
                  <Textarea
                    id="companyValues"
                    value={formData.companyValues}
                    onChange={(e) => setFormData({ ...formData, companyValues: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step9.placeholders.values')}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step10.sectionTitle')}</h3>
              <div className="space-y-4">
                {formData.aiQuestions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div>
                      <Label htmlFor={`question-${index}`}>{t('professionalWebsitePoc:step10.fields.question')} {index + 1}</Label>
                      <Input
                        id={`question-${index}`}
                        value={q.question}
                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                        placeholder={t(`professionalWebsitePoc:step10.placeholders.question${index + 1}`)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`answer-${index}`}>{t('professionalWebsitePoc:step10.fields.answer')}</Label>
                      <Textarea
                        id={`answer-${index}`}
                        value={q.answer}
                        onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                        placeholder={t('professionalWebsitePoc:step10.placeholders.answer')}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                {formData.aiQuestions.length < 10 && (
                  <Button type="button" variant="outline" onClick={addQuestion} className="w-full">
                    + {t('professionalWebsitePoc:step10.addQuestion')}
                  </Button>
                )}
                <div className="mt-4">
                  <Label htmlFor="additionalTopics">{t('professionalWebsitePoc:step10.fields.additionalTopics')}</Label>
                  <Textarea
                    id="additionalTopics"
                    value={formData.additionalTopics}
                    onChange={(e) => setFormData({ ...formData, additionalTopics: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step10.placeholders.additionalTopics')}
                    rows={5}
                  />
                </div>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                  💡 {t('professionalWebsitePoc:step10.tip')}
                </p>
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step11.sectionTitle')}</h3>
              <div className="space-y-3">
                {['answer_questions', 'help_choose', 'collect_data', 'schedule_meetings', 'qualify_leads', 'redirect_support', 'send_materials', 'handle_faq', 'help_navigation', 'collect_feedback'].map((func) => (
                  <div key={func} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.aiFunctions.includes(func)}
                        onCheckedChange={() => setFormData({ ...formData, aiFunctions: toggleArrayItem(formData.aiFunctions, func) })}
                        id={func}
                      />
                      <Label htmlFor={func} className="font-semibold">
                        {t(`professionalWebsitePoc:step11.functions.${func}.title`)}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {t(`professionalWebsitePoc:step11.functions.${func}.description`)}
                    </p>
                  </div>
                ))}
                <div className="mt-4">
                  <Label htmlFor="aiSpecialCases">{t('professionalWebsitePoc:step11.fields.specialCases')}</Label>
                  <Textarea
                    id="aiSpecialCases"
                    value={formData.aiSpecialCases}
                    onChange={(e) => setFormData({ ...formData, aiSpecialCases: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step11.placeholders.specialCases')}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="aiLimits">{t('professionalWebsitePoc:step11.fields.limits')}</Label>
                  <Textarea
                    id="aiLimits"
                    value={formData.aiLimits}
                    onChange={(e) => setFormData({ ...formData, aiLimits: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step11.placeholders.limits')}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step12.sectionTitle')}</h3>
              <div className="space-y-4">
                <RadioGroup value={formData.aiAvailability} onValueChange={(value) => setFormData({ ...formData, aiAvailability: value })}>
                  {['24/7', 'business', 'after', 'always'].map((avail) => (
                    <div key={avail} className="flex flex-col space-y-1 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={avail} id={avail} />
                        <Label htmlFor={avail} className="font-semibold">
                          {t(`professionalWebsitePoc:step12.availability.${avail}.title`)}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {t(`professionalWebsitePoc:step12.availability.${avail}.description`)}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
                {formData.aiAvailability === 'business' && (
                  <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="businessHoursFrom">{t('professionalWebsitePoc:step12.fields.from')}</Label>
                        <Input
                          id="businessHoursFrom"
                          type="time"
                          value={formData.businessHoursFrom}
                          onChange={(e) => setFormData({ ...formData, businessHoursFrom: e.target.value })}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="businessHoursTo">{t('professionalWebsitePoc:step12.fields.to')}</Label>
                        <Input
                          id="businessHoursTo"
                          type="time"
                          value={formData.businessHoursTo}
                          onChange={(e) => setFormData({ ...formData, businessHoursTo: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>{t('professionalWebsitePoc:step12.fields.days')}</Label>
                      <div className="flex gap-2 mt-2">
                        {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                          <div key={day} className="flex items-center space-x-2">
                            <Checkbox
                              checked={formData.businessDays.includes(day)}
                              onCheckedChange={() => setFormData({ ...formData, businessDays: toggleArrayItem(formData.businessDays, day) })}
                              id={day}
                            />
                            <Label htmlFor={day}>{t(`professionalWebsitePoc:step12.days.${day}`)}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="aiWelcomeMessage">{t('professionalWebsitePoc:step12.fields.welcomeMessage')}</Label>
                  <Textarea
                    id="aiWelcomeMessage"
                    value={formData.aiWelcomeMessage}
                    onChange={(e) => setFormData({ ...formData, aiWelcomeMessage: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step12.placeholders.welcomeMessage')}
                    rows={2}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.aiWelcomeMessage.length} / 300
                  </p>
                </div>
                {(formData.aiAvailability === 'business' || formData.aiAvailability === 'after') && (
                  <div>
                    <Label htmlFor="aiOutOfHoursMessage">{t('professionalWebsitePoc:step12.fields.outOfHoursMessage')}</Label>
                    <Textarea
                      id="aiOutOfHoursMessage"
                      value={formData.aiOutOfHoursMessage}
                      onChange={(e) => setFormData({ ...formData, aiOutOfHoursMessage: e.target.value })}
                      placeholder={t('professionalWebsitePoc:step12.placeholders.outOfHoursMessage')}
                      rows={2}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step13.sectionTitle')}</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">{t('professionalWebsitePoc:step13.fields.primaryColor')}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      placeholder="#0D9488"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('professionalWebsitePoc:step13.descriptions.primary')}
                  </p>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">{t('professionalWebsitePoc:step13.fields.secondaryColor')}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      placeholder="#6366F1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('professionalWebsitePoc:step13.descriptions.secondary')}
                  </p>
                </div>
                <div>
                  <Label htmlFor="accentColor">{t('professionalWebsitePoc:step13.fields.accentColor')}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      placeholder="#F59E0B"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('professionalWebsitePoc:step13.descriptions.accent')}
                  </p>
                </div>
                <div>
                  <Label>{t('professionalWebsitePoc:step13.fields.colorScheme')}</Label>
                  <RadioGroup value={formData.colorScheme} onValueChange={(value) => setFormData({ ...formData, colorScheme: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">{t('professionalWebsitePoc:step13.schemes.light')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">{t('professionalWebsitePoc:step13.schemes.dark')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auto" id="auto" />
                      <Label htmlFor="auto">{t('professionalWebsitePoc:step13.schemes.auto')}</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      checked={formData.hasBrandBook}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasBrandBook: !!checked })}
                      id="hasBrandBook"
                    />
                    <Label htmlFor="hasBrandBook">{t('professionalWebsitePoc:step13.fields.hasBrandBook')}</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step14.sectionTitle')}</h3>
              <div className="space-y-3">
                {['logo', 'product_photos', 'team_photos', 'icons', 'videos', 'certificates', 'infographics'].map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.availableMaterials.includes(material)}
                      onCheckedChange={() => setFormData({ ...formData, availableMaterials: toggleArrayItem(formData.availableMaterials, material) })}
                      id={material}
                    />
                    <Label htmlFor={material}>{t(`professionalWebsitePoc:step14.materials.${material}`)}</Label>
                  </div>
                ))}
                <div className="mt-4">
                  <Label htmlFor="materialLinks">{t('professionalWebsitePoc:step14.fields.links')}</Label>
                  <Textarea
                    id="materialLinks"
                    value={formData.materialLinks}
                    onChange={(e) => setFormData({ ...formData, materialLinks: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step14.placeholders.links')}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.needsPhotography}
                    onCheckedChange={(checked) => setFormData({ ...formData, needsPhotography: !!checked })}
                    id="needsPhotography"
                  />
                  <Label htmlFor="needsPhotography">{t('professionalWebsitePoc:step14.fields.photography')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.needsGraphics}
                    onCheckedChange={(checked) => setFormData({ ...formData, needsGraphics: !!checked })}
                    id="needsGraphics"
                  />
                  <Label htmlFor="needsGraphics">{t('professionalWebsitePoc:step14.fields.graphics')}</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step15.sectionTitle')}</h3>
              <div className="space-y-4">
                {formData.inspirations.map((insp, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div>
                      <Label htmlFor={`inspiration-url-${index}`}>{t('professionalWebsitePoc:step15.fields.website')} {index + 1}</Label>
                      <Input
                        id={`inspiration-url-${index}`}
                        value={insp.url}
                        onChange={(e) => updateInspiration(index, 'url', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label htmlFor={`inspiration-notes-${index}`}>{t('professionalWebsitePoc:step15.fields.notes')}</Label>
                      <Textarea
                        id={`inspiration-notes-${index}`}
                        value={insp.notes}
                        onChange={(e) => updateInspiration(index, 'notes', e.target.value)}
                        placeholder={t('professionalWebsitePoc:step15.placeholders.notes')}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                {formData.inspirations.length < 5 && (
                  <Button type="button" variant="outline" onClick={addInspiration} className="w-full">
                    + {t('professionalWebsitePoc:step15.addInspiration')}
                  </Button>
                )}
                <div className="mt-4">
                  <Label htmlFor="dislikedSites">{t('professionalWebsitePoc:step15.fields.disliked')}</Label>
                  <Textarea
                    id="dislikedSites"
                    value={formData.dislikedSites}
                    onChange={(e) => setFormData({ ...formData, dislikedSites: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step15.placeholders.disliked')}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t('professionalWebsitePoc:step15.fields.style')}</Label>
                  <RadioGroup value={formData.preferredStyle} onValueChange={(value) => setFormData({ ...formData, preferredStyle: value })}>
                    {['minimalist', 'modern', 'corporate', 'creative', 'editorial'].map((style) => (
                      <div key={style} className="flex flex-col space-y-1 p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={style} id={style} />
                          <Label htmlFor={style} className="font-semibold">
                            {t(`professionalWebsitePoc:step15.styles.${style}.title`)}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          {t(`professionalWebsitePoc:step15.styles.${style}.description`)}
                        </p>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        );

      case 16:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step16.sectionTitle')}</h3>
              <div className="space-y-4">
                <RadioGroup value={formData.contentStatus} onValueChange={(value) => setFormData({ ...formData, contentStatus: value })}>
                  {['complete', 'partial', 'needed', 'structure'].map((status) => (
                    <div key={status} className="flex flex-col space-y-1 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={status} id={status} />
                        <Label htmlFor={status} className="font-semibold">
                          {t(`professionalWebsitePoc:step16.status.${status}.title`)}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {t(`professionalWebsitePoc:step16.status.${status}.description`)}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
                <div className="mt-4">
                  <Label>{t('professionalWebsitePoc:step16.fields.available')}</Label>
                  <div className="space-y-2 mt-2">
                    {['product_descriptions', 'company_info', 'case_studies', 'testimonials', 'certificates', 'faq', 'blog_articles', 'privacy_policy', 'terms'].map((content) => (
                      <div key={content} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.availableContent.includes(content)}
                          onCheckedChange={() => setFormData({ ...formData, availableContent: toggleArrayItem(formData.availableContent, content) })}
                          id={content}
                        />
                        <Label htmlFor={content}>{t(`professionalWebsitePoc:step16.content.${content}`)}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="keyMessages">{t('professionalWebsitePoc:step16.fields.keyMessages')}</Label>
                  <Textarea
                    id="keyMessages"
                    value={formData.keyMessages}
                    onChange={(e) => setFormData({ ...formData, keyMessages: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step16.placeholders.keyMessages')}
                    rows={5}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step17.sectionTitle')}</h3>
              <div className="space-y-3">
                {['visits', 'traffic_sources', 'time_on_site', 'bounce_rate', 'form_submissions', 'cta_clicks', 'downloads', 'ai_conversations', 'conversions', 'scroll_depth', 'heatmaps'].map((metric) => (
                  <div key={metric} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.trackingMetrics.includes(metric)}
                        onCheckedChange={() => setFormData({ ...formData, trackingMetrics: toggleArrayItem(formData.trackingMetrics, metric) })}
                        id={metric}
                      />
                      <Label htmlFor={metric} className="font-semibold">
                        {t(`professionalWebsitePoc:step17.metrics.${metric}.title`)}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {t(`professionalWebsitePoc:step17.metrics.${metric}.description`)}
                    </p>
                  </div>
                ))}
                <div className="mt-4">
                  <Label htmlFor="conversionGoals">{t('professionalWebsitePoc:step17.fields.goals')}</Label>
                  <Textarea
                    id="conversionGoals"
                    value={formData.conversionGoals}
                    onChange={(e) => setFormData({ ...formData, conversionGoals: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step17.placeholders.goals')}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="conversionValue">{t('professionalWebsitePoc:step17.fields.value')}</Label>
                  <Input
                    id="conversionValue"
                    value={formData.conversionValue}
                    onChange={(e) => setFormData({ ...formData, conversionValue: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step17.placeholders.value')}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 18:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step18.sectionTitle')}</h3>
              <div className="space-y-4">
                <RadioGroup value={formData.reportingFrequency} onValueChange={(value) => setFormData({ ...formData, reportingFrequency: value })}>
                  {['weekly', 'monthly', 'none', 'dashboard'].map((freq) => (
                    <div key={freq} className="flex flex-col space-y-1 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={freq} id={freq} />
                        <Label htmlFor={freq} className="font-semibold">
                          {t(`professionalWebsitePoc:step18.frequency.${freq}.title`)}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {t(`professionalWebsitePoc:step18.frequency.${freq}.description`)}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
                <div className="mt-4">
                  <Label htmlFor="reportContent">{t('professionalWebsitePoc:step18.fields.content')}</Label>
                  <Textarea
                    id="reportContent"
                    value={formData.reportContent}
                    onChange={(e) => setFormData({ ...formData, reportContent: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step18.placeholders.content')}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="analyticsAccess">{t('professionalWebsitePoc:step18.fields.access')}</Label>
                  <Input
                    id="analyticsAccess"
                    value={formData.analyticsAccess}
                    onChange={(e) => setFormData({ ...formData, analyticsAccess: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step18.placeholders.access')}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.wantsTraining}
                    onCheckedChange={(checked) => setFormData({ ...formData, wantsTraining: !!checked })}
                    id="wantsTraining"
                  />
                  <Label htmlFor="wantsTraining">{t('professionalWebsitePoc:step18.fields.training')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.wantsLookerStudio}
                    onCheckedChange={(checked) => setFormData({ ...formData, wantsLookerStudio: !!checked })}
                    id="wantsLookerStudio"
                  />
                  <Label htmlFor="wantsLookerStudio">{t('professionalWebsitePoc:step18.fields.looker')}</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 19:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step19.sectionTitle')}</h3>
              <div className="space-y-4">
                <RadioGroup value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                  {['express', 'standard', 'comfort', 'specific'].map((time) => (
                    <div key={time} className="flex flex-col space-y-1 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={time} id={time} />
                        <Label htmlFor={time} className="font-semibold">
                          {t(`professionalWebsitePoc:step19.timeline.${time}.title`)}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {t(`professionalWebsitePoc:step19.timeline.${time}.description`)}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
                {formData.timeline === 'specific' && (
                  <div className="mt-4">
                    <Label htmlFor="specificDate">{t('professionalWebsitePoc:step19.fields.date')}</Label>
                    <Input
                      id="specificDate"
                      type="date"
                      value={formData.specificDate}
                      onChange={(e) => setFormData({ ...formData, specificDate: e.target.value })}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="keyDates">{t('professionalWebsitePoc:step19.fields.keyDates')}</Label>
                  <Textarea
                    id="keyDates"
                    value={formData.keyDates}
                    onChange={(e) => setFormData({ ...formData, keyDates: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step19.placeholders.keyDates')}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t('professionalWebsitePoc:step19.fields.priority')}</Label>
                  <RadioGroup value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="speed" id="speed" />
                      <Label htmlFor="speed">{t('professionalWebsitePoc:step19.priority.speed')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quality" id="quality" />
                      <Label htmlFor="quality">{t('professionalWebsitePoc:step19.priority.quality')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balance" id="balance" />
                      <Label htmlFor="balance">{t('professionalWebsitePoc:step19.priority.balance')}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        );

      case 20:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step20.sectionTitle')}</h3>
              <div className="space-y-3">
                {['gdpr', 'wcag', 'multilingual', 'mobile_first', 'performance', 'seo'].map((req) => (
                  <div key={req} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.complianceRequirements.includes(req)}
                        onCheckedChange={() => setFormData({ ...formData, complianceRequirements: toggleArrayItem(formData.complianceRequirements, req) })}
                        id={req}
                      />
                      <Label htmlFor={req} className="font-semibold">
                        {t(`professionalWebsitePoc:step20.requirements.${req}.title`)}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {t(`professionalWebsitePoc:step20.requirements.${req}.description`)}
                    </p>
                  </div>
                ))}
                {formData.complianceRequirements.includes('multilingual') && (
                  <div className="mt-2">
                    <Label htmlFor="languages">{t('professionalWebsitePoc:step20.fields.languages')}</Label>
                    <Input
                      id="languages"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      placeholder={t('professionalWebsitePoc:step20.placeholders.languages')}
                    />
                  </div>
                )}
                <div className="mt-4">
                  <Label htmlFor="specificTechnology">{t('professionalWebsitePoc:step20.fields.technology')}</Label>
                  <Textarea
                    id="specificTechnology"
                    value={formData.specificTechnology}
                    onChange={(e) => setFormData({ ...formData, specificTechnology: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step20.placeholders.technology')}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="legalRequirements">{t('professionalWebsitePoc:step20.fields.legal')}</Label>
                  <Textarea
                    id="legalRequirements"
                    value={formData.legalRequirements}
                    onChange={(e) => setFormData({ ...formData, legalRequirements: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step20.placeholders.legal')}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="premiumFeatures">{t('professionalWebsitePoc:step20.fields.premium')}</Label>
                  <Textarea
                    id="premiumFeatures"
                    value={formData.premiumFeatures}
                    onChange={(e) => setFormData({ ...formData, premiumFeatures: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step20.placeholders.premium')}
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.needsHosting}
                    onCheckedChange={(checked) => setFormData({ ...formData, needsHosting: !!checked })}
                    id="needsHosting"
                  />
                  <Label htmlFor="needsHosting">{t('professionalWebsitePoc:step20.fields.hosting')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.needsDomain}
                    onCheckedChange={(checked) => setFormData({ ...formData, needsDomain: !!checked })}
                    id="needsDomain"
                  />
                  <Label htmlFor="needsDomain">{t('professionalWebsitePoc:step20.fields.domain')}</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 21:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:step21.sectionTitle')}</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectContactName">{t('professionalWebsitePoc:step21.fields.name')}</Label>
                  <Input
                    id="projectContactName"
                    value={formData.projectContactName}
                    onChange={(e) => setFormData({ ...formData, projectContactName: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step21.placeholders.name')}
                  />
                </div>
                <div>
                  <Label htmlFor="projectContactRole">{t('professionalWebsitePoc:step21.fields.role')}</Label>
                  <Input
                    id="projectContactRole"
                    value={formData.projectContactRole}
                    onChange={(e) => setFormData({ ...formData, projectContactRole: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step21.placeholders.role')}
                  />
                </div>
                <div>
                  <Label htmlFor="projectContactEmail">{t('professionalWebsitePoc:step21.fields.email')}</Label>
                  <Input
                    id="projectContactEmail"
                    type="email"
                    value={formData.projectContactEmail}
                    onChange={(e) => setFormData({ ...formData, projectContactEmail: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step21.placeholders.email')}
                  />
                </div>
                <div>
                  <Label htmlFor="projectContactPhone">{t('professionalWebsitePoc:step21.fields.phone')}</Label>
                  <Input
                    id="projectContactPhone"
                    value={formData.projectContactPhone}
                    onChange={(e) => setFormData({ ...formData, projectContactPhone: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step21.placeholders.phone')}
                  />
                </div>
                <div>
                  <Label htmlFor="preferredChannel">{t('professionalWebsitePoc:step21.fields.channel')}</Label>
                  <RadioGroup value={formData.preferredChannel} onValueChange={(value) => setFormData({ ...formData, preferredChannel: value })}>
                    {['email', 'phone', 'slack', 'teams', 'whatsapp', 'other'].map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <RadioGroupItem value={channel} id={`channel-${channel}`} />
                        <Label htmlFor={`channel-${channel}`}>{t(`professionalWebsitePoc:step21.channels.${channel}`)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="decisionMakers">{t('professionalWebsitePoc:step21.fields.decisionMakers')}</Label>
                  <Textarea
                    id="decisionMakers"
                    value={formData.decisionMakers}
                    onChange={(e) => setFormData({ ...formData, decisionMakers: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step21.placeholders.decisionMakers')}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t('professionalWebsitePoc:step21.fields.process')}</Label>
                  <RadioGroup value={formData.decisionProcess} onValueChange={(value) => setFormData({ ...formData, decisionProcess: value })}>
                    {['solo', 'duo', 'team', 'board'].map((process) => (
                      <div key={process} className="flex items-center space-x-2">
                        <RadioGroupItem value={process} id={process} />
                        <Label htmlFor={process}>{t(`professionalWebsitePoc:step21.process.${process}`)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="communicationExpectations">{t('professionalWebsitePoc:step21.fields.expectations')}</Label>
                  <Textarea
                    id="communicationExpectations"
                    value={formData.communicationExpectations}
                    onChange={(e) => setFormData({ ...formData, communicationExpectations: e.target.value })}
                    placeholder={t('professionalWebsitePoc:step21.placeholders.expectations')}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 22:
        return (
          <div className="space-y-8">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-bold mb-2">{t('professionalWebsitePoc:summary.title')}</h3>
              <p className="text-muted-foreground">{t('professionalWebsitePoc:title')}</p>
            </div>

            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold">{t('professionalWebsitePoc:summary.sections.company')}</h4>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                  {t('professionalWebsitePoc:summary.edit')}
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>{formData.name}</strong> | {formData.company}</p>
                <p>{formData.email} | {formData.phone}</p>
                <p>{formData.industry} | {formData.companySize} {t('professionalWebsitePoc:summary.employees')}</p>
                {formData.currentWebsite && <p>{formData.currentWebsite}</p>}
              </div>
            </div>

            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold">{t('professionalWebsitePoc:summary.sections.structure')}</h4>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(4)}>
                  {t('professionalWebsitePoc:summary.edit')}
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>{t('professionalWebsitePoc:summary.subpages')}:</strong> {formData.subpages.length}</p>
                <p><strong>{t('professionalWebsitePoc:summary.goal')}:</strong> {formData.siteGoal}</p>
                <p><strong>{t('professionalWebsitePoc:summary.actions')}:</strong> {formData.userActions.length}</p>
              </div>
            </div>

            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold">{t('professionalWebsitePoc:summary.sections.ai')}</h4>
                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(9)}>
                  {t('professionalWebsitePoc:summary.edit')}
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>{t('professionalWebsitePoc:summary.tone')}:</strong> {formData.aiTone}</p>
                <p><strong>{t('professionalWebsitePoc:summary.availability')}:</strong> {formData.aiAvailability}</p>
                <p><strong>{t('professionalWebsitePoc:summary.questions')}:</strong> {formData.aiQuestions.filter(q => q.question).length}</p>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">{t('professionalWebsitePoc:summary.sections.pricing')}</h4>
              <p className="text-3xl font-bold mb-4">{calculateTotal().toLocaleString()} zł / {Math.round(calculateTotal() / 4.3).toLocaleString()} EUR</p>
              <ul className="space-y-1 text-sm">
                <li>✓ 3-4 {t('professionalWebsitePoc:summary.subpages')}</li>
                <li>✓ {t('professionalWebsitePoc:summary.responsiveDesign')}</li>
                <li>✓ {t('professionalWebsitePoc:summary.aiAssistant')}</li>
                <li>✓ {formData.formTypes.length} {t('professionalWebsitePoc:summary.forms')}</li>
                <li>✓ {formData.integrations.length} {t('professionalWebsitePoc:summary.integrations')}</li>
                <li>✓ Google Analytics</li>
                <li>✓ SSL</li>
                <li>✓ {t('professionalWebsitePoc:summary.backups')}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="finalNotes">{t('professionalWebsitePoc:step22.fields.finalNotes')}</Label>
                <Textarea
                  id="finalNotes"
                  value={formData.finalNotes}
                  onChange={(e) => setFormData({ ...formData, finalNotes: e.target.value })}
                  placeholder={t('professionalWebsitePoc:step22.placeholders.finalNotes')}
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="mainConcerns">{t('professionalWebsitePoc:step22.fields.concerns')}</Label>
                <Textarea
                  id="mainConcerns"
                  value={formData.mainConcerns}
                  onChange={(e) => setFormData({ ...formData, mainConcerns: e.target.value })}
                  placeholder={t('professionalWebsitePoc:step22.placeholders.concerns')}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="mostImportant">{t('professionalWebsitePoc:step22.fields.important')}</Label>
                <Textarea
                  id="mostImportant"
                  value={formData.mostImportant}
                  onChange={(e) => setFormData({ ...formData, mostImportant: e.target.value })}
                  placeholder={t('professionalWebsitePoc:step22.placeholders.important')}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.wantsAdditionalServices}
                  onCheckedChange={(checked) => setFormData({ ...formData, wantsAdditionalServices: !!checked })}
                  id="wantsAdditionalServices"
                />
                <Label htmlFor="wantsAdditionalServices">{t('professionalWebsitePoc:step22.fields.additionalServices')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: !!checked })}
                  id="termsAccepted"
                />
                <Label htmlFor="termsAccepted">{t('professionalWebsitePoc:step22.fields.terms')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.gdprConsent}
                  onCheckedChange={(checked) => setFormData({ ...formData, gdprConsent: !!checked })}
                  id="gdprConsent"
                />
                <Label htmlFor="gdprConsent">{t('professionalWebsitePoc:step22.fields.gdpr')}</Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderLeftContent = () => (
    <div className="bg-muted/30 p-3 sm:p-6 lg:p-12 flex flex-col justify-between overflow-y-auto lg:min-h-0 w-full max-w-full">
      <div>
        {/* Logo "P" - mniejsze (12x12) */}
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
          <span className="text-primary text-2xl font-bold">P</span>
        </div>
        
        {/* Duży numer kroku */}
        <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary mb-6">
          {currentStep}
        </div>
        
        {/* Główne pytanie - większy tekst */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 break-words">
          {t(`professionalWebsitePoc:step${currentStep}.title`)}
        </h2>
        
        {/* Wyjaśnienie/kontekst */}
        <p className="text-muted-foreground text-sm sm:text-base break-words">
          {t(`professionalWebsitePoc:step${currentStep}.description`)}
        </p>
      </div>
      
      {/* Progress bar - na dole lewej kolumny */}
      <div className="mt-8 lg:mt-12">
        <CompactPocProgressBar
          currentStep={currentStep}
          steps={stepLabels}
          totalSteps={22}
        />
      </div>
    </div>
  );

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl w-[95vw] sm:w-[90vw] lg:w-full p-0 overflow-hidden max-h-[95vh] sm:max-h-[90vh] mx-2 sm:mx-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 h-full max-h-[95vh] sm:max-h-[90vh] w-full max-w-full overflow-x-hidden">
            
            {/* Lewa kolumna - tylko dla kroków 1-21 */}
            {currentStep <= 21 && renderLeftContent()}
            
            {/* Prawa kolumna - pola formularza */}
            <div className="p-3 sm:p-6 lg:p-12 pb-32 flex flex-col overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[90vh] lg:min-h-0 w-full max-w-full">
              {currentStep === 22 && <h2 className="text-2xl font-bold mb-4">{t('professionalWebsitePoc:title')}</h2>}
              {renderStepContent()}
              
              {/* Navigation buttons */}
              <div className="flex gap-3 mt-12 flex-shrink-0 pt-4 bg-gradient-to-t from-background via-background to-transparent">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('common:navigation.back')}
                  </Button>
                )}
                {currentStep < 22 ? (
                  <Button onClick={handleNext} className="flex-1">
                    {t('common:navigation.next')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting || !formData.gdprConsent || !formData.termsAccepted} className="flex-1">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('common:actions.submitting')}
                      </>
                    ) : (
                      <>
                        {t('professionalWebsitePoc:summary.submit')} {calculateTotal().toLocaleString()} zł
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
