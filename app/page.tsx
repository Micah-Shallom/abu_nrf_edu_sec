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
import { ProfileEdit } from "@/components/dashboard/ProfileEdit"
import { NavigationMenu } from "@/components/dashboard/NavigationMenu"
import { LandingPage } from "@/components/landing/LandingPage"
import { DashboardMain } from "@/components/dashboard/DashboardMain"
import { VehicleRegistration } from "@/components/dashboard/VehicleRegistration"
import { ActivityLogs } from "@/components/dashboard/ActivityLogs";
import { Notification } from "@/components/ui/Notification"
import { authService, profileService } from "@/services/authService"
import { ProfileContainer } from "@/components/dashboard/ProfileContainer"
import { ProfileView } from "@/components/dashboard/ProfileView"
import { User } from "lucide-react"
import { RegisteredVehicles } from "@/components/dashboard/RegisteredVehicles"
import { vehicleService } from "@/services/vehicleService"  
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
  id: string;
  plateNumber: string;    // Frontend primary field
  plate_number?: string;  // Optional API field
  model: string;
  color: string;
  type: string;
  status: "Active" | "Inactive";
  userId: string;
  user_id?: string;      // Optional API field
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
  profileForm: { name: string; email: string; phone: string;}
  vehicleForm: { plateNumber: string; model: string; color: string; type: string }
  loading: boolean
  notification: {show: boolean; message: string; type: 'success' | 'error' | 'info';
  };
  showNotification: boolean;
  notificationMessage: string;
  isEntryNotification: boolean;
  profileLoading: boolean;
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
      profileLoading: false,
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
      profileForm: { name: "", email: "", phone: ""},
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

  isPlateNumberTaken = (plateNumber: string): boolean => {
    return this.state.vehicles.some(v => 
      v.plateNumber.toLowerCase() === plateNumber.toLowerCase() ||
      v.plate_number?.toLowerCase() === plateNumber.toLowerCase()
    );
  };
  
  // Add this in componentDidMount to simulate notifications:
  componentDidMount() {
    // Simulate entry notification after 5 seconds
    setTimeout(() => this.toggleNotification(true), 5000);
    // Simulate exit notification after 20 seconds
    setTimeout(() => this.toggleNotification(false), 20000);

    if (this.state.currentUser) {
      this.fetchVehicles();
    } 
  }

  componentDidUpdate(prevProps: {}, prevState: VehicleSecuritySystemState) {
    // Only fetch profile if user changed and we have a current user
    if (this.state.currentUser && 
        (!prevState.currentUser || 
        prevState.currentUser.id !== this.state.currentUser.id)) {
      this.fetchProfile();
    }
    if ((!prevState.currentUser && this.state.                currentUser) ||
        (prevState.currentPage !== 'registered-vehicles' && 
        this.state.currentPage === 'registered-vehicles')) {
      this.fetchVehicles();
    }
  }



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
        };

        localStorage.setItem('authToken', token);
        
        // First set the user state
        await new Promise<void>((resolve) => {
          this.setState({ 
            currentUser: appUser,
            currentPage: "dashboard"
          }, resolve); // Using callback to ensure state is updated
        });
        
        // Then fetch vehicles
        await this.fetchVehicles();
        
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
      currentPage: "profile",
    })
  }

  handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token || !this.state.currentUser) return;

    this.setState({ loading: true });

    try {
      const { profile, error } = await profileService.updateProfile(
        token,
        this.state.currentUser.id,
        {
          full_name: this.state.profileForm.name,
          phone: this.state.profileForm.phone
        }
      );

      if (error) throw new Error(error);

      if (profile) {
        this.setNotification("Profile updated successfully!", 'success');
        this.setState({
          currentUser: {
            ...this.state.currentUser,
            name: profile.full_name || this.state.currentUser.name
          },
          profileForm: {
            ...this.state.profileForm,
            name: profile.full_name || this.state.profileForm.name,
            phone: profile.phone || this.state.profileForm.phone
          }
        });
      }
    } catch (err) {
      console.error('Profile update error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
      this.setNotification(errorMessage, 'error');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleVehicleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side duplicate check
    if (this.isPlateNumberTaken(this.state.vehicleForm.plateNumber)) {
      this.setNotification('This plate number is already registered', 'error');
      return;
    }
    
    const token = localStorage.getItem('authToken');
    if (!token || !this.state.currentUser) {
      this.setNotification('Please login first', 'error');
      return;
    }

    console.log('Submitting vehicle:', this.state.vehicleForm); // Debug log


    this.setState({ loading: true });

    try {
      const { vehicle, error } = await vehicleService.registerVehicle(
        token,
        {
          plate_number: this.state.vehicleForm.plateNumber,
          model: this.state.vehicleForm.model,
          color: this.state.vehicleForm.color,
          type: this.state.vehicleForm.type.toLowerCase() as 'bus' | 'car' | 'bike'
        }
      );

      console.log('API Response:', { vehicle, error }); // Debug log

      
      if (error) {
        // Show the specific error message from the API
        this.setNotification(error, 'error');
        return;
      }


      if (vehicle) {
        this.setState({
          vehicles: [...this.state.vehicles, {
            ...vehicle,
            plateNumber: vehicle.plate_number, // Ensure frontend compatibility
            userId: this.state.currentUser?.id || '',
            status: 'Active'
          }],
          vehicleForm: { plateNumber: "", model: "", color: "", type: "" },
          currentPage: "registered-vehicles"
        });
        this.setNotification("Vehicle registered successfully!", 'success');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Vehicle registration failed';
      this.setNotification(errorMessage, 'error');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleEditVehicle = (vehicleId: string) => {
    const vehicle = this.state.vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      this.setState({
        currentPage: "vehicle-registration",
        vehicleForm: {
          plateNumber: vehicle.plateNumber,
          model: vehicle.model,
          color: vehicle.color,
          type: vehicle.type
        }
      });
    }
  };

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({ 
      currentUser: null,
      currentPage: "landing",
      profileForm: {  // Reset profile form
        name: "",
        email: "",
        phone: "",
      }
    });
  }

  deleteVehicle = (vehicleId: string) => {
    this.setState({ vehicles: this.state.vehicles.filter((v) => v.id !== vehicleId) })
  }

  async fetchProfile() {
    const token = localStorage.getItem('authToken');
    if (!token || !this.state.currentUser) return;

    this.setState({ profileLoading: true });
    
    try {
      const { profile, error } = await profileService.getProfile(
        token,
        this.state.currentUser.id
      );
      
      if (error) throw new Error(error);

      if (profile) {
        this.setState({
          profileForm: {
            name: profile.full_name || this.state.currentUser.name,
            email: profile.email || this.state.currentUser.email,
            phone: profile.phone || ''
          }
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
      this.setNotification(errorMessage, 'error');
    } finally {
      this.setState({ profileLoading: false });
    }
  }

  fetchVehicles = async () => {
    const token = localStorage.getItem('authToken');
    if (!token || !this.state.currentUser) {
      console.error('Cannot fetch vehicles - no token or user');
      return;
    }

    this.setState({ loading: true });

    try {
      const { vehicles, error } = await vehicleService.getVehicles(token);
      
      if (error) {
        this.setNotification(error, 'error');
        return;
      }

      if (vehicles) {
        this.setState({ 
          vehicles: vehicles.map(v => ({
            ...v,
            plateNumber: v.plate_number || v.plateNumber || '',
            userId: this.state.currentUser?.id || '',
            status: v.status || 'Active'
          }))
        });
      }
    } catch (err) {
      console.error('Fetch vehicles error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load vehicles';
      this.setNotification(errorMessage, 'error');
    } finally {
      this.setState({ loading: false });
    }
  };

  
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
          variant={this.state.currentPage === "profile" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            this.setState({ currentPage: "profile", isMenuOpen: false }) // Changed to "profile"
          }}
          >
          <User className="mr-2 h-4 w-4" />
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

  renderProfilePage() {
    if (!this.state.currentUser) return null;

     return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                {this.state.currentUser.role === "Security" ? (
                  <Shield className="h-8 w-8 text-blue-600 mr-3" />
                ) : (
                  <User className="h-8 w-8 text-blue-600 mr-3" />
                )}
                <h1 className="text-xl font-semibold">My Profile</h1>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => this.setState({ currentPage: "dashboard" })}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <ProfileContainer
              currentUser={this.state.currentUser}
              initialData={{
                full_name: this.state.profileForm.name,
                phone: this.state.profileForm.phone
              }}
              onSave={async (data) => {
                this.setState({ profileLoading: true });
                try {
                  const token = localStorage.getItem('authToken');
                  if (!token || !this.state.currentUser) throw new Error('Not authenticated');
                  
                  const { profile, error } = await profileService.updateProfile(
                    token,
                    this.state.currentUser.id,
                    {
                      full_name: data.full_name,
                      phone: data.phone
                    }
                  );

                  if (error) throw new Error(error);
                  
                  this.setState({
                    profileForm: {
                      ...this.state.profileForm,
                      name: profile?.full_name || data.full_name,
                      phone: profile?.phone || data.phone
                    }
                  });
                  
                  this.setNotification("Profile updated successfully!", 'success');
                } catch (err) {
                  const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
                  this.setNotification(errorMessage, 'error');
                } finally {
                  this.setState({ profileLoading: false });
                }
              }}
              loading={this.state.profileLoading}
            />
        </main>
      </div>
    );
  }

  renderRegisteredVehiclesPage() {
    if (!this.state.currentUser) return null;

    const userVehicles = this.state.vehicles.filter(
      v => v.userId === this.state.currentUser?.id
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                {this.state.currentUser.role === "Security" ? (
                  <Shield className="h-8 w-8 text-blue-600 mr-3" />
                ) : (
                  <User className="h-8 w-8 text-blue-600 mr-3" />
                )}
                <h1 className="text-xl font-semibold">My Profile</h1>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => this.setState({ currentPage: "dashboard" })}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6">
                <this.NavigationMenu />
              </div>
            </aside>

            <main className="flex-1">
                {this.state.loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Loading vehicles...</p>
                </div>
              ) : (
                <RegisteredVehicles
                  vehicles={this.state.vehicles.filter(v => v.userId === this.state.currentUser?.id)}
                  onEdit={this.handleEditVehicle}
                  onDelete={this.deleteVehicle}
                  onRegisterNew={() => this.setState({ 
                    currentPage: "vehicle-registration",
                    vehicleForm: {
                      plateNumber: "",
                      model: "",
                      color: "",
                      type: ""
                    }
                  })}
                />
              )}
            </main>
          </div>
        </div>
      </div>
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

  renderVehicleRegistrationPage() {
    return (
      <VehicleRegistration
        formData={this.state.vehicleForm}
        onPlateNumberChange={(plateNumber) => 
          this.setState({ vehicleForm: {...this.state.vehicleForm, plateNumber} })
        }
        onModelChange={(model) => 
          this.setState({ vehicleForm: {...this.state.vehicleForm, model} })
        }
        onColorChange={(color) => 
          this.setState({ vehicleForm: {...this.state.vehicleForm, color} })
        }
        onTypeChange={(type) => 
          this.setState({ vehicleForm: {...this.state.vehicleForm, type} })
        }
        onSubmit={this.handleVehicleRegistration}
        onCancel={() => this.setState({ currentPage: "dashboard" })}
      />
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
      case "profile":
        return this.renderProfilePage()
      case "vehicle-registration":
        return this.renderVehicleRegistrationPage()
      case "activity-logs":
        return this.renderActivityLogsPage();
      case "registered-vehicles":
        return this.renderRegisteredVehiclesPage();
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