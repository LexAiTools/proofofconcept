import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Zap, BarChart3, Cpu, Lock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Cutting-edge machine learning algorithms tailored to your business needs with continuous learning capabilities."
  },
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Process millions of data points in real-time with our optimized infrastructure and edge computing."
  },
  {
    icon: BarChart3,
    title: "Intelligent Analytics",
    description: "Transform raw data into actionable insights with predictive analytics and automated reporting."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with SOC 2 Type II, GDPR, and industry-specific regulations."
  },
  {
    icon: Cpu,
    title: "Scalable Architecture",
    description: "Cloud-native solutions that scale automatically based on demand with 99.9% uptime guarantee."
  },
  {
    icon: Lock,
    title: "Data Privacy First",
    description: "Your data stays yours. Advanced privacy controls with encrypted processing and secure data handling."
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Built for Enterprise Scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI platform combines cutting-edge technology with enterprise-grade security 
            to deliver solutions that grow with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};