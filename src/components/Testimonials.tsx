import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Testimonials = () => {
  const { t } = useTranslation('testimonials');
  
  const testimonials = [
    {
      name: t('testimonials.sarahChen.name'),
      role: t('testimonials.sarahChen.role'),
      content: t('testimonials.sarahChen.content'),
      rating: 5,
      avatar: "SC"
    },
    {
      name: t('testimonials.michaelRodriguez.name'),
      role: t('testimonials.michaelRodriguez.role'),
      content: t('testimonials.michaelRodriguez.content'),
      rating: 5,
      avatar: "MR"
    },
    {
      name: t('testimonials.jenniferWu.name'),
      role: t('testimonials.jenniferWu.role'),
      content: t('testimonials.jenniferWu.content'),
      rating: 5,
      avatar: "JW"
    }
  ];
  
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};