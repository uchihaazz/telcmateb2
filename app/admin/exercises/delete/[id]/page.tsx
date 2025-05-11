"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import DataInitializer from "@/components/data-initializer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getExerciseById, deleteExercise } from "@/lib/exercise-data"
import LoadingSpinner from "@/components/loading-spinner"

export default function DeleteExercise({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    if (!adminStatus) {
      router.push("/dashboard")
      return
    }

    setIsAdmin(adminStatus)

    // Load exercise by ID
    const currentExercise = getExerciseById(params.id)
    if (!currentExercise) {
      toast({
        title: "Exercise not found",
        description: "The requested exercise could not be found.",
        variant: "destructive",
      })
      router.push("/admin")
      return
    }

    setExercise(currentExercise)
    setLoading(false)
  }, [params.id, router, toast])

  const handleDelete = () => {
    if (!exercise) return

    const success = deleteExercise(exercise.id)

    if (success) {
      toast({
        title: "Exercise Deleted",
        description: "The exercise has been deleted successfully.",
      })

      // Redirect to admin dashboard
      router.push("/admin")
    } else {
      toast({
        title: "Delete Failed",
        description: "Failed to delete the exercise. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAdmin) {
    return null // This should not happen due to the redirect, but just in case
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Exercise not found</h1>
            <p className="mb-6">The requested exercise could not be found.</p>
            <Link href="/admin">
              <Button>Back to Admin Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DataInitializer />
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Delete Exercise</h1>
          <Link href="/admin">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <Card className="mb-6 border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Deletion
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              Are you sure you want to delete the following exercise? This action cannot be undone.
            </p>

            <div className="space-y-4 p-4 border rounded-md bg-gray-50">
              <div>
                <h3 className="font-medium">Title</h3>
                <p>{exercise.title}</p>
              </div>
              <div>
                <h3 className="font-medium">Type</h3>
                <p className="capitalize">
                  {exercise.type} -{" "}
                  {exercise.part === "part1" ? "Teil 1" : exercise.part === "part2" ? "Teil 2" : "Teil 3"}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p>{exercise.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 pt-2">
            <Link href="/admin">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Exercise
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
