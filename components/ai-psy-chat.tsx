"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Send, Heart, Info, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AiPsyChatProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

export function AiPsyChat({ userProfile }: AiPsyChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Bonjour, je suis votre accompagnant·e psychologique virtuel·le. Je suis là pour vous écouter et vous soutenir dans votre parcours. Comment vous sentez-vous aujourd'hui ?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Auto-scroll uniquement si l'utilisateur est déjà en bas
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom()
    }
  }, [messages, shouldAutoScroll])

  // Détecter si l'utilisateur remonte dans l'historique
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50
    setShouldAutoScroll(isAtBottom)
  }

  useEffect(() => {
    // Load conversation history from localStorage
    const savedMessages = localStorage.getItem("aiPsyMessages")
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })))
      } catch (e) {
        console.error("Failed to load messages:", e)
      }
    }
  }, [])

  useEffect(() => {
    // Save conversation to localStorage
    if (messages.length > 1) {
      localStorage.setItem("aiPsyMessages", JSON.stringify(messages))
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setShouldAutoScroll(true) // Force scroll quand on envoie un message

    try {
      const response = await fetch("/api/ai-psy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userProfile,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Je suis désolé·e, je rencontre un problème technique. Pouvez-vous réessayer dans un moment ? Si vous avez besoin d'une aide urgente, n'hésitez pas à contacter un professionnel de santé.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearHistory = () => {
    if (confirm("Êtes-vous sûr·e de vouloir effacer l'historique de conversation ?")) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Bonjour, je suis votre accompagnant·e psychologique virtuel·le. Je suis là pour vous écouter et vous soutenir dans votre parcours. Comment vous sentez-vous aujourd'hui ?`,
          timestamp: new Date(),
        },
      ])
      localStorage.removeItem("aiPsyMessages")
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px]">
      {/* Header */}
      <Card className="p-4 mb-4 border-l-4 border-primary">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg text-foreground mb-1">Soutien Psychologique IA</h2>
            <p className="text-sm text-muted-foreground">
              Un espace d'écoute disponible 24/7. Vos conversations sont confidentielles et stockées localement.
            </p>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Important :</strong> Je suis une IA et ne remplace pas un·e professionnel·le de santé mentale. En cas
          de détresse, contactez un psychologue ou appelez le 3114 (numéro national de prévention du suicide).
        </AlertDescription>
      </Alert>

      {/* Messages */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 p-4 overflow-y-auto"
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground border border-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground border border-border rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Partagez ce que vous ressentez..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="icon">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">Appuyez sur Entrée pour envoyer</p>
            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-xs">
              Effacer l'historique
            </Button>
          </div>
        </div>
      </Card>

      {/* Crisis Resources */}
      <Alert className="mt-4 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-xs text-orange-900 dark:text-orange-200">
          <strong>Besoin d'aide immédiate ?</strong> SOS Suicide : 3114 (gratuit, 24/7) • SOS Amitié : 09 72 39 40 50
        </AlertDescription>
      </Alert>
    </div>
  )
}
