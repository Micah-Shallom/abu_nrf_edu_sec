"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { authService } from '@/services/authService';
import { useToast } from "@/components/ui/use-toast"
import { useSession } from '@/contexts/SessionContext';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useSession();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, token, error } = await authService.login(loginForm);

      if (error) {
        toast({
          title: "Login Failed",
          description: error,
          variant: "destructive",
        })
        return;
      }

      if (user && token) {
        login(token);
        router.push('/dashboard');
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
    <LoginForm
      email={loginForm.email}
      password={loginForm.password}
      loading={loading}
      onEmailChange={(email) => setLoginForm({ ...loginForm, email })}
      onPasswordChange={(password) => setLoginForm({ ...loginForm, password })}
      onSubmit={handleLogin}
      onNavigateToRegister={() => router.push('/register')}
      onNavigateToHome={() => router.push('/')}
    />
  );
}
