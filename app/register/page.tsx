"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { authService } from '@/services/authService';
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming authService.register exists and is implemented
      const { user, error } = await authService.register(registerForm);

      if (error) {
        toast({
          title: "Registration Failed",
          description: error,
          variant: "destructive",
        })
        return;
      }

      if (user) {
        toast({
          title: "Registration Successful",
          description: "Please log in to continue.",
        })
        router.push('/login');
      }
    } catch (err) {
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSuccess={() => {
        toast({
          title: "Registration Successful",
          description: "Please log in to continue.",
        });
        router.push('/login');
      }}
      onNavigateToLogin={() => router.push('/login')}
      onNavigateToHome={() => router.push('/')}
    />
  );
}
