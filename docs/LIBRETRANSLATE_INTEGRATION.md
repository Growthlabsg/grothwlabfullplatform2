# LibreTranslate Integration for GrowthLab

This document describes the integration of LibreTranslate, a free and open-source machine translation API, into the GrowthLab application.

## 🌟 Overview

LibreTranslate provides machine translation capabilities for multiple languages, allowing GrowthLab to offer multilingual support without relying on proprietary services like Google Translate or Azure Translator.

## 🚀 Features

- **Multi-language Support**: Translate content into 10+ languages
- **Real-time Translation**: Instant translation of UI elements and content
- **Batch Translation**: Translate multiple texts simultaneously
- **HTML Translation**: Support for translating HTML content
- **Language Detection**: Automatic detection of source language
- **Caching**: Built-in caching for improved performance
- **Health Monitoring**: Service health checks and status indicators
- **Offline Capability**: Self-hosted solution for privacy and control

## 🏗️ Architecture

```
GrowthLab App → Language Context → LibreTranslate Service → LibreTranslate API
                ↓
            Translation Hooks → UI Components
```

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ and npm/yarn
- GrowthLab application running

## 🛠️ Installation

### 1. Quick Setup (Recommended)

```bash
# Run the automated setup script
./scripts/setup-libretranslate.sh
```

### 2. Manual Setup

```bash
# Start LibreTranslate service
docker-compose -f docker-compose.libretranslate.yml up -d

# Check service status
curl http://localhost:5000/languages
```

### 3. Environment Configuration

Add to your `.env` file:

```env
# LibreTranslate Configuration
NEXT_PUBLIC_LIBRETRANSLATE_URL="http://localhost:5000"
LIBRETRANSLATE_API_KEY="your-api-key-optional"
LIBRETRANSLATE_TIMEOUT="15000"
LIBRETRANSLATE_RETRIES="3"
```

## 🔧 Configuration

### LibreTranslate Service Options

The Docker Compose file includes these configurations:

- **Port**: 5000 (configurable)
- **Languages**: en, zh, es, fr, de, ja, ko, ar, hi, pt
- **Request Limit**: 1000 requests per hour
- **Character Limit**: 5000 characters per request
- **Debug Mode**: Enabled for development
- **Auto-update Models**: Enabled

### Customization

Edit `docker-compose.libretranslate.yml` to modify:

```yaml
environment:
  - LT_LOAD_ONLY=en,zh,es,fr,de,ja,ko,ar,hi,pt  # Add/remove languages
  - LT_REQ_LIMIT=1000                            # Request rate limit
  - LT_CHAR_LIMIT=5000                           # Character limit per request
  - LT_DEBUG=false                                # Disable debug in production
```

## 📚 Usage

### 1. Basic Translation Hook

```tsx
import { useTranslation } from '@/hooks/use-translation'

function MyComponent() {
  const { translate, isTranslating, error } = useTranslation()
  const [translatedText, setTranslatedText] = useState("")

  const handleTranslate = async () => {
    const result = await translate("Hello World", "zh")
    setTranslatedText(result)
  }

  return (
    <div>
      <button onClick={handleTranslate} disabled={isTranslating}>
        {isTranslating ? "Translating..." : "Translate"}
      </button>
      {translatedText && <p>{translatedText}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
```

### 2. Language Context Integration

```tsx
import { useLanguage } from '@/contexts/language-context'

function MyComponent() {
  const { 
    language, 
    setLanguage, 
    translate, 
    supportedLanguages,
    isTranslating 
  } = useLanguage()

  const handleLanguageChange = async (newLang: string) => {
    setLanguage(newLang)
    // Auto-translate content when language changes
    const translated = await translate("Welcome to GrowthLab")
    // Update your component state
  }

  return (
    <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
      {supportedLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name_local || lang.name}
        </option>
      ))}
    </select>
  )
}
```

### 3. Language Selector Component

```tsx
import { LanguageSelector } from '@/components/ui/language-selector'

function Header() {
  return (
    <header>
      <LanguageSelector variant="compact" showStatus={true} />
    </header>
  )
}
```

### 4. Translation Manager

```tsx
import { TranslationManager } from '@/components/ui/translation-manager'

function AdminPage() {
  return (
    <div>
      <h1>Translation Management</h1>
      <TranslationManager />
    </div>
  )
}
```

## 🌍 Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| en   | English  | English     |
| zh   | Chinese  | 中文        |
| es   | Spanish  | Español     |
| fr   | French   | Français    |
| de   | German   | Deutsch     |
| ja   | Japanese | 日本語      |
| ko   | Korean   | 한국어      |
| ar   | Arabic   | العربية     |
| hi   | Hindi    | हिन्दी      |
| pt   | Portuguese | Português  |

## 🔍 API Endpoints

### LibreTranslate API

- `GET /languages` - List supported languages
- `POST /translate` - Translate text
- `POST /detect` - Detect language
- `GET /docs` - API documentation

### GrowthLab Integration

- `useTranslation()` - React hook for translations
- `useLanguage()` - Enhanced language context
- `<LanguageSelector />` - Language selection component
- `<TranslationManager />` - Translation management interface

## 🚦 Service Management

### Start Service

```bash
docker-compose -f docker-compose.libretranslate.yml up -d
```

### Stop Service

```bash
docker-compose -f docker-compose.libretranslate.yml down
```

### View Logs

```bash
docker-compose -f docker-compose.libretranslate.yml logs -f
```

### Update Language Models

```bash
docker-compose -f docker-compose.libretranslate.yml exec libretranslate ltmanage --update-models
```

### Health Check

```bash
curl http://localhost:5000/languages
```

## 🧪 Testing

### 1. Test Service Health

```bash
# Check if service is running
curl -f http://localhost:5000/languages

# Test translation
curl -X POST http://localhost:5000/translate \
  -H "Content-Type: application/json" \
  -d '{"q":"Hello World","source":"en","target":"zh"}'
```

### 2. Test in GrowthLab

1. Start LibreTranslate service
2. Start GrowthLab development server
3. Navigate to any page
4. Change language using the language selector
5. Verify content is translated

### 3. Test Components

```tsx
// Test translation hook
const { translate, isTranslating } = useTranslation()
const result = await translate("Test message", "zh")
console.log("Translation result:", result)

// Test language context
const { language, setLanguage, supportedLanguages } = useLanguage()
console.log("Current language:", language)
console.log("Supported languages:", supportedLanguages)
```

## 🔧 Troubleshooting

### Common Issues

1. **Service Not Starting**
   ```bash
   # Check Docker logs
   docker-compose -f docker-compose.libretranslate.yml logs
   
   # Check port availability
   lsof -i :5000
   ```

2. **Translation Failures**
   - Verify service is running: `curl http://localhost:5000/languages`
   - Check environment variables in `.env`
   - Verify language codes are supported

3. **Performance Issues**
   - Check Docker resource usage: `docker stats`
   - Monitor translation cache: Use `getCacheStats()`
   - Consider increasing timeout values

4. **Language Model Issues**
   ```bash
   # Update models
   docker-compose -f docker-compose.libretranslate.yml exec libretranslate ltmanage --update-models
   
   # Check available models
   docker-compose -f docker-compose.libretranslate.yml exec libretranslate ls -la /home/libretranslate/.local/share/argos-translate
   ```

### Debug Mode

Enable debug logging in your `.env`:

```env
LIBRETRANSLATE_DEBUG=true
NODE_ENV=development
```

## 📊 Performance

### Caching

- Translation results are cached automatically
- Cache size and hit rate can be monitored
- Cache can be cleared manually if needed

### Optimization Tips

1. **Batch Translations**: Use `translateBatch()` for multiple texts
2. **Language Detection**: Avoid unnecessary language detection
3. **Error Handling**: Implement proper fallbacks
4. **Service Monitoring**: Regular health checks

## 🔒 Security

### API Keys (Optional)

```env
LIBRETRANSLATE_API_KEY="your-secret-key"
```

### Rate Limiting

- Default: 1000 requests per hour
- Configurable via environment variables
- Implement client-side rate limiting for production

### Privacy

- All translations happen locally
- No data sent to external services
- Full control over translation data

## 🚀 Production Deployment

### 1. Environment Variables

```env
NEXT_PUBLIC_LIBRETRANSLATE_URL="https://your-domain.com"
LIBRETRANSLATE_API_KEY="production-api-key"
NODE_ENV="production"
```

### 2. Docker Production

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  libretranslate:
    image: libretranslate/libretranslate:latest
    restart: always
    environment:
      - LT_DEBUG=false
      - LT_REQ_LIMIT=100
      - LT_CHAR_LIMIT=1000
    volumes:
      - ./models:/home/libretranslate/.local
      - ./data:/app/db
```

### 3. Load Balancing

For high-traffic applications, consider:
- Multiple LibreTranslate instances
- Load balancer configuration
- Health check endpoints
- Auto-scaling policies

## 📚 Additional Resources

- [LibreTranslate Documentation](https://docs.libretranslate.com/)
- [LibreTranslate GitHub](https://github.com/LibreTranslate/LibreTranslate)
- [Docker Hub Image](https://hub.docker.com/r/libretranslate/libretranslate)
- [API Reference](https://libretranslate.com/docs/)

## 🤝 Contributing

To contribute to the translation integration:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests
5. Submit a pull request

## 📄 License

This integration is part of GrowthLab and follows the same license terms. LibreTranslate is licensed under the GNU Affero General Public License v3.

## 🆘 Support

For issues with the translation integration:

1. Check the troubleshooting section
2. Review LibreTranslate documentation
3. Check GitHub issues
4. Contact the development team

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: GrowthLab Development Team
