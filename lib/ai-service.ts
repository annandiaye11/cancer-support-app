// Services IA - Prêts à l'emploi pour chaque provider
// Il suffit d'ajouter la clé API dans .env.local et changer AI_PROVIDER

import { AI_CONFIG } from './ai-config'

export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface AIResponse {
  message: string
  provider: string
  model: string
}

// ============================================
// SERVICE OPENAI GPT-4
// ============================================
export async function callOpenAI(messages: AIMessage[]): Promise<string> {
  if (!AI_CONFIG.apiKeys.openai) {
    throw new Error('OPENAI_API_KEY non configurée')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AI_CONFIG.apiKeys.openai}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages,
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`OpenAI API Error: ${error.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// ============================================
// SERVICE ANTHROPIC CLAUDE
// ============================================
export async function callAnthropic(messages: AIMessage[]): Promise<string> {
  if (!AI_CONFIG.apiKeys.anthropic) {
    throw new Error('ANTHROPIC_API_KEY non configurée')
  }

  // Séparer system message des autres
  const systemMessage = messages.find((m) => m.role === 'system')?.content || ''
  const conversationMessages = messages.filter((m) => m.role !== 'system')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AI_CONFIG.apiKeys.anthropic,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
      system: systemMessage,
      messages: conversationMessages,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Anthropic API Error: ${error.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  return data.content[0].text
}

// ============================================
// SERVICE OLLAMA LOCAL
// ============================================
export async function callOllama(messages: AIMessage[]): Promise<string> {
  const { baseUrl } = AI_CONFIG.ollama

  // Construire le prompt complet
  const prompt = messages
    .map((m) => {
      if (m.role === 'system') return `System: ${m.content}\n`
      if (m.role === 'user') return `User: ${m.content}\n`
      return `Assistant: ${m.content}\n`
    })
    .join('\n')

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      prompt,
      stream: false,
      options: {
        temperature: AI_CONFIG.temperature,
        num_predict: AI_CONFIG.maxTokens,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Ollama Error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.response
}

// ============================================
// SERVICE SIMULATION (Actuel)
// ============================================
export async function simulateAI(messages: AIMessage[]): Promise<string> {
  // Attendre un peu pour simuler le temps de réponse
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''
  const messageCount = messages.filter((m) => m.role === 'user').length

  // Salutations et premières interactions
  if (messageCount === 1 && (lastMessage.includes('bonjour') || lastMessage.includes('salut') || lastMessage.includes('coucou'))) {
    return "Bonjour ! Je suis ravie de vous accueillir. Comment vous sentez-vous aujourd'hui ? N'hésitez pas à partager ce qui vous préoccupe, je suis là pour vous écouter."
  }

  // Sentiments positifs
  if (lastMessage.includes('bien') || lastMessage.includes('mieux') || lastMessage.includes('content') || lastMessage.includes('heureux')) {
    return "C'est merveilleux d'entendre ça ! Les moments où l'on se sent bien sont précieux. Qu'est-ce qui vous fait du bien en ce moment ? Ces petites victoires méritent d'être célébrées. 💜"
  }

  if (lastMessage.includes('force') || lastMessage.includes('courage') || lastMessage.includes('j\'y arrive')) {
    return "Votre force est admirable. Reconnaître sa propre résilience est important. De quoi êtes-vous particulièrement fier·ère ces derniers temps ? Chaque pas compte, même les plus petits."
  }

  if (lastMessage.includes('espoir') || lastMessage.includes('positif') || lastMessage.includes('confiance')) {
    return "L'espoir est une ressource puissante. C'est formidable que vous puissiez le ressentir. Qu'est-ce qui nourrit cet espoir en vous ? Cultiver ces pensées positives peut faire une réelle différence."
  }

  // Émotions difficiles
  if (lastMessage.includes('peur') || lastMessage.includes('anxieux') || lastMessage.includes('angoisse') || lastMessage.includes('stress')) {
    return "Je comprends que la peur soit présente. C'est une réaction tout à fait normale face à l'incertitude. Voulez-vous me parler de ce qui vous inquiète le plus en ce moment ? Parfois, mettre des mots sur nos craintes aide à les apprivoiser."
  }

  if (lastMessage.includes('triste') || lastMessage.includes('déprim') || lastMessage.includes('moral') || lastMessage.includes('pleurer')) {
    return "La tristesse que vous ressentez est légitime. Pleurer ou se sentir triste ne signifie pas que vous êtes faible - au contraire, c'est une façon naturelle de traiter ce que vous vivez. Que pourriez-vous faire aujourd'hui qui vous apporterait un peu de réconfort ?"
  }

  if (lastMessage.includes('colère') || lastMessage.includes('injuste') || lastMessage.includes('énervé') || lastMessage.includes('en colère')) {
    return "La colère est une émotion compréhensible dans votre situation. C'est même sain de reconnaître cette frustration. Qu'est-ce qui vous met particulièrement en colère ? Comment pourriez-vous exprimer cette émotion de manière qui vous soulage ?"
  }

  if (lastMessage.includes('fatigué') || lastMessage.includes('épuisé') || lastMessage.includes('fatigue') || lastMessage.includes('crevé')) {
    return "La fatigue que vous décrivez est légitime. Votre corps et votre esprit traversent beaucoup. Avez-vous pu identifier des moments dans la journée où vous vous sentez un peu mieux ? Même de petites pauses peuvent aider à recharger vos batteries."
  }

  if (lastMessage.includes('seul') || lastMessage.includes('isolé') || lastMessage.includes('personne') || lastMessage.includes('solitude')) {
    return "Le sentiment d'isolement peut être très pesant. Sachez que vous n'êtes pas seul·e dans ce parcours, même si cela peut le sembler parfois. Y a-t-il quelqu'un dans votre entourage avec qui vous aimeriez partager davantage ? Je suis aussi là pour vous écouter."
  }

  if (lastMessage.includes('famille') || lastMessage.includes('proche') || lastMessage.includes('conjoint') || lastMessage.includes('enfant')) {
    return "Les relations avec les proches peuvent être complexes dans ces moments. Ils veulent souvent bien faire mais ne savent pas toujours comment. Qu'aimeriez-vous qu'ils comprennent mieux de ce que vous vivez ?"
  }

  if (lastMessage.includes('douleur') || lastMessage.includes('mal') || lastMessage.includes('souffre') || lastMessage.includes('souffrance')) {
    return "La douleur, qu'elle soit physique ou émotionnelle, mérite d'être prise au sérieux. Avez-vous pu en parler avec votre équipe médicale ? Il existe des solutions pour vous soulager. Sur le plan émotionnel, qu'est-ce qui vous aide habituellement à mieux vivre ces moments difficiles ?"
  }

  if (
    lastMessage.includes('mourir') ||
    lastMessage.includes('suicide') ||
    lastMessage.includes('en finir') ||
    lastMessage.includes('plus envie')
  ) {
    return "Je perçois une grande souffrance dans vos mots, et cela me touche. Votre vie a de la valeur. S'il vous plaît, contactez immédiatement le 3114 (gratuit, 24/7) ou rendez-vous aux urgences. Vous méritez une aide professionnelle immédiate. Pouvez-vous appeler quelqu'un de confiance maintenant ?"
  }

  if (lastMessage.includes('merci') || lastMessage.includes('aidé') || lastMessage.includes('reconnaissance')) {
    return "C'est moi qui vous remercie pour votre confiance. Partager ce que l'on ressent demande du courage. N'hésitez pas à revenir ici quand vous en ressentez le besoin. Je suis là pour vous."
  }

  // Questions sur le traitement
  if (lastMessage.includes('traitement') || lastMessage.includes('chimio') || lastMessage.includes('radiothérapie') || lastMessage.includes('médecin')) {
    return "Le parcours de traitement peut soulever beaucoup de questions et d'émotions. Comment vivez-vous cette étape ? N'hésitez pas à noter toutes vos questions pour votre prochain rendez-vous médical - aucune question n'est trop petite ou insignifiante."
  }

  // Sommeil et repos
  if (lastMessage.includes('dormir') || lastMessage.includes('sommeil') || lastMessage.includes('insomnie') || lastMessage.includes('nuit')) {
    return "Les troubles du sommeil sont fréquents et peuvent aggraver la fatigue. Avez-vous une routine de coucher apaisante ? Parfois, des exercices de relaxation ou limiter les écrans avant de dormir peut aider. Si cela persiste, parlez-en à votre médecin."
  }

  // Questions courtes ou messages vagues
  if (lastMessage.length < 15 && !lastMessage.includes('bien') && !lastMessage.includes('merci')) {
    const responses = [
      "Je suis là pour vous écouter. Prenez votre temps, il n'y a pas de pression.",
      "Voulez-vous me parler de ce qui vous traverse l'esprit ?",
      "Comment puis-je vous aider aujourd'hui ?",
      "Je vous écoute attentivement. Qu'aimeriez-vous partager ?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Réponses génériques variées (pour éviter la répétition)
  const genericResponses = [
    "Je vous écoute et je suis là pour vous. Ce que vous vivez a du sens et vos émotions sont légitimes. Pouvez-vous m'en dire un peu plus sur ce que vous ressentez en ce moment ? Je suis là pour vous accompagner à votre rythme.",
    "Merci de partager cela avec moi. Vos ressentis sont importants. Qu'est-ce qui vous pèse le plus aujourd'hui ?",
    "Je suis là pour vous écouter sans jugement. Comment vous sentez-vous par rapport à ce que vous venez de me dire ?",
    "Votre parole compte. Que ressentez-vous au plus profond de vous en ce moment ?",
    "Je perçois ce que vous me confiez. Comment puis-je vous accompagner au mieux aujourd'hui ?",
  ]
  
  return genericResponses[messageCount % genericResponses.length]
}

// ============================================
// ROUTEUR INTELLIGENT
// ============================================
export async function callAI(messages: AIMessage[]): Promise<AIResponse> {
  const { provider, model } = AI_CONFIG

  let message: string

  try {
    switch (provider) {
      case 'openai':
        message = await callOpenAI(messages)
        break

      case 'anthropic':
        message = await callAnthropic(messages)
        break

      case 'ollama':
        message = await callOllama(messages)
        break

      case 'simulation':
      default:
        message = await simulateAI(messages)
        break
    }

    return { message, provider, model }
  } catch (error) {
    console.error(`Error with ${provider}:`, error)
    
    // Fallback sur simulation en cas d'erreur
    if (provider !== 'simulation') {
      console.warn('Fallback sur mode simulation')
      message = await simulateAI(messages)
      return { message, provider: 'simulation (fallback)', model: 'simulation' }
    }
    
    throw error
  }
}
