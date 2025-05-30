"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import LoadingSpinner from "@/components/loading-spinner"

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true"

    if (!adminStatus) {
      router.push("/dashboard")
    } else {
      setIsAdmin(true)
    }

    // Short timeout to ensure smooth transition
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAdmin) {
    return null // This will be replaced by the redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fadeIn">{children}</div>
      </main>
    </div>
  )
}
