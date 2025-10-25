// Configuration centralisée pour l'IA Psychologue
// Modifiez ce fichier pour changer de provider sans toucher au code

export const AI_CONFIG = {
  // Provider actif : 'openai' | 'anthropic' | 'ollama' | 'simulation'
  provider: (process.env.AI_PROVIDER || 'simulation') as 'openai' | 'anthropic' | 'ollama' | 'simulation',
  
  // Modèle à utiliser
  model: process.env.AI_MODEL || 'simulation',
  
  // Paramètres de génération
  temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  maxTokens: parseInt(process.env.AI_MAX_TOKENS || '300'),
  
  // Clés API (automatiquement chargées depuis .env.local)
  apiKeys: {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
  },
  
  // Configuration Ollama local
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  },
}

// Vérification de la configuration
export function validateAIConfig() {
  const { provider, apiKeys } = AI_CONFIG
  
  if (provider === 'openai' && !apiKeys.openai) {
    console.warn('⚠️  OPENAI_API_KEY non configurée. Mode simulation activé.')
    return false
  }
  
  if (provider === 'anthropic' && !apiKeys.anthropic) {
    console.warn('⚠️  ANTHROPIC_API_KEY non configurée. Mode simulation activé.')
    return false
  }
  
  if (provider === 'ollama') {
    console.log('🦙 Ollama configuré sur:', AI_CONFIG.ollama.baseUrl)
  }
  
  return true
}

// Log de démarrage
if (process.env.NODE_ENV === 'development') {
  console.log('🤖 IA Psy Provider:', AI_CONFIG.provider)
  console.log('🎯 Modèle:', AI_CONFIG.model)
  validateAIConfig()
}
