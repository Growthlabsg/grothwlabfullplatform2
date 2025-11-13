import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, maxTokens, temperature, apiKey, service = 'openai' } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    let generatedContent = ""
    let cost = 0

    switch (service) {
      case 'openai':
        if (!apiKey) {
          return NextResponse.json(
            { error: 'OpenAI API key is required' },
            { status: 400 }
          )
        }
        
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: model || 'gpt-4',
              messages: [
                {
                  role: 'system',
                  content: 'You are an expert social media content creator specializing in startup and business content. Create engaging, informative, and shareable posts that encourage interaction and provide value to entrepreneurs and business professionals.'
                },
                {
                  role: 'user',
                  content: prompt
                }
              ],
              max_tokens: maxTokens || 500,
              temperature: temperature || 0.7,
            }),
          })

          if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`)
          }

          const data = await response.json()
          generatedContent = data.choices[0]?.message?.content || ''
          
          // Calculate cost based on tokens used
          const tokensUsed = data.usage?.total_tokens || 0
          cost = (tokensUsed / 1000) * 0.03 // Approximate cost for GPT-4
        } catch (error) {
          console.error('OpenAI API error:', error)
          return NextResponse.json(
            { error: 'Failed to generate content with OpenAI' },
            { status: 500 }
          )
        }
        break

      case 'grok':
        // Mock Grok API integration - replace with actual Grok API when available
        generatedContent = `🚀 ${prompt.split(' ').slice(0, 10).join(' ')}...\n\nThis is a mock response from Grok AI. In production, this would integrate with the actual Grok API to generate engaging content based on your prompt.\n\nKey points:\n• AI-powered content generation\n• Industry-specific insights\n• Engagement optimization\n• Trending topic integration\n\n#AI #Innovation #Startup #Growth`
        cost = 0.01
        break

      case 'anthropic':
        // Mock Anthropic Claude API integration - replace with actual Claude API
        generatedContent = `💡 ${prompt.split(' ').slice(0, 10).join(' ')}...\n\nThis is a mock response from Anthropic Claude. In production, this would integrate with the actual Claude API to generate thoughtful, engaging content based on your prompt.\n\nInsights:\n• Strategic business thinking\n• Data-driven analysis\n• Actionable recommendations\n• Professional tone\n\n#Business #Strategy #Innovation #Success`
        cost = 0.015
        break

      default:
        return NextResponse.json(
          { error: 'Unsupported AI service' },
          { status: 400 }
        )
    }

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      content: generatedContent,
      cost: cost.toFixed(4),
      model: model || 'unknown',
      service,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI post generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
