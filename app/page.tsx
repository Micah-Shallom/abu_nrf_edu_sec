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
import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { ProfileSetup } from "@/components/dashboard/ProfileSetup"
import { NavigationMenu } from "@/components/dashboard/NavigationMenu"
import { LandingPage } from "@/components/landing/LandingPage"
import { DashboardMain } from "@/components/dashboard/DashboardMain"
import { VehicleRegistration } from "@/components/dashboard/VehicleRegistration"
import { ActivityLogs } from "@/components/dashboard/ActivityLogs";
import { Notification } from "@/components/ui/Notification"
import { authService } from "@/services/authService"
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
  phone?: string;
  profileImage?: string;
  station?: string
  shift?: string
}

type BackendUser = {
  ID?: string;  // Backend uses uppercase
  id?: string;  // Some APIs use lowercase
  Name?: string;
  name?: string;
  Email?: string;
  email?: string;
  Role?: string;
  role?: string;
  createdAt?: string;
  token?: string;
  // Add other backend fields if needed
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
  profileForm: { name: string; email: string; phone: string; station: string; shift: string;profileImage?: string; profileImageFile?: File;}
  vehicleForm: { plateNumber: string; model: string; color: string; type: string }
  loading: boolean
  notification: {show: boolean; message: string; type: 'success' | 'error' | 'info';
  };
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
      loading: false,
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
      profileForm: { name: "", email: "", phone: "", station: "", shift: "", profileImage: "",profileImageFile: undefined },
      vehicleForm: { plateNumber: "", model: "", color: "", type: "" },

      notification: {show: false, message: '', type: 'info'},

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

  setNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  this.setState({
    notification: {
      show: true,
      message,
      type
    }
  });
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    this.setState({
      notification: {
        ...this.state.notification,
        show: false
      }
    });
  }, 5000);
  };

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

  handleProfileImageChange = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    this.setState({
      profileForm: {
        ...this.state.profileForm,
        profileImage: reader.result as string,
        profileImageFile: file
      }
    });
  };
  reader.readAsDataURL(file);
  };

  handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  this.setState({ loading: true });
  
  try {
    const { user, token, error } = await authService.login({
      email: this.state.loginForm.email,
      password: this.state.loginForm.password
    });

    if (error) {
      this.setNotification(error, 'error');
      return;
    }

    if (user && token) {
      const appUser: AppUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Add other fields if available
      };

      localStorage.setItem('authToken', token);
      this.setState({ 
        currentUser: appUser,
        currentPage: "dashboard"
      });
      
      this.setNotification("Login successful!", 'success');
    }
  } catch (err) {
    this.setNotification("An unexpected error occurred", 'error');
  } finally {
    this.setState({ loading: false });
  }
  };

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
    e.preventDefault();
    if (this.state.currentUser) {
      const updatedUser = {
        ...this.state.currentUser,
        name: this.state.profileForm.name || this.state.currentUser.name,
        email: this.state.profileForm.email || this.state.currentUser.email,
        phone: this.state.profileForm.phone,
        ...(this.state.currentUser.role === "Security" && {
          station: this.state.profileForm.station,
          shift: this.state.profileForm.shift,
        }),
        // In a real app, you would upload the image file to your server here
        // and store the URL in the user object
        profileImage: this.state.profileForm.profileImage
      };
      this.setState({
        currentUser: updatedUser,
        users: this.state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        currentPage: "dashboard",
      });
    }
  };

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
      localStorage.removeItem('authToken');
      this.setState({ 
        currentUser: null,
        currentPage: "landing"
      });
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
      <LandingPage
      onNavigateToRegister={() => this.setState({ currentPage: "register" })}
      onNavigateToLogin={() => this.setState({ currentPage: "login" })}
    />
    )
  }

  renderRegisterPage() {
  return (
    <RegisterForm
      onSuccess={() => {
        this.setNotification("Registration successful! Please login.", "success");
        this.setState({ currentPage: "login" });
      }}
      onNavigateToLogin={() => this.setState({ currentPage: "login" })}
      onNavigateToHome={() => this.setState({ currentPage: "landing" })}
    />
  );
  }

  renderLoginPage() {
    return (
      <LoginForm
        email={this.state.loginForm.email}
        password={this.state.loginForm.password}
        loading={this.state.loading} // Add this
        onEmailChange={(email) => this.setState({ 
          loginForm: { ...this.state.loginForm, email } 
        })}
        onPasswordChange={(password) => this.setState({ 
          loginForm: { ...this.state.loginForm, password } 
        })}
        onSubmit={this.handleLogin}
        onNavigateToRegister={() => this.setState({ currentPage: "register" })}
        onNavigateToHome={() => this.setState({ currentPage: "landing" })}
      />
    )
  }

  renderProfileSetupPage() {
  if (!this.state.currentUser) return null;

    return (
      <ProfileSetup
        currentUser={this.state.currentUser}
        formData={this.state.profileForm}
        onNameChange={(name) => this.setState({
          profileForm: { ...this.state.profileForm, name }
        })}
        onEmailChange={(email) => this.setState({
          profileForm: { ...this.state.profileForm, email }
        })}
        onPhoneChange={(phone) => this.setState({
          profileForm: { ...this.state.profileForm, phone }
        })}
        onStationChange={(station) => this.setState({
          profileForm: { ...this.state.profileForm, station }
        })}
        onShiftChange={(shift) => this.setState({
          profileForm: { ...this.state.profileForm, shift }
        })}
        onProfileImageChange={this.handleProfileImageChange}
        onSubmit={this.handleProfileSetup}
        onLogout={this.handleLogout}
      />
    )
  }

  renderVehicleRegistrationPage() {
  return (
    <VehicleRegistration
      formData={this.state.vehicleForm}
      onPlateNumberChange={(plateNumber) => 
        this.setState({ vehicleForm: { ...this.state.vehicleForm, plateNumber } })
      }
      onModelChange={(model) => 
        this.setState({ vehicleForm: { ...this.state.vehicleForm, model } })
      }
      onColorChange={(color) => 
        this.setState({ vehicleForm: { ...this.state.vehicleForm, color } })
      }
      onTypeChange={(type) => 
        this.setState({ vehicleForm: { ...this.state.vehicleForm, type } })
      }
      onSubmit={this.handleVehicleRegistration}
      onCancel={() => this.setState({ currentPage: "dashboard" })}
    />
  );
  }

 renderActivityLogsPage(){
  if (!this.state.currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Expired</h2>
          <Button onClick={this.handleLogout}>Return to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with menu */}
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
                  <NavigationMenu
                    currentPage={this.state.currentPage}
                    currentUser={this.state.currentUser}
                    onPageChange={(page) => this.setState({ currentPage: page, isMenuOpen: false })}
                    onLogout={this.handleLogout}
                  />
                </SheetContent>
              </Sheet>
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {this.state.currentUser.role === "Security" ? (
                  <Shield className="h-3 w-3 mr-1" />
                ) : (
                  <Car className="h-3 w-3 mr-1" />
                )}
                {this.state.currentUser.role}
              </Badge>
              <span className="text-sm text-gray-600 hidden sm:block">
                {this.state.currentUser.name}
              </span>
              <Button variant="ghost" onClick={this.handleLogout} className="hidden sm:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <NavigationMenu
                currentPage={this.state.currentPage}
                currentUser={this.state.currentUser}
                onPageChange={(page) => this.setState({ currentPage: page })}
                onLogout={this.handleLogout}
              />
            </div>
          </aside>

          {/* Activity logs content */}
          <main className="flex-1">
            <ActivityLogs
              logs={this.state.activityLogs}
              userRole={this.state.currentUser.role}
              onNavigateToVehicle={(plate) => {
                // Optional: Implement vehicle details view
                this.setState({ 
                  currentPage: "registered-vehicles",
                  // You could add filtering logic here if needed
                });
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
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
                    {this.state.currentUser && (
                      <NavigationMenu
                        currentPage={this.state.currentPage}
                        currentUser={this.state.currentUser}
                        onPageChange={(page) => this.setState({ currentPage: page, isMenuOpen: false })}
                        onLogout={this.handleLogout}
                      />
                    )}
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
              <DashboardMain
                userRole={this.state.currentUser?.role || "User"}
                userVehiclesCount={this.state.vehicles.filter(v => v.userId === this.state.currentUser?.id).length}
                activeSessionsCount={this.state.activityLogs.filter(log => !log.exitTime).length}
                totalVehiclesCount={this.state.vehicles.length}
                userStation={this.state.currentUser?.station} // Safe optional chaining
                onNavigate={(page) => this.setState({ currentPage: page })}
              />
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
      case "vehicle-registration":
        return this.renderVehicleRegistrationPage()
      case "activity-logs":
        return this.renderActivityLogsPage();
      {this.state.notification.show && (
        <Notification
          message={this.state.notification.message}
          type={this.state.notification.type}
          onClose={() => this.setState({
            notification: {
              ...this.state.notification,
              show: false
            }
          })}
          show={this.state.notification.show}
        />
      )}
      default:
        return this.renderDashboard()
    }
  }
}