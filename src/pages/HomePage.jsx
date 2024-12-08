import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Clock, Search, Users, BarChart, SlidersHorizontal } from 'lucide-react';

function HomePage() {
  const [showContent, setShowContent] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    setShowContent(inView);
  }, [inView]);

  const features = [
    { icon: Camera, title: "Real-time Monitoring", description: "Get instant alerts and live feed from your CCTV cameras, ensuring you never miss a moment." },
    { icon: Clock, title: "Attendance Tracking", description: "Automatically log employee attendance with facial recognition technology." },
    { icon: Search, title: "Advanced Search", description: "Quickly find specific events or people with our powerful search algorithms." },
    { icon: SlidersHorizontal, title: "Customizable Capture Settings", description: "Full control to configure CCTV capture preferences directly through an intuitive web interface." },
    { icon: Users, title: "Multi-User Access", description: "Grant different levels of access to team members for collaborative monitoring." },
    { icon: BarChart, title: "Analytics Dashboard", description: "Gain insights from your CCTV data with our comprehensive analytics tools." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen transform -translate-y-24">
      <section className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 px-4 py-20 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent leading-normal h-14">
          Smart CCTV Logger: Next-Gen Surveillance
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          Revolutionize your security with AI-powered CCTV logging and monitoring. Get real-time insights, automate attendance, and enhance your overall security infrastructure.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/logs">View Logs</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <ScrollLink to='learn-more' smooth={true} duration={500}>Discover Features</ScrollLink>
          </Button>
        </div>
      </section>

      <div ref={ref} className="w-full">
        <section id="learn-more" className={`py-20 space-y-16 min-h-screen transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center space-y-6 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl mt-16 font-bold tracking-tight lg:text-4xl bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Why Choose Smart CCTV Logger?
            </h2>
            <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
              Our cutting-edge technology combines the power of AI with traditional CCTV systems, providing you with an unparalleled security solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {features.map((feature, index) => (
              <Card key={index} className={`transition-all duration-500 delay-${index * 100}`}>
                <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                  <feature.icon className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
