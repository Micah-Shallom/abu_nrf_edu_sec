// /services/authService.ts
import { User, RegisterData, LoginData } from '@/types/auth';

const API_BASE_URL = 'https://surveilx-backend.onrender.com/api/v1';

interface BackendUser {
  ID?: string;
  id?: string;
  Name?: string;
  name?: string;
  Email?: string;
  email?: string;
  Role?: string;
  role?: string;
  token?: string;
  createdAt?: string;
}

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "User" | "Security";
  token?: string;
}


// Type conversion utility
const convertToAppUser = (backendUser: any): AppUser => {
  return {
    id: backendUser.ID || backendUser.id || '',
    name: backendUser.Name || backendUser.name || '',
    email: backendUser.Email || backendUser.email || '',
    role: (backendUser.Role || backendUser.role || 'User') as "User" | "Security",
    // Map other fields as needed
  };
};

export const authService = {
  async register(data: RegisterData): Promise<{ user?: User; error?: string }> {
    // 1. Prepare payload with backend's exact expected format
    const payload = {
      Name: data.name.trim(),  // Try lowercase if 'Name' fails
      Email: data.email.trim().toLowerCase(),
      Password: data.password,
      Role: 'user',  // Try 'resident' or empty if needed
      ConfirmPassword: data.password  // Some APIs require this
    };

    // 2. Enhanced request configuration
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'X-API-Key': 'your-public-key-if-required' // Check backend docs
        },
        credentials: 'omit', // Start without credentials
        body: JSON.stringify(payload)
      });

      // 3. Detailed error handling
      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorData = await response.json();
          errorDetails = errorData.message || JSON.stringify(errorData);
        } catch (e) {
          errorDetails = response.statusText;
        }
        
        console.error('Registration failed:', {
          status: response.status,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries()),
          error: errorDetails
        });

        return { 
          error: `Registration failed (${response.status}): ${errorDetails}` 
        };
      }

      // 4. Flexible response parsing
      const responseData = await response.json();
      return {
        user: {
          ID: responseData.data?.id || responseData.id,
          name: responseData.data?.name || responseData.name,
          email: responseData.data?.email || responseData.email,
          role: responseData.data?.role || responseData.role || 'user',
          token: responseData.data?.token || responseData.token,
          createdAt: responseData.data?.createdAt || responseData.created_at
        }
      };
    } catch (error) {
      console.error('Network error:', error);
      return { 
        error: error instanceof Error ? error.message : 'Network failure' 
      };
    }
  },
   async login(credentials: LoginData): Promise<{ user?: AppUser; token?: string; error?: string }> {
    const payload = {
      Email: credentials.email.trim(),
      Password: credentials.password
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        return { 
          error: responseData.message || 'Login failed' 
        };
      }

      // Return the converted user and token
      return {
        token: responseData.token || responseData.data?.token,
        user: convertToAppUser(responseData.user || responseData.data)
      };
    } catch (error) {
      return { error: 'Network error' };
    }
  }
};