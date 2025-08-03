"use client"

import { Component } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
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
  Car,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Activity,
} from "lucide-react"

type AppUser = {
  id: string
  name: string
  email: string
  role: "User" | "Security"
  station?: string
  shift?: string
}

type Vehicle = {
  id: string
  plateNumber: string
  model: string
  color: string
  type: string
  userId: string
}

type ActivityLog = {
  id: string
  vehiclePlate: string
  vehicleName: string
  entryTime: string
  exitTime?: string
}

type VehicleSecuritySystemState = {
  currentPage: string
  currentUser: AppUser | null
  users: AppUser[]
  vehicles: Vehicle[]
  activityLogs: ActivityLog[]
  isMenuOpen: boolean
  loginForm: { email: string; password: string }
  registerForm: { name: string; email: string; password: string }
  profileForm: { name: string; email: string; station: string; shift: string }
  vehicleForm: { plateNumber: string; model: string; color: string; type: string }

  showNotification: boolean;
  notificationMessage: string;
  isEntryNotification: boolean;
}

export default class VehicleSecuritySystem extends Component<{}, VehicleSecuritySystemState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      currentPage: "landing",
      currentUser: null,
      users: [],
      vehicles: [],
      activityLogs: [
        {
          id: "1",
          vehiclePlate: "ABC-123",
          vehicleName: "Toyota Camry",
          entryTime: "2024-01-15 08:30:00",
          exitTime: "2024-01-15 17:45:00",
        },
        {
          id: "2",
          vehiclePlate: "XYZ-789",
          vehicleName: "Honda Civic",
          entryTime: "2024-01-15 09:15:00",
        },
      ],
      isMenuOpen: false,
      loginForm: { email: "", password: "" },
      registerForm: { name: "", email: "", password: "" },
      profileForm: { name: "", email: "", station: "", shift: "" },
      vehicleForm: { plateNumber: "", model: "", color: "", type: "" },

      showNotification: false,
      notificationMessage: "",
      isEntryNotification: true,
    }
  }

  // Add these methods to your class
  toggleNotification = (isEntry: boolean) => {
    this.setState({
      showNotification: true,
      isEntryNotification: isEntry,
      notificationMessage: isEntry 
        ? "Are you the one entering the gate?" 
        : "Are you the one exiting the gate?"
    });
    
    // Auto-hide after 30 seconds for demo purposes
    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 30000);
  }

  handleNotificationResponse = (response: boolean) => {
    // This will be connected to backend later
    console.log(`User responded ${response ? "Yes" : "No"} to ${this.state.isEntryNotification ? "entry" : "exit"}`);
    this.setState({ showNotification: false });
  }

  // Add this in componentDidMount to simulate notifications:
  componentDidMount() {
    // Simulate entry notification after 5 seconds
    setTimeout(() => this.toggleNotification(true), 5000);
    
    // Simulate exit notification after 20 seconds
    setTimeout(() => this.toggleNotification(false), 20000);
  }

  handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = this.state.users.find((u) => u.email === this.state.loginForm.email)
    if (user) {
      this.setState({ currentUser: user, currentPage: "dashboard" })
    }
  }

  handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: AppUser = {
      id: Date.now().toString(),
      name: this.state.registerForm.name,
      email: this.state.registerForm.email,
      role:  "User",
    }
    this.setState({
      users: [...this.state.users, newUser],
      currentUser: newUser,
      currentPage: "profile-setup",
    })
  }

  handleProfileSetup = (e: React.FormEvent) => {
    e.preventDefault()
    if (this.state.currentUser) {
      const updatedUser = {
        ...this.state.currentUser,
        name: this.state.profileForm.name || this.state.currentUser.name,
        email: this.state.profileForm.email || this.state.currentUser.email,
        ...(this.state.currentUser.role === "Security" && {
          station: this.state.profileForm.station,
          shift: this.state.profileForm.shift,
        }),
      }
      this.setState({
        currentUser: updatedUser,
        users: this.state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        currentPage: "dashboard",
      })
    }
  }

  handleVehicleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    if (this.state.currentUser) {
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        plateNumber: this.state.vehicleForm.plateNumber,
        model: this.state.vehicleForm.model,
        color: this.state.vehicleForm.color,
        type: this.state.vehicleForm.type,
        userId: this.state.currentUser.id,
      }
      this.setState({
        vehicles: [...this.state.vehicles, newVehicle],
        vehicleForm: { plateNumber: "", model: "", color: "", type: "" },
        currentPage: "registered-vehicles",
      })
    }
  }

  handleLogout = () => {
    this.setState({ currentUser: null, currentPage: "landing", isMenuOpen: false })
  }

  deleteVehicle = (vehicleId: string) => {
    this.setState({ vehicles: this.state.vehicles.filter((v) => v.id !== vehicleId) })
  }

  NavigationMenu = () => {
    const userVehicles = this.state.vehicles.filter((v) => v.userId === this.state.currentUser?.id)
    
    return (
      <nav className="space-y-2">
        {this.state.currentUser?.role === "User" && (
          <>
            <Button
              variant={this.state.currentPage === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                this.setState({ currentPage: "dashboard", isMenuOpen: false })
              }}
            >
              <Car className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={this.state.currentPage === "vehicle-registration" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                this.setState({ currentPage: "vehicle-registration", isMenuOpen: false })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Register Vehicle
            </Button>
            <Button
              variant={this.state.currentPage === "registered-vehicles" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                this.setState({ currentPage: "registered-vehicles", isMenuOpen: false })
              }}
            >
              <Car className="mr-2 h-4 w-4" />
              My Vehicles
            </Button>
            <Button
              variant={this.state.currentPage === "activity-logs" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                this.setState({ currentPage: "activity-logs", isMenuOpen: false })
              }}
            >
              <Activity className="mr-2 h-4 w-4" />
              Activity Logs
            </Button>
          </>
        )}
        {this.state.currentUser?.role === "Security" && (
          <>
            <Button
              variant={this.state.currentPage === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                this.setState({ currentPage: "dashboard", isMenuOpen: false })
              }}
            >
              <Shield className="mr-2 h-4 w-4" />
              Security Dashboard
            </Button>
            <Button
              variant={this.state.currentPage === "activity-logs" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                this.setState({ currentPage: "activity-logs", isMenuOpen: false })
              }}
            >
              <Activity className="mr-2 h-4 w-4" />
              Monitor Activity
            </Button>
          </>
        )}
        <Button
          variant={this.state.currentPage === "profile-setup" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            this.setState({ currentPage: "profile-setup", isMenuOpen: false })
          }}
        >
          <Car className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={this.handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </nav>
    )
  }

  renderLandingPage() {
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
                <Button 
                  variant="link" 
                  className="text-gray-700 hover:text-teal-600 transition-colors p-0 h-auto"
                  onClick={() => this.setState({ currentPage: "register" })}
                >
                  Register Vehicle
                </Button>
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
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => this.setState({ currentPage: "register" })}
                >
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
          {/* <Image
            src="/seamless_campus_access.png?height=800&width=1200"
            alt="ANPR Security Gate"
            fill
            className="object-cover opacity-30"
          /> */}

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
                  onClick={() => this.setState({ currentPage: "register" })}
                >
                  Register Your Vehicle
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg transition-all duration-300 bg-transparent"
                   onClick={() => this.setState({ currentPage: "login" })}
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
                  src="/abu_detect_image.png?height=500&width=600"
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
                onClick={() => this.setState({ currentPage: "register" })}
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

  renderRegisterPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Register for vehicle monitoring system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={this.handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={this.state.registerForm.name}
                  onChange={(e) => this.setState({ registerForm: { ...this.state.registerForm, name: e.target.value } })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={this.state.registerForm.email}
                  onChange={(e) => this.setState({ registerForm: { ...this.state.registerForm, email: e.target.value } })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={this.state.registerForm.password}
                  onChange={(e) =>
                    this.setState({ registerForm: { ...this.state.registerForm, password: e.target.value } })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => this.setState({ currentPage: "landing" })}
              >
                Back to Home
              </Button>
              <div className="text-center text-sm mt-4">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-800 p-0 h-auto" 
                onClick={() => this.setState({ currentPage: "login" })}
              >
                Login
              </Button>
            </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  renderLoginPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={this.handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={this.state.loginForm.email}
                  onChange={(e) => this.setState({ loginForm: { ...this.state.loginForm, email: e.target.value } })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={this.state.loginForm.password}
                  onChange={(e) => this.setState({ loginForm: { ...this.state.loginForm, password: e.target.value } })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => this.setState({ currentPage: "landing" })}
              >
                Back to Home
              </Button>
              <div className="text-center text-sm mt-4">
              Don't have an account yet?{' '}
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-800 p-0 h-auto" 
                onClick={() => this.setState({ currentPage: "register" })}
              >
                Register
              </Button>
            </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  renderProfileSetupPage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
              </div>
              <Button variant="ghost" onClick={this.handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Setup</CardTitle>
              <CardDescription>
                {this.state.currentUser?.role === "Security"
                  ? "Complete your security personnel profile"
                  : "Complete your user profile"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={this.handleProfileSetup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={this.state.profileForm.name}
                    onChange={(e) => this.setState({ profileForm: { ...this.state.profileForm, name: e.target.value } })}
                    placeholder={this.state.currentUser?.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={this.state.profileForm.email}
                    onChange={(e) =>
                      this.setState({ profileForm: { ...this.state.profileForm, email: e.target.value } })
                    }
                    placeholder={this.state.currentUser?.email}
                  />
                </div>
                {this.state.currentUser?.role === "Security" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="station">Station/Post</Label>
                      <Input
                        id="station"
                        value={this.state.profileForm.station}
                        onChange={(e) =>
                          this.setState({ profileForm: { ...this.state.profileForm, station: e.target.value } })
                        }
                        placeholder="e.g., Main Gate, Parking Lot A"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shift">Shift Time</Label>
                      <Input
                        id="shift"
                        value={this.state.profileForm.shift}
                        onChange={(e) =>
                          this.setState({ profileForm: { ...this.state.profileForm, shift: e.target.value } })
                        }
                        placeholder="e.g., 8:00 AM - 4:00 PM"
                      />
                    </div>
                  </>
                )}
                <Button type="submit" className="w-full">
                  Save Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  renderNotification() {
  if (!this.state.showNotification) return null;

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 transform translate-y-full
      animate-slide-up z-50 max-w-md mx-auto mb-8
    `}>
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {this.state.notificationMessage}
        </h3>
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => this.handleNotificationResponse(true)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
          >
            Yes
          </Button>
          <Button 
            onClick={() => this.handleNotificationResponse(false)}
            variant="outline"
            className="px-6 py-2 border-red-600 text-red-600 hover:bg-red-50"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
  }

  renderDashboard() {
    const userVehicles = this.state.vehicles.filter((v) => v.userId === this.state.currentUser?.id)

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Sheet open={this.state.isMenuOpen} onOpenChange={(open) => this.setState({ isMenuOpen: open })}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64">
                    <div className="flex items-center mb-6">
                      <Car className="h-8 w-8 text-blue-600 mr-3" />
                      <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
                    </div>
                    <this.NavigationMenu />
                  </SheetContent>
                </Sheet>
                <Car className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  {this.state.currentUser?.role === "Security" ? (
                    <Shield className="h-3 w-3 mr-1" />
                  ) : (
                    <Car className="h-3 w-3 mr-1" />
                  )}
                  {this.state.currentUser?.role}
                </Badge>
                <span className="text-sm text-gray-600 hidden sm:block">{this.state.currentUser?.name}</span>
                <Button variant="ghost" onClick={this.handleLogout} className="hidden sm:flex">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6">
                <this.NavigationMenu />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {this.state.currentPage === "dashboard" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {this.state.currentUser?.role === "Security" ? "Security Dashboard" : "Dashboard"}
                    </h2>
                    <p className="text-gray-600">Welcome back, {this.state.currentUser?.name}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {this.state.currentUser?.role === "User" && (
                      <>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Registered Vehicles</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{userVehicles.length}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {this.state.activityLogs.filter((log) => !log.exitTime).length}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                    {this.state.currentUser?.role === "Security" && (
                      <>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{this.state.vehicles.length}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Entries</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {this.state.activityLogs.filter((log) => !log.exitTime).length}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Station</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-lg font-semibold">{this.state.currentUser?.station || "Not Set"}</div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>
                </div>
              )}

              {this.state.currentPage === "vehicle-registration" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Register Vehicle</h2>
                    <p className="text-gray-600">Add a new vehicle to your account</p>
                  </div>

                  <Card className="max-w-2xl">
                    <CardHeader>
                      <CardTitle>Vehicle Information</CardTitle>
                      <CardDescription>Enter the details of your vehicle</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={this.handleVehicleRegistration} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="plateNumber">Plate Number</Label>
                          <Input
                            id="plateNumber"
                            value={this.state.vehicleForm.plateNumber}
                            onChange={(e) =>
                              this.setState({ vehicleForm: { ...this.state.vehicleForm, plateNumber: e.target.value } })
                            }
                            placeholder="e.g., ABC-123"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="model">Model</Label>
                          <Input
                            id="model"
                            value={this.state.vehicleForm.model}
                            onChange={(e) =>
                              this.setState({ vehicleForm: { ...this.state.vehicleForm, model: e.target.value } })
                            }
                            placeholder="e.g., Toyota Camry"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="color">Color</Label>
                          <Input
                            id="color"
                            value={this.state.vehicleForm.color}
                            onChange={(e) =>
                              this.setState({ vehicleForm: { ...this.state.vehicleForm, color: e.target.value } })
                            }
                            placeholder="e.g., White"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={this.state.vehicleForm.type}
                            onValueChange={(value) =>
                              this.setState({ vehicleForm: { ...this.state.vehicleForm, type: value } })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Sedan">Sedan</SelectItem>
                              <SelectItem value="SUV">SUV</SelectItem>
                              <SelectItem value="Hatchback">Hatchback</SelectItem>
                              <SelectItem value="Truck">Truck</SelectItem>
                              <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">
                          Register Vehicle
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              {this.state.currentPage === "registered-vehicles" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">My Vehicles</h2>
                      <p className="text-gray-600">Manage your registered vehicles</p>
                    </div>
                    <Button onClick={() => this.setState({ currentPage: "vehicle-registration" })}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vehicle
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Plate Number</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userVehicles.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                              <TableCell className="font-medium">{vehicle.plateNumber}</TableCell>
                              <TableCell>{vehicle.model}</TableCell>
                              <TableCell>{vehicle.color}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{vehicle.type}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => this.deleteVehicle(vehicle.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {userVehicles.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No vehicles registered yet.
                          <Button
                            variant="link"
                            onClick={() => this.setState({ currentPage: "vehicle-registration" })}
                            className="ml-1"
                          >
                            Register your first vehicle
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {this.state.currentPage === "activity-logs" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {this.state.currentUser?.role === "Security" ? "Activity Monitor" : "Activity Logs"}
                    </h2>
                    <p className="text-gray-600">
                      {this.state.currentUser?.role === "Security"
                        ? "Monitor all vehicle activities"
                        : "View your vehicle entry and exit logs"}
                    </p>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Plate Number</TableHead>
                            <TableHead>Entry Time</TableHead>
                            <TableHead>Exit Time</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {this.state.activityLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="font-medium">{log.vehicleName}</TableCell>
                              <TableCell>{log.vehiclePlate}</TableCell>
                              <TableCell>{new Date(log.entryTime).toLocaleString()}</TableCell>
                              <TableCell>{log.exitTime ? new Date(log.exitTime).toLocaleString() : "-"}</TableCell>
                              <TableCell>
                                <Badge variant={log.exitTime ? "secondary" : "default"}>
                                  {log.exitTime ? "Completed" : "Active"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}
            </main>
          </div>
        </div>
        {this.renderNotification()}
      </div>
    )
  }

  render() {
    switch (this.state.currentPage) {
      case "landing":
        return this.renderLandingPage()
      case "register":
        return this.renderRegisterPage()
      case "login":
        return this.renderLoginPage()
      case "profile-setup":
        return this.renderProfileSetupPage()
      default:
        return this.renderDashboard()
    }
  }
}