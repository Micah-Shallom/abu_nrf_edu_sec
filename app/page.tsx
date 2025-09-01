"use client"

import { LandingPage } from "@/components/landing/LandingPage"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <LandingPage
      onNavigateToRegister={() => router.push("/register")}
      onNavigateToLogin={() => router.push("/login")}
    />
  )
}