"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, User, Calendar } from "lucide-react"

interface WelcomeHeaderProps {
  userProfile: {
    name: string
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
    email: string
  }
}

export function WelcomeHeader({ userProfile }: WelcomeHeaderProps) {
  const getWelcomeMessage = () => {
    const timeOfDay = new Date().getHours()
    let greeting = "Bonjour"
    
    if (timeOfDay >= 18) greeting = "Bonsoir"
    else if (timeOfDay >= 12) greeting = "Bon après-midi"
    
    const firstName = userProfile.name.split(' ')[0]
    
    if (userProfile.mode === "preventive") {
      return `${greeting} ${firstName} ! Prenons soin de votre santé ensemble 🌸`
    } else {
      return `${greeting} ${firstName} ! Nous sommes là pour vous accompagner ❤️`
    }
  }

  const getModeDescription = () => {
    if (userProfile.mode === "preventive") {
      return "Mode Prévention - Votre santé, notre priorité"
    } else {
      return "Mode Accompagnement - Ensemble face au défi"
    }
  }

  return (
    <Card className="mb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              {getWelcomeMessage()}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              {userProfile.mode === "preventive" ? (
                <Shield className="h-4 w-4 text-green-600" />
              ) : (
                <Heart className="h-4 w-4 text-red-600" />
              )}
              {getModeDescription()}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {userProfile.age} ans
              </span>
            </div>
            <Badge variant={userProfile.mode === "preventive" ? "default" : "secondary"}>
              {userProfile.mode === "preventive" ? "Prévention" : "Curatif"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
