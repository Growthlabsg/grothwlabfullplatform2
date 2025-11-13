export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  capabilities: string[]
  maxTokens: number
  costPerToken: number
  isActive: boolean
  apiKey?: string
  baseUrl?: string
  modelVersion?: string
}

export interface AIProvider {
  id: string
  name: string
  description: string
  logo: string
  models: AIModel[]
  isConfigured: boolean
  apiKey?: string
  baseUrl?: string
}

export interface AIConfig {
  providers: AIProvider[]
  defaultProvider: string
  globalSettings: {
    enableAI: boolean
    maxTokens: number
    temperature: number
    timeout: number
  }
}

// Default AI Providers Configuration
export const defaultAIProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Advanced AI models including GPT-4, GPT-3.5, and DALL-E',
    logo: '/ai-providers/openai.svg',
    isConfigured: false,
    models: [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        provider: 'openai',
        description: 'Most capable GPT model for complex reasoning tasks',
        capabilities: ['text-generation', 'code-generation', 'analysis', 'creative-writing'],
        maxTokens: 8192,
        costPerToken: 0.00003,
        isActive: true
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'openai',
        description: 'Fast and efficient model for most tasks',
        capabilities: ['text-generation', 'code-generation', 'analysis'],
        maxTokens: 4096,
        costPerToken: 0.000002,
        isActive: true
      },
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'openai',
        description: 'Latest GPT-4 model with improved performance',
        capabilities: ['text-generation', 'code-generation', 'analysis', 'creative-writing'],
        maxTokens: 128000,
        costPerToken: 0.00001,
        isActive: true
      }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Constitutional AI focused on safety and helpfulness',
    logo: '/ai-providers/anthropic.svg',
    isConfigured: false,
    models: [
      {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'anthropic',
        description: 'Most capable Claude model for complex tasks',
        capabilities: ['text-generation', 'analysis', 'creative-writing', 'reasoning'],
        maxTokens: 200000,
        costPerToken: 0.000015,
        isActive: true
      },
      {
        id: 'claude-3-sonnet',
        name: 'Claude 3 Sonnet',
        provider: 'anthropic',
        description: 'Balanced performance and cost model',
        capabilities: ['text-generation', 'analysis', 'creative-writing'],
        maxTokens: 200000,
        costPerToken: 0.000003,
        isActive: true
      },
      {
        id: 'claude-3-haiku',
        name: 'Claude 3 Haiku',
        provider: 'anthropic',
        description: 'Fast and efficient model for simple tasks',
        capabilities: ['text-generation', 'analysis'],
        maxTokens: 200000,
        costPerToken: 0.00000025,
        isActive: true
      }
    ]
  },
  {
    id: 'google',
    name: 'Google Gemini',
    description: 'Google\'s most capable AI model for complex reasoning',
    logo: '/ai-providers/google.svg',
    isConfigured: false,
    models: [
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        provider: 'google',
        description: 'Most capable Gemini model for text generation',
        capabilities: ['text-generation', 'code-generation', 'analysis', 'creative-writing'],
        maxTokens: 30720,
        costPerToken: 0.0000005,
        isActive: true
      },
      {
        id: 'gemini-pro-vision',
        name: 'Gemini Pro Vision',
        provider: 'google',
        description: 'Multimodal model for text and image understanding',
        capabilities: ['text-generation', 'image-analysis', 'code-generation'],
        maxTokens: 30720,
        costPerToken: 0.0000005,
        isActive: true
      }
    ]
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI-powered search and answer engine',
    logo: '/ai-providers/perplexity.svg',
    isConfigured: false,
    models: [
      {
        id: 'llama-3.1-sonar-small-128k-online',
        name: 'Sonar Small Online',
        provider: 'perplexity',
        description: 'Fast online model for real-time information',
        capabilities: ['text-generation', 'web-search', 'analysis'],
        maxTokens: 128000,
        costPerToken: 0.0000001,
        isActive: true
      },
      {
        id: 'llama-3.1-sonar-small-128k',
        name: 'Sonar Small',
        provider: 'perplexity',
        description: 'Fast offline model for general tasks',
        capabilities: ['text-generation', 'analysis'],
        maxTokens: 128000,
        costPerToken: 0.0000001,
        isActive: true
      }
    ]
  },
  {
    id: 'xai',
    name: 'xAI Grok',
    description: 'xAI\'s conversational AI model',
    logo: '/ai-providers/xai.svg',
    isConfigured: false,
    models: [
      {
        id: 'grok-beta',
        name: 'Grok Beta',
        provider: 'xai',
        description: 'xAI\'s conversational AI model',
        capabilities: ['text-generation', 'conversation', 'analysis'],
        maxTokens: 8192,
        costPerToken: 0.000001,
        isActive: true
      }
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'High-performance open models',
    logo: '/ai-providers/mistral.svg',
    isConfigured: false,
    models: [
      {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        provider: 'mistral',
        description: 'Most capable Mistral model',
        capabilities: ['text-generation', 'code-generation', 'analysis'],
        maxTokens: 32768,
        costPerToken: 0.000007,
        isActive: true
      },
      {
        id: 'mistral-medium-latest',
        name: 'Mistral Medium',
        provider: 'mistral',
        description: 'Balanced performance and cost',
        capabilities: ['text-generation', 'code-generation', 'analysis'],
        maxTokens: 32768,
        costPerToken: 0.0000024,
        isActive: true
      }
    ]
  }
]

export const defaultAIConfig: AIConfig = {
  providers: defaultAIProviders,
  defaultProvider: 'openai',
  globalSettings: {
    enableAI: true,
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 30000
  }
}

// AI Service Functions
export class AIService {
  private config: AIConfig

  constructor(config: AIConfig = defaultAIConfig) {
    this.config = config
  }

  async generateContent(
    prompt: string,
    modelId?: string,
    options?: {
      maxTokens?: number
      temperature?: number
      systemPrompt?: string
    }
  ): Promise<string> {
    const model = this.getModel(modelId)
    if (!model || !model.isActive) {
      throw new Error('Model not available or inactive')
    }

    const provider = this.getProvider(model.provider)
    if (!provider || !provider.isConfigured) {
      throw new Error('Provider not configured')
    }

    // Simulate AI response based on model
    return this.simulateAIResponse(prompt, model, options)
  }

  private getModel(modelId?: string): AIModel | undefined {
    const targetModelId = modelId || this.getDefaultModelId()
    for (const provider of this.config.providers) {
      const model = provider.models.find(m => m.id === targetModelId)
      if (model) return model
    }
    return undefined
  }

  private getProvider(providerId: string): AIProvider | undefined {
    return this.config.providers.find(p => p.id === providerId)
  }

  private getDefaultModelId(): string {
    const defaultProvider = this.config.providers.find(p => p.id === this.config.defaultProvider)
    return defaultProvider?.models.find(m => m.isActive)?.id || 'gpt-3.5-turbo'
  }

  private simulateAIResponse(
    prompt: string,
    model: AIModel,
    options?: {
      maxTokens?: number
      temperature?: number
      systemPrompt?: string
    }
  ): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses: { [key: string]: string } = {
          'gpt-4': `[GPT-4 Response] ${prompt}\n\nHere's a comprehensive analysis based on your request...`,
          'gpt-3.5-turbo': `[GPT-3.5 Response] ${prompt}\n\nHere's a detailed response to your query...`,
          'claude-3-opus': `[Claude 3 Opus Response] ${prompt}\n\nBased on your request, here's my analysis...`,
          'gemini-pro': `[Gemini Pro Response] ${prompt}\n\nHere's what I understand and my recommendations...`,
          'grok-beta': `[Grok Response] ${prompt}\n\nLet me help you with that...`,
          'mistral-large-latest': `[Mistral Large Response] ${prompt}\n\nHere's my analysis and suggestions...`
        }
        
        const response = responses[model.id] || `[${model.name} Response] ${prompt}\n\nHere's my response to your request...`
        resolve(response)
      }, 1000 + Math.random() * 2000) // Simulate variable response time
    })
  }

  // Configuration management
  updateProvider(providerId: string, updates: Partial<AIProvider>): void {
    const providerIndex = this.config.providers.findIndex(p => p.id === providerId)
    if (providerIndex !== -1) {
      this.config.providers[providerIndex] = {
        ...this.config.providers[providerIndex],
        ...updates
      }
    }
  }

  updateModel(providerId: string, modelId: string, updates: Partial<AIModel>): void {
    const provider = this.config.providers.find(p => p.id === providerId)
    if (provider) {
      const modelIndex = provider.models.findIndex(m => m.id === modelId)
      if (modelIndex !== -1) {
        provider.models[modelIndex] = {
          ...provider.models[modelIndex],
          ...updates
        }
      }
    }
  }

  getConfig(): AIConfig {
    return this.config
  }

  setConfig(config: AIConfig): void {
    this.config = config
  }
}

// Global AI service instance
export const aiService = new AIService() 