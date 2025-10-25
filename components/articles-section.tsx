"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Clock, TrendingUp } from "lucide-react"
import { ArticleView } from "@/components/article-view"

interface ArticlesSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
  }
}

export function ArticlesSection({ userProfile }: ArticlesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState<any>(null)

  const categories = [
    { id: "all", label: "Tous" },
    { id: "prevention", label: "Prévention" },
    { id: "nutrition", label: "Nutrition" },
    { id: "treatment", label: "Traitements" },
    { id: "wellness", label: "Bien-être" },
  ]

  const articles = [
    {
      id: 1,
      title: "Les aliments anti-cancer à privilégier",
      category: "nutrition",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
      excerpt: "Découvrez les aliments riches en antioxydants qui peuvent aider à réduire les risques de cancer.",
      trending: true,
      author: {
        name: "Dr. Sophie Martin",
        role: "Nutritionniste oncologique",
        avatar: "/avatar-doctor-woman.jpg"
      },
      publishedDate: "15 octobre 2025",
      tags: ["nutrition", "prévention", "alimentation", "antioxydants"],
      content: `
        <h2>Introduction</h2>
        <p>L'alimentation joue un rôle crucial dans la prévention du cancer. De nombreuses études scientifiques ont démontré que certains aliments peuvent réduire significativement les risques de développer différents types de cancers.</p>
        
        <h2>Les fruits et légumes colorés</h2>
        <p>Les fruits et légumes riches en couleurs contiennent des antioxydants puissants qui protègent nos cellules des dommages. Les tomates, riches en lycopène, sont particulièrement bénéfiques pour prévenir le cancer de la prostate.</p>
        
        <h2>Les crucifères</h2>
        <p>Le brocoli, le chou-fleur, le chou de Bruxelles et le chou kale contiennent des composés soufrés qui aident à éliminer les substances cancérigènes de l'organisme.</p>
        
        <h2>Les baies</h2>
        <p>Les myrtilles, framboises et mûres sont riches en anthocyanes, des antioxydants qui ont démontré des propriétés anti-cancer dans plusieurs études.</p>
        
        <h2>Le thé vert</h2>
        <p>Riche en catéchines, le thé vert est l'une des boissons les plus protectrices contre le cancer, particulièrement efficace contre les cancers du sein et de la prostate.</p>
        
        <h2>Conseils pratiques</h2>
        <ul>
          <li>Consommez au moins 5 portions de fruits et légumes par jour</li>
          <li>Privilégiez les aliments bio lorsque c'est possible</li>
          <li>Variez les couleurs dans votre assiette</li>
          <li>Limitez les aliments transformés et la viande rouge</li>
          <li>Cuisinez à la vapeur ou au four plutôt qu'à la friture</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Une alimentation équilibrée et riche en aliments protecteurs est un pilier fondamental de la prévention du cancer. Associée à une activité physique régulière et à un mode de vie sain, elle peut réduire significativement les risques.</p>
      `
    },
    {
      id: 2,
      title: "Comprendre les différents types de dépistage",
      category: "prevention",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800",
      excerpt: "Un guide complet sur les examens de dépistage recommandés selon votre âge et votre profil.",
      trending: false,
      author: {
        name: "Dr. Pierre Dubois",
        role: "Oncologue",
        avatar: "/avatar-doctor-man.jpg"
      },
      publishedDate: "10 octobre 2025",
      tags: ["dépistage", "prévention", "santé", "examens"],
      content: `
        <h2>L'importance du dépistage précoce</h2>
        <p>Le dépistage précoce est crucial car il permet de détecter le cancer à un stade où il est le plus facile à traiter. Plus le cancer est détecté tôt, meilleures sont les chances de guérison.</p>
        
        <h2>Dépistage du cancer du sein</h2>
        <p><strong>Auto-examen mensuel :</strong> À partir de 20 ans, toutes les femmes devraient pratiquer l'auto-examen des seins une fois par mois.</p>
        <p><strong>Mammographie :</strong> À partir de 50 ans, une mammographie tous les 2 ans est recommandée. Pour les femmes à risque élevé, le dépistage peut commencer plus tôt.</p>
        
        <h2>Dépistage du cancer du col de l'utérus</h2>
        <p><strong>Frottis cervical :</strong> À partir de 25 ans, tous les 3 ans jusqu'à 65 ans. Ce test simple peut détecter des cellules précancéreuses.</p>
        
        <h2>Dépistage du cancer colorectal</h2>
        <p><strong>Test immunologique :</strong> À partir de 50 ans, un test de recherche de sang dans les selles tous les 2 ans.</p>
        <p><strong>Coloscopie :</strong> Recommandée en cas de résultat positif au test ou pour les personnes à risque élevé.</p>
        
        <h2>Dépistage du cancer de la prostate</h2>
        <p><strong>Test PSA :</strong> À partir de 50 ans (45 ans si facteurs de risque), discutez avec votre médecin de l'opportunité d'un dosage du PSA.</p>
        
        <h2>Surveillance de la peau</h2>
        <p>Surveillez régulièrement vos grains de beauté selon la règle ABCDE : Asymétrie, Bords irréguliers, Couleur non homogène, Diamètre > 6mm, Évolution.</p>
        
        <h2>Conclusion</h2>
        <p>Le dépistage régulier est un acte de prévention essentiel. Parlez-en avec votre médecin pour établir un calendrier de dépistage adapté à votre profil.</p>
      `
    },
    {
      id: 3,
      title: "Gérer la fatigue pendant le traitement",
      category: "treatment",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
      excerpt: "Des conseils pratiques pour mieux gérer la fatigue liée aux traitements oncologiques.",
      trending: true,
      author: {
        name: "Marie Lefebvre",
        role: "Infirmière en oncologie",
        avatar: "/avatar-nurse.jpg"
      },
      publishedDate: "20 octobre 2025",
      tags: ["traitement", "fatigue", "qualité de vie", "conseils"],
      content: `
        <h2>Comprendre la fatigue liée au cancer</h2>
        <p>La fatigue est l'un des effets secondaires les plus fréquents du cancer et de ses traitements. Elle est différente de la fatigue ordinaire : elle ne s'améliore pas avec le repos et peut avoir un impact significatif sur la qualité de vie.</p>
        
        <h2>Causes de la fatigue</h2>
        <ul>
          <li>Les traitements (chimiothérapie, radiothérapie)</li>
          <li>L'anémie</li>
          <li>Les troubles du sommeil</li>
          <li>Le stress et l'anxiété</li>
          <li>Les douleurs</li>
          <li>Les déséquilibres nutritionnels</li>
        </ul>
        
        <h2>Stratégies pour gérer la fatigue</h2>
        
        <h3>1. Économisez votre énergie</h3>
        <p>Planifiez vos activités importantes aux moments où vous vous sentez le plus en forme, généralement le matin.</p>
        
        <h3>2. Restez actif modérément</h3>
        <p>Paradoxalement, une activité physique légère et régulière peut réduire la fatigue. Marchez 15-20 minutes par jour si possible.</p>
        
        <h3>3. Améliorez votre sommeil</h3>
        <ul>
          <li>Maintenez des horaires réguliers</li>
          <li>Créez un environnement propice au sommeil</li>
          <li>Évitez les écrans avant de dormir</li>
          <li>Limitez les siestes à 30 minutes maximum</li>
        </ul>
        
        <h3>4. Nutrition adaptée</h3>
        <p>Mangez des petits repas fréquents riches en protéines et en calories de qualité. Restez bien hydraté.</p>
        
        <h3>5. Acceptez de l'aide</h3>
        <p>N'hésitez pas à déléguer les tâches ménagères et à accepter le soutien de vos proches.</p>
        
        <h2>Quand consulter</h2>
        <p>Parlez à votre équipe soignante si la fatigue devient handicapante au quotidien. Des solutions médicales existent : traitement de l'anémie, ajustement des médicaments, etc.</p>
      `
    },
    {
      id: 4,
      title: "Méditation et cancer : les bienfaits prouvés",
      category: "wellness",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      excerpt: "Comment la méditation peut améliorer votre qualité de vie pendant et après le traitement.",
      trending: false,
      author: {
        name: "Claire Moreau",
        role: "Psycho-oncologue",
        avatar: "/avatar-psychologist.jpg"
      },
      publishedDate: "5 octobre 2025",
      tags: ["méditation", "bien-être", "mindfulness", "stress"],
      content: `
        <h2>La méditation dans le parcours de soin</h2>
        <p>De nombreuses études scientifiques ont démontré les bienfaits de la méditation pour les patients atteints de cancer. Cette pratique millénaire trouve aujourd'hui sa place dans les soins de support oncologiques.</p>
        
        <h2>Les bienfaits prouvés</h2>
        
        <h3>Réduction du stress et de l'anxiété</h3>
        <p>La méditation de pleine conscience réduit significativement les niveaux de cortisol (hormone du stress) et aide à gérer l'anxiété liée au diagnostic et aux traitements.</p>
        
        <h3>Amélioration du sommeil</h3>
        <p>Les pratiques méditatives favorisent un sommeil de meilleure qualité en calmant le mental et en réduisant les ruminations.</p>
        
        <h3>Gestion de la douleur</h3>
        <p>La méditation modifie la perception de la douleur et aide à mieux la tolérer sans nécessairement augmenter les doses d'antalgiques.</p>
        
        <h3>Renforcement du système immunitaire</h3>
        <p>Des études montrent que la méditation régulière peut améliorer la réponse immunitaire.</p>
        
        <h2>Comment commencer</h2>
        
        <h3>1. Méditation guidée</h3>
        <p>Utilisez des applications ou des vidéos pour débuter. 5-10 minutes par jour suffisent au départ.</p>
        
        <h3>2. Respiration consciente</h3>
        <p>Concentrez-vous simplement sur votre respiration. Inspirez profondément, expirez lentement.</p>
        
        <h3>3. Body scan</h3>
        <p>Allongé, portez attention à chaque partie de votre corps, de la tête aux pieds, en relâchant les tensions.</p>
        
        <h3>4. Méditation marchée</h3>
        <p>Marchez lentement en pleine conscience, en portant attention à chaque pas et aux sensations.</p>
        
        <h2>Conseils pratiques</h2>
        <ul>
          <li>Choisissez un moment calme de la journée</li>
          <li>Trouvez un endroit confortable</li>
          <li>Ne vous jugez pas si votre esprit s'égare</li>
          <li>La régularité est plus importante que la durée</li>
          <li>Soyez patient, les bénéfices apparaissent progressivement</li>
        </ul>
        
        <h2>Ressources</h2>
        <p>De nombreux centres de cancérologie proposent des ateliers de méditation. Renseignez-vous auprès de votre équipe soignante.</p>
      `
    },
    {
      id: 5,
      title: "L'importance de l'activité physique",
      category: "prevention",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
      excerpt: "Pourquoi bouger régulièrement est essentiel pour la prévention et la récupération.",
      trending: true,
      author: {
        name: "Thomas Bernard",
        role: "Kinésithérapeute en oncologie",
        avatar: "/avatar-physio.jpg"
      },
      publishedDate: "18 octobre 2025",
      tags: ["sport", "prévention", "activité physique", "santé"],
      content: `
        <h2>L'activité physique : un médicament naturel</h2>
        <p>L'exercice régulier est l'un des meilleurs moyens de prévenir le cancer et d'améliorer les résultats du traitement. Les preuves scientifiques sont écrasantes.</p>
        
        <h2>Les bénéfices de l'exercice</h2>
        
        <h3>En prévention</h3>
        <ul>
          <li>Réduit le risque de cancer du côlon de 25%</li>
          <li>Diminue le risque de cancer du sein de 20%</li>
          <li>Protège contre le cancer de l'endomètre</li>
          <li>Aide à maintenir un poids santé</li>
          <li>Régule les hormones</li>
          <li>Renforce le système immunitaire</li>
        </ul>
        
        <h3>Pendant le traitement</h3>
        <ul>
          <li>Réduit la fatigue</li>
          <li>Maintient la masse musculaire</li>
          <li>Améliore l'humeur</li>
          <li>Favorise le sommeil</li>
          <li>Augmente la tolérance aux traitements</li>
        </ul>
        
        <h3>Après le traitement</h3>
        <ul>
          <li>Réduit le risque de récidive</li>
          <li>Améliore la qualité de vie</li>
          <li>Aide à retrouver la forme</li>
        </ul>
        
        <h2>Quel type d'exercice ?</h2>
        
        <h3>Activité aérobie</h3>
        <p>Marche rapide, vélo, natation : 150 minutes par semaine d'intensité modérée, ou 75 minutes d'intensité élevée.</p>
        
        <h3>Renforcement musculaire</h3>
        <p>2 séances par semaine minimum pour tous les groupes musculaires majeurs.</p>
        
        <h3>Étirements et souplesse</h3>
        <p>Yoga, tai-chi, étirements quotidiens pour maintenir la mobilité.</p>
        
        <h2>Recommandations pratiques</h2>
        
        <h3>Si vous débutez</h3>
        <ul>
          <li>Commencez par 10 minutes par jour</li>
          <li>Augmentez progressivement</li>
          <li>Choisissez une activité que vous aimez</li>
          <li>Trouvez un partenaire d'exercice pour la motivation</li>
        </ul>
        
        <h3>Pendant le traitement</h3>
        <ul>
          <li>Consultez votre médecin avant de commencer</li>
          <li>Adaptez l'intensité à votre état</li>
          <li>Écoutez votre corps</li>
          <li>Reposez-vous si nécessaire</li>
        </ul>
        
        <h2>L'essentiel</h2>
        <p>Tout mouvement compte ! Même l'activité légère est bénéfique. L'objectif est de bouger plus et de rester moins assis. Trouvez ce qui vous convient et faites-en une habitude.</p>
      `
    },
    {
      id: 6,
      title: "Communiquer avec son équipe médicale",
      category: "treatment",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      excerpt: "Les bonnes questions à poser et comment établir une relation de confiance avec vos soignants.",
      trending: false,
      author: {
        name: "Dr. Anne Dupuis",
        role: "Oncologue médicale",
        avatar: "/avatar-doctor-woman2.jpg"
      },
      publishedDate: "12 octobre 2025",
      tags: ["communication", "médecin", "relation soignant", "traitement"],
      content: `
        <h2>Une communication efficace pour de meilleurs soins</h2>
        <p>La qualité de la communication avec votre équipe médicale joue un rôle crucial dans votre parcours de soin. Une bonne relation patient-soignant améliore l'adhésion au traitement et la satisfaction globale.</p>
        
        <h2>Préparer vos consultations</h2>
        
        <h3>Avant le rendez-vous</h3>
        <ul>
          <li>Notez vos questions par ordre de priorité</li>
          <li>Listez vos symptômes et leur évolution</li>
          <li>Rassemblez tous vos documents médicaux</li>
          <li>Notez vos médicaments actuels et leurs dosages</li>
          <li>Venez accompagné si possible (deux paires d'oreilles valent mieux qu'une)</li>
        </ul>
        
        <h3>Questions importantes à poser</h3>
        <p><strong>Sur le diagnostic :</strong></p>
        <ul>
          <li>Quel type de cancer ai-je exactement ?</li>
          <li>À quel stade est-il ?</li>
          <li>Des examens complémentaires sont-ils nécessaires ?</li>
        </ul>
        
        <p><strong>Sur le traitement :</strong></p>
        <ul>
          <li>Quelles sont mes options de traitement ?</li>
          <li>Quels sont les bénéfices et les risques de chaque option ?</li>
          <li>Quel est le plan de traitement recommandé et pourquoi ?</li>
          <li>Quelle est la durée prévue du traitement ?</li>
          <li>Quels effets secondaires puis-je attendre ?</li>
          <li>Comment les gérer ?</li>
        </ul>
        
        <p><strong>Sur le suivi :</strong></p>
        <ul>
          <li>À quelle fréquence serai-je vu ?</li>
          <li>Quels examens de surveillance sont prévus ?</li>
          <li>Que dois-je surveiller entre les consultations ?</li>
          <li>Quand et comment vous contacter en cas de problème ?</li>
        </ul>
        
        <h2>Pendant la consultation</h2>
        
        <h3>Exprimez-vous clairement</h3>
        <ul>
          <li>Décrivez précisément vos symptômes (intensité, fréquence, impact)</li>
          <li>N'minimisez pas vos difficultés</li>
          <li>Parlez de vos inquiétudes et de vos peurs</li>
          <li>Mentionnez tous les médicaments, y compris les compléments</li>
        </ul>
        
        <h3>Assurez-vous de bien comprendre</h3>
        <ul>
          <li>N'hésitez pas à demander des clarifications</li>
          <li>Reformulez ce que vous avez compris</li>
          <li>Demandez des explications en termes simples si nécessaire</li>
          <li>Prenez des notes ou enregistrez (avec autorisation)</li>
        </ul>
        
        <h2>Construire une relation de confiance</h2>
        
        <h3>Soyez honnête</h3>
        <p>Parlez ouvertement de vos difficultés à suivre les prescriptions, de vos doutes, de vos craintes. Votre équipe est là pour vous aider, pas pour vous juger.</p>
        
        <h3>Participez aux décisions</h3>
        <p>Vous êtes un partenaire actif de vos soins. Vos préférences, vos valeurs et votre qualité de vie doivent être prises en compte.</p>
        
        <h3>Respectez l'expertise</h3>
        <p>Si vous consultez des sources d'information, partagez-les avec votre équipe. Évitez les décisions basées uniquement sur Internet.</p>
        
        <h2>Utiliser les ressources disponibles</h2>
        <ul>
          <li>Infirmières coordinatrices : premier point de contact</li>
          <li>Psycho-oncologues : soutien émotionnel</li>
          <li>Assistantes sociales : aide pratique et administrative</li>
          <li>Diététiciennes : conseils nutritionnels</li>
          <li>Associations de patients : partage d'expériences</li>
        </ul>
        
        <h2>En cas de désaccord</h2>
        <p>Si vous n'êtes pas d'accord avec une décision ou si la relation ne fonctionne pas, vous avez le droit de demander un second avis ou de changer de médecin. C'est votre droit et cela ne devrait pas être perçu comme un affront.</p>
        
        <h2>Conclusion</h2>
        <p>Une bonne communication est la base d'une prise en charge réussie. N'ayez jamais peur de poser des questions ou d'exprimer vos préoccupations. Vous êtes au centre de votre parcours de soin.</p>
      `
    },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Si un article est sélectionné, afficher la vue détaillée
  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Articles</h2>
            <p className="text-muted-foreground">Informations fiables et actualisées</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Article */}
      {selectedCategory === "all" && !searchQuery && (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedArticle(articles[0])}>
          <div className="md:flex">
            <div className="md:w-2/5 aspect-video md:aspect-auto bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800" alt="Featured" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:w-3/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="inline-block px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  À la une
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  <span>Tendance</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Les dernières avancées dans la recherche contre le cancer
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Découvrez les innovations récentes qui transforment la prise en charge et le traitement du cancer. Des
                thérapies ciblées aux immunothérapies, un tour d'horizon complet des progrès scientifiques.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>15 min</span>
                </div>
                <span>•</span>
                <span>Mis à jour aujourd'hui</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <Card 
            key={article.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="aspect-video bg-linear-to-br from-primary/10 to-accent/10 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {categories.find((c) => c.id === article.category)?.label}
                </div>
                {article.trending && (
                  <div className="flex items-center gap-1 text-xs text-accent">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{article.readTime} de lecture</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucun article trouvé</h3>
          <p className="text-muted-foreground">
            Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
          </p>
        </Card>
      )}
    </div>
  )
}
