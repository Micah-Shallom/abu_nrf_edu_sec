"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Car,
  Plus,
  Activity,
  User,
  LogOut,
  Shield,
} from 'lucide-react';
import { useSession } from '@/contexts/SessionContext';

export function NavigationMenu() {
  const pathname = usePathname();
  const { user, logout } = useSession();

  const commonRoutes = [
    { href: '/dashboard', label: 'Dashboard', icon: Car },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const userRoutes = [
    { href: '/vehicles/register', label: 'Register Vehicle', icon: Plus },
    { href: '/vehicles', label: 'My Vehicles', icon: Car },
    { href: '/activities', label: 'Activity Logs', icon: Activity },
  ];

  const securityRoutes = [
    { href: '/activities', label: 'Monitor Activity', icon: Activity },
  ];

  const routes = user?.role === 'Security'
    ? [...commonRoutes, ...securityRoutes]
    : [...commonRoutes, ...userRoutes];

  return (
    <nav className="space-y-2">
      {routes.map((route) => (
        <Link key={route.href} href={route.href} passHref>
          <Button
            variant={pathname === route.href ? 'default' : 'ghost'}
            className="w-full justify-start"
          >
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Button>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
}
