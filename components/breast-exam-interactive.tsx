"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle2, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface BreastExamInteractiveProps {
  onComplete: () => void
  onClose: () => void
}

const steps = [
  {
    id: 1,
    title: "Préparation",
    description: "Meilleur moment: 3-5 jours après le début de vos règles, quand les seins sont moins sensibles.",
    instructions: [
      "Trouvez un endroit calme et privé",
      "Retirez votre soutien-gorge",
      "Prévoyez 10-15 minutes",
    ],
    icon: "📅",
    visual: "preparation",
  },
  {
    id: 2,
    title: "Inspection visuelle - Debout",
    description: "Observez vos seins dans un miroir, bras le long du corps puis levés.",
    instructions: [
      "Regardez la forme et la taille de chaque sein",
      "Vérifiez qu'il n'y a pas de changements visibles",
      "Observez la peau (fossettes, rougeurs, gonflements)",
      "Examinez les mamelons (rétractation, écoulement)",
    ],
    icon: "👀",
    visual: "visual-standing",
    warning: "Cherchez: asymétrie inhabituelle, fossettes, peau d'orange, rougeurs",
  },
  {
    id: 3,
    title: "Inspection visuelle - Mains levées",
    description: "Levez les bras au-dessus de votre tête et observez.",
    instructions: [
      "Levez les deux bras en l'air",
      "Regardez si un sein bouge différemment",
      "Vérifiez les zones sous les bras",
      "Observez le contour de chaque sein",
    ],
    icon: "🙌",
    visual: "visual-raised",
  },
  {
    id: 4,
    title: "Palpation - Debout",
    description: "Examinez chaque sein avec le bout des doigts, en faisant des mouvements circulaires.",
    instructions: [
      "Levez le bras droit, examinez le sein droit avec la main gauche",
      "Utilisez le bout de 3 doigts (index, majeur, annulaire)",
      "Faites des petits cercles, pression légère puis moyenne puis ferme",
      "Couvrez tout le sein, du sternum à l'aisselle",
      "N'oubliez pas la zone de l'aisselle",
    ],
    icon: "👆",
    visual: "palpation-standing",
    tip: "Imaginez que votre sein est une horloge. Commencez à 12h et descendez en spirale.",
  },
  {
    id: 5,
    title: "Palpation - Allongée",
    description: "Allongez-vous et répétez l'examen. Cette position permet de mieux sentir les tissus.",
    instructions: [
      "Allongez-vous sur le dos",
      "Placez un coussin sous votre épaule droite",
      "Levez le bras droit derrière votre tête",
      "Avec la main gauche, palpez le sein droit",
      "Utilisez 3 niveaux de pression: légère, moyenne, profonde",
      "Répétez de l'autre côté",
    ],
    icon: "🛏️",
    visual: "palpation-lying",
    tip: "En position allongée, le tissu mammaire s'étale, facilitant la détection.",
  },
  {
    id: 6,
    title: "Examen des mamelons",
    description: "Pressez délicatement chaque mamelon pour vérifier qu'il n'y a pas d'écoulement.",
    instructions: [
      "Pressez doucement le mamelon entre le pouce et l'index",
      "Vérifiez s'il y a un écoulement (clair, laiteux, ou sanglant)",
      "Notez toute douleur inhabituelle",
      "Faites la même chose pour l'autre mamelon",
    ],
    icon: "🔍",
    visual: "nipple-exam",
    warning: "Consultez si vous voyez: écoulement sanglant, rétractation du mamelon, douleur persistante",
  },
  {
    id: 7,
    title: "Que chercher?",
    description: "Signes qui nécessitent une consultation médicale.",
    instructions: [
      "Grosseur ou masse (dure ou molle)",
      "Épaississement d'une zone",
      "Fossettes ou plis dans la peau",
      "Rougeur ou chaleur inhabituelle",
      "Changement de taille ou forme",
      "Écoulement du mamelon (sauf lait maternel)",
      "Douleur persistante dans une zone",
    ],
    icon: "⚠️",
    visual: "warning-signs",
    isAlert: true,
  },
  {
    id: 8,
    title: "Félicitations ! 🎉",
    description: "Vous avez terminé votre auto-examen. Vous êtes proactive pour votre santé !",
    instructions: [
      "Répétez cet examen chaque mois",
      "Notez la date dans votre calendrier",
      "Si vous détectez quelque chose, consultez rapidement",
      "La plupart des grosseurs sont bénignes, mais seul un médecin peut le confirmer",
    ],
    icon: "✅",
    visual: "completion",
    isCompletion: true,
  },
]

export function BreastExamInteractive({ onComplete, onClose }: BreastExamInteractiveProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{step.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Étape {currentStep + 1}/{steps.length}
                </h2>
                <p className="text-sm text-muted-foreground">{step.title}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div
            className={`p-4 rounded-lg ${
              step.isAlert
                ? "bg-orange-50 dark:bg-orange-950/20 border border-orange-200"
                : step.isCompletion
                  ? "bg-primary/5 border border-primary/20"
                  : "bg-muted/50"
            }`}
          >
            <p className="text-foreground font-medium">{step.description}</p>
          </div>

          {/* Visual placeholder - En production, vous mettrez des images/illustrations ici */}
          <div className="aspect-video bg-linear-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-6xl">{step.icon}</div>
              <p className="text-sm text-muted-foreground">
                Illustration: {step.visual}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-foreground">Instructions:</h3>
            <ul className="space-y-2">
              {step.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tip or Warning */}
          {step.tip && (
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>💡 Astuce:</strong> {step.tip}
              </p>
            </div>
          )}

          {step.warning && (
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
              <p className="text-sm text-orange-900 dark:text-orange-200">
                <strong>⚠️ Attention:</strong> {step.warning}
              </p>
            </div>
          )}
        </div>

        {/* Footer - Navigation */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>

            <div className="text-sm text-muted-foreground">
              {currentStep + 1} sur {steps.length}
            </div>

            <Button onClick={handleNext} className="gap-2">
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Terminer
                </>
              ) : (
                <>
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
