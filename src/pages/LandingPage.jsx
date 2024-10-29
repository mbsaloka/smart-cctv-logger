import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Shield, Clock, Search } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="space-y-16">
      <section className="flex flex-col items-center justify-center h-screen text-center space-y-6 px-4 transform -translate-y-24">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent leading-normal h-14">
          Welcome to Smart CCTV Logger
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ipsam eos facere natus dolorum nemo distinctio laudantium reiciendis laborum quidem nobis expedita nesciunt, nihil eligendi maiores dolores consequatur alias ea.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" >
            <Link to="/login">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <ScrollLink to='learn-more' smooth={true} duration={500}>Learn More</ScrollLink>
          </Button>
        </div>
      </section>

      <section id="learn-more" className="pb-60 space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent h-10">
            Why Choose CCTV Logger?
          </h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo veritatis minima expedita maiores culpa! Alias, animi accusamus? Error asperiores, quibusdam, dolorum excepturi voluptatibus a consequatur veritatis optio libero cum neque!
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { icon: Camera, title: "Real-time Monitoring", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, aliquid." },
            { icon: Clock, title: "Attendance Tracking", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, fuga." },
            { icon: Search, title: "Advanced Search", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, debitis!" },
          ].map((feature, index) => (
            <Card key={index}>
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
  )
}