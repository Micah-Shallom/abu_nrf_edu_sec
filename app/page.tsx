import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Camera,
  Clock,
  CheckCircle,
  BarChart3,
  Smartphone,
  Users,
  AlertTriangle,
  ArrowRight,
  Menu,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-teal-600" />
              <span className="text-xl font-bold text-navy-900">ABUNRFEDUSEC</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-gray-700 hover:text-teal-600 transition-colors">
                Home
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-teal-600 transition-colors">
                How It Works
              </Link>
              <Link href="#register" className="text-gray-700 hover:text-teal-600 transition-colors">
                Register Vehicle
              </Link>
              <Link href="#dashboard" className="text-gray-700 hover:text-teal-600 transition-colors">
                Security Dashboard
              </Link>
              <Link href="#faq" className="text-gray-700 hover:text-teal-600 transition-colors">
                FAQ
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-teal-600 transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <Image
          src="/placeholder.svg?height=800&width=1200"
          alt="ANPR Security Gate"
          fill
          className="object-cover opacity-30"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Secure. Streamlined. <span className="text-teal-400">Smarter Campus Access.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              An intelligent system to track, approve, and manage vehicle entry and exit across campuses—powered by
              license plate recognition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Register Your Vehicle
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg transition-all duration-300 bg-transparent"
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advanced Security Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience seamless campus access with cutting-edge technology designed for modern security needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                  <Camera className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Instant ANPR Check-In/Out</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Seamlessly enter and exit campuses using license plate scans—no waiting required.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Real-Time Vehicle History</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Track your vehicle's movement history across all connected campuses in real-time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Driver Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Receive mobile approval prompts before each check-in and check-out for enhanced security.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Traffic Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Visual feedback on traffic congestion and entry activity across all campus gates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent system makes campus access effortless with just four simple steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-teal-100 text-teal-800 hover:bg-teal-100">1</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Camera Detects Plate</h3>
                <p className="text-gray-600 text-sm">
                  Advanced cameras automatically scan and capture license plate information
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 hover:bg-blue-100">2</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">ANPR Software Verifies</h3>
                <p className="text-gray-600 text-sm">
                  Our AI-powered system instantly verifies vehicle registration and permissions
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-green-100 text-green-800 hover:bg-green-100">3</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Gate Opens Automatically</h3>
                <p className="text-gray-600 text-sm">
                  Authorized vehicles gain immediate access without stopping or waiting
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-purple-100 text-purple-800 hover:bg-purple-100">
                    4
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Activity Logged</h3>
                <p className="text-gray-600 text-sm">
                  All check-ins and check-outs are automatically recorded in your account
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Mobile Security Alert"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Experience Seamless Campus Access</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Zero Waiting Time</h3>
                    <p className="text-gray-600">
                      Drive through gates without stopping - our system recognizes you instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Verified Entry History</h3>
                    <p className="text-gray-600">
                      Complete audit trail of all your campus visits with timestamps and locations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Smartphone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Mobile Check-in Commands</h3>
                    <p className="text-gray-600">
                      Receive real-time notifications and control access permissions from your phone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Enhanced Guest Access Process</h3>
                    <p className="text-gray-600">
                      Easily manage visitor access with temporary permissions and automated notifications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Campus-wide Integration</h3>
                    <p className="text-gray-600">
                      Single registration works across all connected campus locations and facilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Access Notice */}
      <section className="py-12 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-amber-200 bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-amber-600" />
                    Guest Access Available
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Don't have a mobile phone? Our smart gates still allow manual access review for guests or special
                    cases. Security will be alerted automatically to assist with entry verification and temporary access
                    permissions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Registration CTA Banner */}
      <section
        id="register"
        className="py-20 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-700 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start managing your campus access like a pro.</h2>
            <p className="text-xl mb-8 text-teal-100">
              Join thousands of users who have already streamlined their campus experience with our intelligent security
              system.
            </p>
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our ANPR security system.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How does ANPR work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  ANPR (Automatic Number Plate Recognition) uses advanced cameras and AI software to automatically read
                  and verify license plates. When you approach a gate, the system captures your plate number, checks it
                  against our database, and grants access if you're authorized - all in seconds.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What if my plate isn't recognized?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  If your plate isn't recognized, the system will alert security personnel who can manually verify your
                  identity and grant access. You'll also receive a mobile notification to update your registration
                  details if needed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I see my vehicle history?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Yes! Your personal dashboard provides a complete history of all your campus visits, including entry
                  and exit times, locations, and duration of stays. You can export this data for personal records or
                  expense reporting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How do I grant guest access?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Through your mobile app or web dashboard, you can create temporary access codes for guests. Simply
                  enter their license plate number, set the duration of access, and the system will automatically
                  recognize them during their visit period.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-teal-400" />
                <span className="text-2xl font-bold">ABUNRFEDUSEC</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Advanced intercampus vehicle security platform powered by ANPR technology. Streamlining campus access
                while maintaining the highest security standards.
              </p>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contact@abunrfedusec.com</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Home
                </Link>
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Features
                </Link>
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  How It Works
                </Link>
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Security Dashboard
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Data Protection
                </Link>
                <Link href="#" className="block text-gray-300 hover:text-teal-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ABUNRFEDUSEC. All rights reserved.</p>
              <p className="text-gray-400 text-sm mt-4 md:mt-0">
                ANPR data is stored securely and complies with data protection standards.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
