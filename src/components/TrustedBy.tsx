export const TrustedBy = () => {
  const companies = [
    "TechCorp", "InnovateLabs", "DataFlow Inc", "AI Dynamics", "FutureWorks", "SmartSys"
  ];

  return (
    <section className="py-16 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg">
            Trusted by industry leaders worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity"
            >
              <div className="text-lg font-semibold text-muted-foreground">
                {company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};