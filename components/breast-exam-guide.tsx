"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Info } from "lucide-react"

export function BreastExamGuide() {
  const steps = [
    {
      title: "Devant le miroir",
      description:
        "Observez vos seins bras le long du corps, puis bras levés. Recherchez des changements de forme, de taille ou de peau.",
      tips: ["Vérifiez la symétrie", "Observez la peau (rougeurs, capitons)", "Examinez les mamelons"],
    },
    {
      title: "Palpation debout",
      description:
        "Levez un bras et palpez le sein opposé avec les doigts à plat, en effectuant des mouvements circulaires.",
      tips: ["Couvrez tout le sein", "Appuyez légèrement puis plus fermement", "N'oubliez pas l'aisselle"],
    },
    {
      title: "Palpation allongée",
      description: "Allongez-vous, placez un coussin sous l'épaule et répétez la palpation en cercles concentriques.",
      tips: ["Commencez par l'extérieur", "Progressez vers le mamelon", "Pressez doucement le mamelon"],
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/20 shrink-0">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Pourquoi l'auto-examen ?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'auto-examen mensuel des seins permet de détecter précocement toute anomalie. Le meilleur moment est
              quelques jours après les règles, quand les seins sont moins sensibles. Pour les femmes ménopausées,
              choisissez un jour fixe chaque mois.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Les 3 étapes de l'auto-examen</h3>
        {steps.map((step, index) => (
          <Card key={index} className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 shrink-0 font-bold text-accent">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                <div className="space-y-2">
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5 bg-accent/5 border-accent/20">
        <h4 className="font-semibold text-foreground mb-2">Quand consulter ?</h4>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Consultez votre médecin si vous remarquez :
        </p>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Une boule ou un épaississement dans le sein ou l'aisselle</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Un changement de taille ou de forme du sein</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Un écoulement du mamelon (surtout si sanglant)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Une modification de la peau (rougeur, capitons, rétraction)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Un changement d'aspect du mamelon</span>
          </li>
        </ul>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1">Marquer comme fait</Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Programmer un rappel
        </Button>
      </div>
    </div>
  )
}
