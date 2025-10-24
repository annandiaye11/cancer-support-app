"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, AlertCircle } from "lucide-react"

export function PapSmearInfo() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/20 shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Le frottis cervical : un dépistage essentiel</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Le frottis cervical (ou test Pap) permet de dépister le cancer du col de l'utérus à un stade précoce.
              C'est un examen simple et rapide réalisé par un médecin ou une sage-femme.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground">Fréquence recommandée</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>
                <strong className="text-foreground">25-29 ans :</strong> Tous les 3 ans (test cytologique)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>
                <strong className="text-foreground">30-65 ans :</strong> Tous les 5 ans (test HPV) ou tous les 3 ans
                (cytologie)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>
                <strong className="text-foreground">Après 65 ans :</strong> Selon avis médical
              </span>
            </li>
          </ul>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Comment se préparer ?</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Évitez les rapports sexuels 48h avant</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Ne pas utiliser de produits vaginaux</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Idéalement hors période de règles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>L'examen dure quelques minutes</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <h4 className="font-semibold text-foreground mb-3">Déroulement de l'examen</h4>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="leading-relaxed">
            Le professionnel de santé prélève délicatement des cellules du col de l'utérus à l'aide d'une petite brosse.
            L'examen peut être légèrement inconfortable mais n'est généralement pas douloureux.
          </p>
          <p className="leading-relaxed">
            Les cellules prélevées sont ensuite analysées en laboratoire. Les résultats sont disponibles sous 2 à 3
            semaines. Votre médecin vous contactera pour vous communiquer les résultats et, si nécessaire, planifier un
            suivi.
          </p>
        </div>
      </Card>

      <Card className="p-5 bg-accent/5 border-accent/20">
        <h4 className="font-semibold text-foreground mb-2">Bon à savoir</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Le dépistage du cancer du col de l'utérus est pris en charge à 100% par l'Assurance Maladie pour les femmes de
          25 à 65 ans, sans avance de frais. N'hésitez pas à en parler avec votre médecin traitant, gynécologue ou
          sage-femme.
        </p>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1">Prendre rendez-vous</Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          En savoir plus
        </Button>
      </div>
    </div>
  )
}
