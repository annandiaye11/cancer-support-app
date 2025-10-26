"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Sauvegarder les données utilisateur complètes
        localStorage.setItem("userProfile", JSON.stringify(data.user))
        localStorage.setItem("isOnboarded", "true")
        localStorage.setItem("authToken", data.token)
        
        // Appliquer le thème selon le genre
        document.body.className = data.user.gender === "female" ? "theme-female" : "theme-male"
        
        // Rediriger vers le dashboard
        router.push("/")
      } else {
        setError(data.error || "Erreur de connexion")
      }
    } catch (error) {
      setError("Erreur de connexion. Vérifiez votre connexion internet.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#212E53] via-slate-100 to-sky-50 dark:from-[#212E53] dark:via-slate-900 dark:to-sky-950/20 p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre de l'app */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img src="/kaera-logo.png" alt="Kaëra" className="h-20 w-auto" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">Kaëra</h1>
          <p className="text-muted-foreground">Ensemble face au cancer</p>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Link>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Bon retour !</CardTitle>
              <CardDescription>
                Connectez-vous à votre compte
              </CardDescription>
            </div>
          </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/" className="text-primary hover:underline font-medium">
              Créer un compte
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
