import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Shield, Clock, Search } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Smart CCTV Logger
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          Effortlessly manage and analyze attendance logs from your CCTV system.
          Our advanced platform provides detailed insights and easy-to-use features.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/login">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/logs">View Logs</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Camera, title: "Real-time Monitoring", description: "Live feed and instant notifications for immediate awareness." },
          { icon: Shield, title: "Secure Access", description: "Role-based permissions and encrypted data storage for maximum security." },
          { icon: Clock, title: "Attendance Tracking", description: "Automated time logging and reporting for efficient management." },
          { icon: Search, title: "Advanced Search", description: "Powerful search capabilities to quickly find specific events or individuals." },
        ].map((feature, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
              <feature.icon className="h-12 w-12 text-primary" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Why Choose CCTV Logger?</h2>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          Our platform offers unparalleled ease of use combined with powerful features,
          making it the ideal choice for businesses of all sizes.
        </p>
        <Button asChild size="lg" variant="outline">
          <Link to="/login">Start Free Trial</Link>
        </Button>
      </section>
    </div>
  )
}