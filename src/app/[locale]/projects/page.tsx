import Link from 'next/link';

export default async function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  const projects = [
    {
      id: "duplex",
      title: locale === 'en' ? "Duplexes" : "دوبلكس",
      subtitle: locale === 'en' ? "Elegant spaces for families" : "مساحات راقية تناسب العائلات",
      cta: locale === 'en' ? "Explore Duplexes" : "استكشف الدوبلكسات",
      image: "/images/projects/duplex.jpg"
    },
    {
      id: "villas",
      title: locale === 'en' ? "Villas" : "فلل",
      subtitle: locale === 'en' ? "Luxury villas with modern designs" : "فلل فاخرة بتصاميم عصرية",
      cta: locale === 'en' ? "Explore Villas" : "استكشف الفلل",
      image: "/images/projects/villas.jpg"
    },
    {
      id: "houses",
      title: locale === 'en' ? "Houses" : "بيوت",
      subtitle: locale === 'en' ? "Comfortable homes with unique designs" : "منازل مريحة بتصاميم مميزة",
      cta: locale === 'en' ? "Explore Houses" : "استكشف البيوت",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    },
    {
      id: "apartments",
      title: locale === 'en' ? "Apartments" : "شقق",
      subtitle: locale === 'en' ? "Modern residential apartments" : "شقق سكنية عصرية",
      cta: locale === 'en' ? "Explore Apartments" : "استكشف الشقق",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
    },
    {
      id: "rentals",
      title: locale === 'en' ? "Rentals" : "إيجارات",
      subtitle: locale === 'en' ? "Properties for rent in premium locations" : "عقارات للإيجار بمواقع مميزة",
      cta: locale === 'en' ? "Explore Rentals" : "استكشف الإيجارات",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    },
    {
      id: "lands",
      title: locale === 'en' ? "Lands" : "أراضي",
      subtitle: locale === 'en' ? "Investment opportunities and premium locations" : "فرص استثمارية ومواقع مميزة",
      cta: locale === 'en' ? "Explore Lands" : "استكشف الأراضي",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
    },
    {
      id: "factories",
      title: locale === 'en' ? "Factories" : "مصانع",
      subtitle: locale === 'en' ? "Ready industrial units for investment" : "وحدات صناعية جاهزة للاستثمار",
      cta: locale === 'en' ? "Explore Factories" : "استكشف المصانع",
      image: "https://images.unsplash.com/photo-1580982327559-c1202864ee0b?w=800&q=80" // Realistic factory exterior
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-dark-100 mb-4">{locale === 'en' ? 'Our Projects' : 'مشاريعنا'}</h1>
          <div className="w-16 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Row 1: 3 Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-6">
          {projects.slice(0, 3).map(project => (
            <Link href={`/${locale}/projects/${project.id}`} key={project.id} className="group rounded-2xl overflow-hidden shadow-lg relative h-64 md:h-72 block">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-200/90 via-dark-200/40 to-transparent z-10 transition-opacity duration-300 group-hover:bg-dark-200/60"></div>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center flex flex-col items-center justify-end h-full">
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/90 text-sm mb-4">{project.subtitle}</p>
                <span className="text-gold font-bold flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                  {project.cta} <span dir="ltr">{locale === 'en' ? '→' : '←'}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 2: 4 Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {projects.slice(3, 7).map(project => (
            <Link href={`/${locale}/projects/${project.id}`} key={project.id} className="group rounded-2xl overflow-hidden shadow-lg relative h-64 md:h-72 block">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-200/90 via-dark-200/40 to-transparent z-10 transition-opacity duration-300 group-hover:bg-dark-200/60"></div>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center flex flex-col items-center justify-end h-full">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/90 text-xs mb-4 px-2">{project.subtitle}</p>
                <span className="text-gold font-bold flex items-center justify-center gap-2 text-sm group-hover:text-white transition-colors">
                  {project.cta} <span dir="ltr">{locale === 'en' ? '→' : '←'}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
