import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Heart, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About PawMatch</h1>
        <p className="text-xl text-muted-foreground">
          Helping you find the perfect canine companion through science and care
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <Brain className="h-8 w-8 text-primary mb-2" />
            <CardTitle>How Our Matching Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our algorithm considers multiple factors including your lifestyle, living situation, experience level, and
              preferences to match you with compatible dog breeds. We analyze over 15 different criteria to ensure the
              best possible match.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Heart className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We believe every person deserves to find their perfect canine companion. By matching personalities,
              lifestyles, and needs, we help create lasting bonds between humans and dogs, reducing the likelihood of
              pets being surrendered to shelters.
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Find Your Match?</h2>
        <p className="text-muted-foreground mb-6">
          Take our comprehensive quiz and discover which dog breed is perfect for your lifestyle.
        </p>
        <a
          href="/quiz"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Start Your Journey
        </a>
      </div>
    </div>
  )
}
