"use client"

import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { initializeExercises } from "@/lib/exercise-data"

export default function DataInitializer() {
  useEffect(() => {
    // Initialize exercises
    initializeExercises()

    // Initialize users if they don't exist
    if (!localStorage.getItem("users")) {
      const users = [
        {
          id: uuidv4(),
          name: "Admin User",
          code: "admin123",
          isAdmin: true,
          isModerator: false,
          isDemo: false,
          role: "Admin",
        },
        {
          id: uuidv4(),
          name: "Moderator User",
          code: "mod123",
          isAdmin: false,
          isModerator: true,
          isDemo: false,
          role: "Moderator",
        },
        {
          id: uuidv4(),
          name: "Test User",
          code: "user123",
          isAdmin: false,
          isModerator: false,
          isDemo: false,
          role: "Student",
        },
        {
          id: uuidv4(),
          name: "Demo User",
          code: "demo123",
          isAdmin: false,
          isModerator: false,
          isDemo: true,
          role: "Student",
        },
      ]
      localStorage.setItem("users", JSON.stringify(users))
    }

    // Initialize system settings if they don't exist
    if (!localStorage.getItem("systemSettings")) {
      const settings = {
        siteTitle: "Telc Mate",
        allowRegistration: false,
        maintenanceMode: false,
        defaultTimeLimit: {
          reading: 20,
          listening: 15,
          grammar: 15,
          writing: 30,
        },
        language: "en",
        showCorrectAnswers: true,
        allowTestRetake: true,
        demoAccessLevel: "limited",
      }
      localStorage.setItem("systemSettings", JSON.stringify(settings))
    }
  }, [])

  return null
}
