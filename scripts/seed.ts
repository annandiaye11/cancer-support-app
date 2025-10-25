import { config } from 'dotenv'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Article from '@/models/Article'
import Video from '@/models/Video'
import bcrypt from 'bcryptjs'

// Charger les variables d'environnement depuis .env.local
config({ path: '.env.local' })

async function seedDatabase() {
  try {
    await connectDB()
    console.log('✅ Connexion à MongoDB établie')

    // Vider les collections existantes
    await User.deleteMany({})
    await Article.deleteMany({})
    await Video.deleteMany({})
    console.log('🧹 Collections vidées')

    // Créer des utilisateurs de test
    const users = [
      {
        name: 'Marie Dupont',
        email: 'marie.dupont@email.com',
        password: await bcrypt.hash('password123', 12),
        profile: {
          gender: 'female' as const,
          age: 35,
          mode: 'preventive' as const
        },
        role: 'user'
      },
      {
        name: 'Dr. Abdoul Karim ',
        email: 'dr.abdoul@hopital.sn',
        password: await bcrypt.hash('doctor123', 12),
        profile: {
          gender: 'male' as const,
          age: 45,
          mode: 'preventive' as const
        },
        role: 'doctor'
      }
    ]

    const createdUsers = await User.insertMany(users)
    console.log(`👥 ${createdUsers.length} utilisateurs créés`)

    // Créer des articles
    const articles = [
      {
        title: "Les 10 habitudes pour réduire les risques de cancer",
        slug: "10-habitudes-reduire-risques-cancer",
        content: `
<h2>Les 10 habitudes pour réduire les risques de cancer</h2>

<p>Le cancer est une maladie complexe, mais de nombreuses recherches montrent que certaines habitudes peuvent considérablement réduire les risques. Voici les 10 habitudes essentielles à adopter :</p>

<h3>1. Adopter une alimentation équilibrée</h3>
<p>Une alimentation riche en fruits, légumes et fibres est essentielle. Les antioxydants présents dans les fruits et légumes colorés protègent nos cellules des dommages qui peuvent mener au cancer.</p>

<h3>2. Maintenir un poids santé</h3>
<p>L'obésité est liée à plusieurs types de cancer, notamment ceux du sein, du côlon et de l'utérus. Maintenir un IMC entre 18,5 et 25 réduit significativement ces risques.</p>

<h3>3. Pratiquer une activité physique régulière</h3>
<p>L'exercice régulier renforce le système immunitaire et aide à maintenir un poids santé. 150 minutes d'activité modérée par semaine sont recommandées.</p>

<h3>4. Éviter le tabac</h3>
<p>Le tabagisme est la première cause de cancer évitable. Il augmente les risques de cancer du poumon, de la vessie, du pancréas et de nombreux autres organes.</p>

<h3>5. Limiter la consommation d'alcool</h3>
<p>L'alcool augmente les risques de plusieurs cancers. Il est recommandé de ne pas dépasser 2 verres par jour pour les hommes et 1 verre pour les femmes.</p>

<h3>6. Se protéger du soleil</h3>
<p>Les UV sont responsables de la plupart des cancers de la peau. Utilisez une protection solaire SPF 30+ et évitez l'exposition entre 10h et 16h.</p>

<h3>7. Faire les dépistages recommandés</h3>
<p>La détection précoce sauve des vies. Respectez les calendriers de dépistage pour le cancer du sein, du col de l'utérus et colorectal.</p>

<h3>8. Maintenir un bon sommeil</h3>
<p>Un sommeil de qualité (7-9h par nuit) renforce les défenses naturelles et aide à la réparation cellulaire.</p>

<h3>9. Gérer le stress</h3>
<p>Le stress chronique affaiblit le système immunitaire. Pratiquez la méditation, le yoga ou toute activité qui vous détend.</p>

<h3>10. Éviter les expositions toxiques</h3>
<p>Limitez l'exposition aux substances cancérigènes comme l'amiante, les pesticides et certains produits chimiques domestiques.</p>

<p><strong>Conclusion :</strong> Ces habitudes, adoptées ensemble, peuvent réduire significativement votre risque de développer un cancer. Commencez par de petits changements et progressez à votre rythme.</p>
        `,
        excerpt: "Découvrez les 10 habitudes essentielles pour réduire significativement vos risques de développer un cancer.",
        category: "Prévention",
        tags: ["prévention", "habitudes", "santé", "style de vie"],
        author: {
          name: "Dr. Aminata Fall",
          role: "Oncologue",
          avatar: "/placeholder-user.jpg"
        },
        image: "/healthy-lifestyle-prevention.jpg",
        readTime: 8,
        isPublished: true,
        isFeatured: true,
        views: 1250,
        likes: 89,
        publishedAt: new Date(),
        seo: {
          metaTitle: "10 habitudes pour prévenir le cancer | CareCompanion",
          metaDescription: "Découvrez les habitudes scientifiquement prouvées pour réduire vos risques de cancer. Guide complet par nos experts.",
          keywords: ["prévention cancer", "habitudes santé", "réduire risques cancer"]
        }
      },
      {
        title: "Comprendre l'importance du dépistage précoce",
        slug: "importance-depistage-precoce",
        content: `
<h2>L'importance du dépistage précoce</h2>

<p>Le dépistage précoce est l'un des outils les plus puissants dans la lutte contre le cancer. Plus un cancer est détecté tôt, plus les chances de guérison sont élevées.</p>

<h3>Qu'est-ce que le dépistage ?</h3>
<p>Le dépistage consiste à rechercher la présence d'un cancer ou de lésions précancéreuses chez des personnes qui ne présentent pas de symptômes. L'objectif est de détecter la maladie à un stade précoce, quand elle est encore petite et localisée.</p>

<h3>Les différents types de dépistage</h3>

<h4>Dépistage organisé</h4>
<p>Des programmes nationaux existent pour certains cancers :</p>
<ul>
<li><strong>Cancer du sein :</strong> Mammographie tous les 2 ans de 50 à 74 ans</li>
<li><strong>Cancer colorectal :</strong> Test immunologique tous les 2 ans de 50 à 74 ans</li>
<li><strong>Cancer du col de l'utérus :</strong> Frottis tous les 3 ans de 25 à 65 ans</li>
</ul>

<h4>Dépistage individuel</h4>
<p>Sur recommandation de votre médecin, selon vos facteurs de risque personnels et familiaux.</p>

<h3>Les cancers les plus fréquents et leur dépistage</h3>

<h4>Cancer du sein</h4>
<p>La mammographie reste l'examen de référence. L'auto-examen mensuel est également recommandé pour toutes les femmes dès 20 ans.</p>

<h4>Cancer colorectal</h4>
<p>Le test immunologique recherche des traces de sang dans les selles. En cas de résultat positif, une coloscopie sera proposée.</p>

<h4>Cancer du col de l'utérus</h4>
<p>Le frottis cervical détecte les cellules anormales avant qu'elles ne deviennent cancéreuses. Le test HPV peut également être réalisé.</p>

<h3>Pourquoi est-ce si important ?</h3>
<p>Les statistiques parlent d'elles-mêmes :</p>
<ul>
<li>Cancer du sein détecté tôt : 99% de survie à 5 ans</li>
<li>Cancer colorectal au stade précoce : 90% de survie à 5 ans</li>
<li>Cancer du col de l'utérus dépisté : quasi 100% de guérison</li>
</ul>

<p><strong>N'oubliez pas :</strong> Le dépistage sauve des vies. Respectez les calendriers recommandés et n'hésitez pas à en parler avec votre médecin.</p>
        `,
        excerpt: "Le dépistage précoce peut sauver des vies. Découvrez pourquoi et comment effectuer les dépistages recommandés.",
        category: "Dépistage",
        tags: ["dépistage", "prévention", "cancer", "santé"],
        author: {
          name: "Dr. Marie Leroy",
          role: "Médecin généraliste",
          avatar: "/placeholder-user.jpg"
        },
        image: "/medical-screening-checkup.jpg",
        readTime: 6,
        isPublished: true,
        isFeatured: false,
        views: 890,
        likes: 67,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Hier
        seo: {
          metaTitle: "Dépistage précoce du cancer | CareCompanion",
          metaDescription: "Tout savoir sur l'importance du dépistage précoce pour la détection du cancer.",
          keywords: ["dépistage cancer", "détection précoce", "mammographie", "frottis"]
        }
      },
      {
        title: "Alimentation et prévention du cancer : guide complet",
        slug: "alimentation-prevention-cancer-guide",
        content: `
<h2>Alimentation et prévention du cancer : guide complet</h2>

<p>L'alimentation joue un rôle crucial dans la prévention du cancer. On estime qu'environ 30% des cancers pourraient être évités grâce à une alimentation équilibrée.</p>

<h3>Les aliments protecteurs</h3>

<h4>Fruits et légumes</h4>
<p>Riches en antioxydants, vitamines et fibres, ils protègent nos cellules :</p>
<ul>
<li><strong>Légumes crucifères :</strong> brocolis, choux, radis</li>
<li><strong>Fruits rouges :</strong> myrtilles, framboises, grenades</li>
<li><strong>Légumes verts :</strong> épinards, roquette, mâche</li>
<li><strong>Agrumes :</strong> oranges, citrons, pamplemousses</li>
</ul>

<h4>Céréales complètes</h4>
<p>Riz complet, quinoa, avoine... riches en fibres qui facilitent l'élimination des toxines.</p>

<h4>Légumineuses</h4>
<p>Lentilles, haricots, pois chiches apportent protéines végétales et fibres.</p>

<h4>Poissons gras</h4>
<p>Saumon, sardines, maquereaux sont riches en oméga-3 anti-inflammatoires.</p>

<h3>Les aliments à limiter</h3>

<h4>Viandes transformées</h4>
<p>Charcuterie, saucisses classées cancérigènes par l'OMS. À consommer avec modération.</p>

<h4>Viande rouge</h4>
<p>Limiter à 500g par semaine maximum. Privilégier les viandes blanches et les protéines végétales.</p>

<h4>Alcool</h4>
<p>Augmente les risques de plusieurs cancers. Consommation à limiter.</p>

<h4>Aliments ultra-transformés</h4>
<p>Riches en additifs, conservateurs et graisses trans.</p>

<h3>Conseils pratiques au quotidien</h3>

<h4>Petit-déjeuner anti-cancer</h4>
<ul>
<li>Flocons d'avoine avec fruits rouges</li>
<li>Thé vert riche en antioxydants</li>
<li>Yaourt nature avec noix</li>
</ul>

<h4>Déjeuner protecteur</h4>
<ul>
<li>Salade variée avec légumes colorés</li>
<li>Poisson ou légumineuses</li>
<li>Céréales complètes</li>
</ul>

<h4>Dîner léger</h4>
<ul>
<li>Légumes vapeur</li>
<li>Protéines maigres</li>
<li>Fruits de saison</li>
</ul>

<h3>Mode de cuisson</h3>
<p>Privilégiez :</p>
<ul>
<li>Cuisson vapeur</li>
<li>Cuisson au four</li>
<li>Papillote</li>
</ul>

<p>Évitez :</p>
<ul>
<li>Grillades à haute température</li>
<li>Fritures répétées</li>
<li>Cuisson au barbecue trop fréquente</li>
</ul>

<p><strong>Conclusion :</strong> Une alimentation variée, riche en végétaux et pauvre en produits transformés est votre meilleur allié pour réduire les risques de cancer.</p>
        `,
        excerpt: "Découvrez comment votre alimentation peut devenir un puissant outil de prévention contre le cancer.",
        category: "Nutrition",
        tags: ["nutrition", "alimentation", "prévention", "antioxydants"],
        author: {
          name: "Dr. Claire Nutrition",
          role: "Nutritionniste",
          avatar: "/placeholder-user.jpg"
        },
        image: "/healthy-food-nutrition.png",
        readTime: 10,
        isPublished: true,
        isFeatured: true,
        views: 756,
        likes: 92,
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // Avant-hier
        seo: {
          metaTitle: "Alimentation anti-cancer | Guide nutrition CareCompanion",
          metaDescription: "Guide complet sur l'alimentation anti-cancer : aliments protecteurs, conseils pratiques et recettes.",
          keywords: ["alimentation anti-cancer", "nutrition prévention", "aliments protecteurs"]
        }
      },
      {
        title: "Gérer le stress et l'anxiété pendant un parcours cancer",
        slug: "gerer-stress-anxiete-cancer",
        content: `
<h2>Gérer le stress et l'anxiété pendant un parcours cancer</h2>

<p>Un diagnostic de cancer génère naturellement du stress et de l'anxiété. Ces émotions sont normales et compréhensibles. Voici des stratégies pour mieux les gérer.</p>

<h3>Comprendre ses émotions</h3>
<p>Il est important de reconnaître que :</p>
<ul>
<li>Toutes vos émotions sont légitimes</li>
<li>Il n'y a pas de "bonne" façon de réagir</li>
<li>Les émotions changent avec le temps</li>
<li>Demander de l'aide est un signe de force</li>
</ul>

<h3>Techniques de relaxation</h3>

<h4>Respiration profonde</h4>
<p>Technique simple et efficace :</p>
<ol>
<li>Inspirez lentement par le nez (4 secondes)</li>
<li>Retenez votre souffle (4 secondes)</li>
<li>Expirez par la bouche (6 secondes)</li>
<li>Répétez 10 fois</li>
</ol>

<h4>Relaxation musculaire progressive</h4>
<p>Contractez puis relâchez chaque groupe musculaire, des pieds à la tête.</p>

<h4>Méditation de pleine conscience</h4>
<p>Concentrez-vous sur le moment présent, sans jugement. Même 5 minutes par jour peuvent aider.</p>

<h3>Soutien social</h3>

<h4>Famille et amis</h4>
<p>N'hésitez pas à exprimer vos besoins et vos limites. Vos proches veulent vous aider mais ne savent pas toujours comment.</p>

<h4>Groupes de soutien</h4>
<p>Rencontrer d'autres personnes vivant la même situation peut être très réconfortant.</p>

<h4>Professionnels</h4>
<p>Psychologues, psychiatres spécialisés en psycho-oncologie peuvent vous accompagner.</p>

<h3>Activités apaisantes</h3>

<h4>Activité physique adaptée</h4>
<p>Même légère, elle libère des endorphines et réduit le stress :</p>
<ul>
<li>Marche en nature</li>
<li>Yoga doux</li>
<li>Natation</li>
<li>Tai-chi</li>
</ul>

<h4>Activités créatives</h4>
<ul>
<li>Dessin, peinture</li>
<li>Écriture, journal intime</li>
<li>Musique</li>
<li>Jardinage</li>
</ul>

<h4>Lecture et divertissement</h4>
<p>Films, livres, podcasts peuvent offrir des moments d'évasion bienvenus.</p>

<h3>Gestion des pensées négatives</h3>

<h4>Identifier les pensées automatiques</h4>
<p>Reconnaissez les pensées catastrophiques et questionnez leur réalisme.</p>

<h4>Reformulation positive</h4>
<p>Remplacez "Je ne vais pas y arriver" par "Je fais de mon mieux jour après jour".</p>

<h4>Technique du STOP</h4>
<ul>
<li><strong>S</strong>top : Arrêtez-vous</li>
<li><strong>T</strong>ake a breath : Respirez</li>
<li><strong>O</strong>bserve : Observez vos pensées</li>
<li><strong>P</strong>roceed : Continuez avec bienveillance</li>
</ul>

<h3>Communication avec l'équipe médicale</h3>
<p>N'hésitez pas à :</p>
<ul>
<li>Poser toutes vos questions</li>
<li>Exprimer vos inquiétudes</li>
<li>Demander des explications claires</li>
<li>Solliciter un soutien psychologique</li>
</ul>

<p><strong>Rappelez-vous :</strong> Prendre soin de votre santé mentale fait partie intégrante de votre traitement. Vous méritez d'être accompagné(e) dans cette épreuve.</p>
        `,
        excerpt: "Techniques et conseils pratiques pour gérer le stress et l'anxiété pendant votre parcours de soins.",
        category: "Soutien psychologique",
        tags: ["stress", "anxiété", "soutien", "psychologie", "bien-être"],
        author: {
          name: "Dr. Emma Psycho",
          role: "Psycho-oncologue",
          avatar: "/placeholder-user.jpg"
        },
        image: "/person-breathing-meditation.jpg",
        readTime: 12,
        isPublished: true,
        isFeatured: false,
        views: 634,
        likes: 78,
        publishedAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // Il y a 3 jours
        seo: {
          metaTitle: "Gérer stress et anxiété cancer | CareCompanion",
          metaDescription: "Techniques et conseils pour gérer le stress et l'anxiété pendant un parcours cancer.",
          keywords: ["stress cancer", "anxiété cancer", "soutien psychologique", "relaxation"]
        }
      },
      {
        title: "L'activité physique pendant et après le cancer",
        slug: "activite-physique-cancer",
        content: `
<h2>L'activité physique pendant et après le cancer</h2>

<p>L'activité physique adaptée est aujourd'hui recommandée pendant et après un traitement contre le cancer. Elle apporte de nombreux bénéfices pour le corps et l'esprit.</p>

<h3>Les bienfaits prouvés</h3>

<h4>Pendant le traitement</h4>
<ul>
<li>Réduit la fatigue (contrairement aux idées reçues)</li>
<li>Améliore la tolérance aux traitements</li>
<li>Maintient la masse musculaire</li>
<li>Réduit l'anxiété et la dépression</li>
<li>Améliore la qualité de vie</li>
</ul>

<h4>Après le traitement</h4>
<ul>
<li>Réduit le risque de récidive (jusqu'à 40% pour certains cancers)</li>
<li>Améliore les chances de survie</li>
<li>Aide à retrouver la forme physique</li>
<li>Favorise la reprise d'une vie normale</li>
</ul>

<h3>Quels types d'activités ?</h3>

<h4>Activités d'endurance (cardio)</h4>
<ul>
<li>Marche rapide</li>
<li>Vélo</li>
<li>Natation</li>
<li>Danse</li>
</ul>

<h4>Renforcement musculaire</h4>
<ul>
<li>Exercices avec poids légers</li>
<li>Élastiques</li>
<li>Poids du corps</li>
<li>Pilates</li>
</ul>

<h4>Souplesse et équilibre</h4>
<ul>
<li>Yoga</li>
<li>Tai-chi</li>
<li>Stretching</li>
</ul>

<h3>Recommandations</h3>
<p>Pour les adultes pendant et après le traitement :</p>
<ul>
<li>150 minutes d'activité modérée par semaine</li>
<li>OU 75 minutes d'activité intense</li>
<li>2 séances de renforcement musculaire</li>
<li>Réduire le temps assis</li>
</ul>

<h3>Précautions importantes</h3>
<ul>
<li>Toujours consulter son oncologue avant</li>
<li>Commencer progressivement</li>
<li>Adapter selon la fatigue</li>
<li>Éviter les contacts violents pendant certains traitements</li>
<li>Idéalement, travailler avec un professionnel APA (Activité Physique Adaptée)</li>
</ul>

<p><strong>L'essentiel :</strong> Bouger, c'est déjà beaucoup ! Même 10 minutes par jour ont un impact positif.</p>
        `,
        excerpt: "Découvrez pourquoi et comment l'activité physique est bénéfique pendant et après un cancer.",
        category: "Bien-être",
        tags: ["activité physique", "sport", "exercice", "récupération", "prévention"],
        author: {
          name: "Dr. Marc Sport",
          role: "Médecin du sport",
          avatar: "/placeholder-user.jpg"
        },
        image: "/exercise-prevention-health.jpg",
        readTime: 8,
        isPublished: true,
        isFeatured: true,
        views: 892,
        likes: 102,
        publishedAt: new Date(Date.now() - 96 * 60 * 60 * 1000), // Il y a 4 jours
        seo: {
          metaTitle: "Activité physique et cancer | CareCompanion",
          metaDescription: "Les bienfaits de l'activité physique pendant et après le traitement du cancer.",
          keywords: ["activité physique cancer", "sport cancer", "exercice traitement"]
        }
      },
      {
        title: "Communiquer avec son équipe médicale",
        slug: "communiquer-equipe-medicale",
        content: `
<h2>Communiquer efficacement avec son équipe médicale</h2>

<p>Une bonne communication avec votre équipe médicale est essentielle pour un parcours de soins optimal. Voici comment optimiser vos consultations.</p>

<h3>Préparer sa consultation</h3>

<h4>Avant le rendez-vous</h4>
<ul>
<li>Notez vos questions à l'avance</li>
<li>Listez vos symptômes et leur évolution</li>
<li>Apportez vos derniers examens</li>
<li>Notez vos traitements actuels</li>
<li>Venez accompagné(e) si possible</li>
</ul>

<h4>Questions importantes à poser</h4>
<ul>
<li>Quel est exactement mon diagnostic ?</li>
<li>Quelles sont mes options de traitement ?</li>
<li>Quels sont les effets secondaires possibles ?</li>
<li>Comment puis-je les gérer ?</li>
<li>Quand dois-je vous contacter en cas de problème ?</li>
</ul>

<h3>Pendant la consultation</h3>

<h4>Prendre des notes</h4>
<p>N'hésitez pas à écrire ou enregistrer (avec permission) pour ne rien oublier.</p>

<h4>Demander des éclaircissements</h4>
<p>Si vous ne comprenez pas un terme médical, demandez une explication en langage simple.</p>

<h4>Exprimer vos préoccupations</h4>
<p>Vos inquiétudes, même si elles vous semblent insignifiantes, méritent d'être entendues.</p>

<h3>Construire une relation de confiance</h3>

<h4>Soyez honnête</h4>
<p>Partagez toutes les informations, même embarrassantes. Votre médecin est là pour vous aider, pas pour juger.</p>

<h4>Respectez les recommandations</h4>
<p>Si vous ne pouvez pas suivre un traitement, expliquez pourquoi plutôt que de l'arrêter sans en parler.</p>

<h4>Donnez votre feedback</h4>
<p>Informez l'équipe de ce qui fonctionne ou non pour vous.</p>

<h3>Vos droits</h3>
<ul>
<li>Droit à l'information claire et compréhensible</li>
<li>Droit de refuser un traitement</li>
<li>Droit d'avoir un second avis</li>
<li>Droit d'accéder à votre dossier médical</li>
<li>Droit d'être accompagné(e)</li>
</ul>

<h3>Ressources utiles</h3>
<ul>
<li>Infirmière de coordination</li>
<li>Assistante sociale</li>
<li>Psychologue</li>
<li>Associations de patients</li>
</ul>

<h3>Demander un second avis</h3>
<p>C'est votre droit ! Cela ne vexera pas votre médecin et peut vous apporter :</p>
<ul>
<li>Confirmation du diagnostic</li>
<li>Autres options thérapeutiques</li>
<li>Réassurance</li>
</ul>

<p><strong>Rappelez-vous :</strong> Vous êtes au centre de votre parcours de soins. Une communication ouverte favorise de meilleurs résultats.</p>
        `,
        excerpt: "Conseils pratiques pour optimiser la communication avec votre équipe médicale.",
        category: "Soutien psychologique",
        tags: ["communication", "équipe médicale", "consultation", "droits", "parcours soins"],
        author: {
          name: "Dr. Alice Patient",
          role: "Médecin coordinateur",
          avatar: "/placeholder-user.jpg"
        },
        image: "/doctor-patient-consultation.jpg",
        readTime: 7,
        isPublished: true,
        isFeatured: false,
        views: 543,
        likes: 67,
        publishedAt: new Date(Date.now() - 120 * 60 * 60 * 1000), // Il y a 5 jours
        seo: {
          metaTitle: "Communication équipe médicale | CareCompanion",
          metaDescription: "Comment optimiser la communication avec votre équipe médicale pendant le parcours cancer.",
          keywords: ["communication médecin", "consultation", "droits patients"]
        }
      },
      {
        title: "Gérer la fatigue liée au cancer",
        slug: "gerer-fatigue-cancer",
        content: `
<h2>Gérer la fatigue liée au cancer</h2>

<p>La fatigue est l'un des effets secondaires les plus fréquents du cancer et de ses traitements. Contrairement à la fatigue normale, elle ne disparaît pas avec le repos. Voici comment la gérer.</p>

<h3>Comprendre la fatigue cancéreuse</h3>

<h4>Qu'est-ce que c'est ?</h4>
<p>C'est une fatigue intense, persistante et disproportionnée par rapport à l'activité. Elle affecte :</p>
<ul>
<li>Le corps (faiblesse physique)</li>
<li>L'esprit (difficulté de concentration)</li>
<li>Les émotions (irritabilité)</li>
</ul>

<h4>Les causes</h4>
<ul>
<li>Le cancer lui-même</li>
<li>Les traitements (chimio, radio)</li>
<li>L'anémie</li>
<li>Les troubles du sommeil</li>
<li>La douleur</li>
<li>Le stress et l'anxiété</li>
<li>Les déséquilibres nutritionnels</li>
</ul>

<h3>5 stratégies pour mieux gérer</h3>

<h4>1. Conserver son énergie</h4>
<ul>
<li>Priorisez les activités importantes</li>
<li>Déléguez quand c'est possible</li>
<li>Planifiez les tâches importantes aux moments où vous avez plus d'énergie</li>
<li>Évitez le perfectionnisme</li>
</ul>

<h4>2. Rester actif (paradoxalement !)</h4>
<ul>
<li>L'activité physique douce réduit la fatigue</li>
<li>Commencez par 5-10 minutes par jour</li>
<li>Marche, yoga, natation</li>
<li>Augmentez progressivement</li>
</ul>

<h4>3. Optimiser le sommeil</h4>
<ul>
<li>Horaires réguliers</li>
<li>Environnement calme et sombre</li>
<li>Éviter écrans 1h avant le coucher</li>
<li>Siestes courtes (20-30 min max)</li>
<li>Relaxation avant de dormir</li>
</ul>

<h4>4. Adapter l'alimentation</h4>
<ul>
<li>Repas légers et fréquents</li>
<li>Protéines à chaque repas</li>
<li>Hydratation suffisante</li>
<li>Limiter sucres raffinés</li>
<li>Fer et vitamines si besoin</li>
</ul>

<h4>5. Demander de l'aide</h4>
<ul>
<li>Parlez-en à votre équipe médicale</li>
<li>Acceptez l'aide des proches</li>
<li>Consultez un psychologue si besoin</li>
<li>Traitements possibles (selon la cause)</li>
</ul>

<h3>Quand consulter ?</h3>
<p>Contactez votre équipe si :</p>
<ul>
<li>La fatigue empire soudainement</li>
<li>Elle vous empêche de faire vos activités essentielles</li>
<li>Vous avez des vertiges ou essoufflement</li>
<li>Vous êtes confus(e) ou désorienté(e)</li>
</ul>

<h3>Outils pratiques</h3>

<h4>Journal de fatigue</h4>
<p>Notez chaque jour :</p>
<ul>
<li>Niveau de fatigue (échelle 0-10)</li>
<li>Activités réalisées</li>
<li>Heures de sommeil</li>
<li>Facteurs aggravants</li>
</ul>

<h4>Techniques de respiration</h4>
<p>3-5 minutes de respiration profonde peuvent redonner de l'énergie.</p>

<p><strong>Important :</strong> La fatigue diminue généralement progressivement après la fin des traitements, mais cela peut prendre plusieurs mois.</p>
        `,
        excerpt: "Stratégies concrètes pour gérer la fatigue intense liée au cancer et à ses traitements.",
        category: "Traitement",
        tags: ["fatigue", "effets secondaires", "gestion", "bien-être", "traitement"],
        author: {
          name: "Dr. Julie Énergie",
          role: "Oncologue",
          avatar: "/placeholder-user.jpg"
        },
        image: "/person-resting-tired.jpg",
        readTime: 9,
        isPublished: true,
        isFeatured: false,
        views: 723,
        likes: 84,
        publishedAt: new Date(Date.now() - 144 * 60 * 60 * 1000), // Il y a 6 jours
        seo: {
          metaTitle: "Gérer la fatigue du cancer | CareCompanion",
          metaDescription: "Conseils et stratégies pour mieux gérer la fatigue intense pendant le traitement du cancer.",
          keywords: ["fatigue cancer", "effets secondaires", "chimiothérapie fatigue"]
        }
      }
    ]

    const createdArticles = await Article.insertMany(articles)
    console.log(`📖 ${createdArticles.length} articles créés`)

    // Créer des vidéos
    const videos = [
      {
        title: "Exercices de relaxation anti-stress",
        slug: "exercices-relaxation-anti-stress",
        description: "Une séance de relaxation guidée de 15 minutes pour réduire le stress et l'anxiété. Parfait pour les patients en traitement ou en rémission.",
        category: "Relaxation",
        tags: ["relaxation", "stress", "méditation", "bien-être"],
        thumbnail: "/person-resting-peaceful.jpg",
        videoUrl: "https://example.com/video1.mp4",
        duration: 900, // 15 minutes
        author: {
          name: "Khady Dieng",
          role: "Instructrice de méditation",
          avatar: "/placeholder-user.jpg"
        },
        isPublished: true,
        isFeatured: true,
        views: 567,
        likes: 89,
        publishedAt: new Date(),
        seo: {
          metaTitle: "Relaxation anti-stress | Vidéos CareCompanion",
          metaDescription: "Séance de relaxation guidée pour réduire le stress pendant le parcours cancer.",
          keywords: ["relaxation", "stress", "cancer", "méditation"]
        }
      },
      {
        title: "Yoga doux pour la récupération",
        slug: "yoga-doux-recuperation",
        description: "Séance de yoga adaptée aux personnes en traitement contre le cancer. Mouvements doux pour maintenir la flexibilité et le bien-être.",
        category: "Exercices",
        tags: ["yoga", "exercice", "récupération", "doux"],
        thumbnail: "/yoga-gentle-exercise.jpg",
        videoUrl: "https://example.com/video2.mp4",
        duration: 1200, // 20 minutes
        author: {
          name: "Emma Yoga",
          role: "Professeure de yoga thérapeutique",
          avatar: "/placeholder-user.jpg"
        },
        isPublished: true,
        isFeatured: false,
        views: 423,
        likes: 56,
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // Avant-hier
        seo: {
          metaTitle: "Yoga thérapeutique | Vidéos CareCompanion",
          metaDescription: "Yoga doux adapté aux patients en traitement contre le cancer.",
          keywords: ["yoga", "cancer", "exercice doux", "thérapeutique"]
        }
      }
    ]

    const createdVideos = await Video.insertMany(videos)
    console.log(`🎥 ${createdVideos.length} vidéos créées`)

    console.log('🎉 Base de données peuplée avec succès!')
    console.log('📊 Résumé:')
    console.log(`   - ${createdUsers.length} utilisateurs`)
    console.log(`   - ${createdArticles.length} articles`)
    console.log(`   - ${createdVideos.length} vidéos`)

  } catch (error) {
    console.error('❌ Erreur lors du peuplement:', error)
  }
}

// Exporter la fonction pour l'utiliser dans un script
export default seedDatabase

// Si ce fichier est exécuté directement
if (require.main === module) {
  seedDatabase().then(() => process.exit(0))
}
