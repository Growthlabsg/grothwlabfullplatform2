"use client"

import { useState, useEffect, ReactNode } from "react"
import { useLanguage } from "@/contexts/language-context"

interface TranslatableTextProps {
  children: string | ReactNode
  fallback?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  showOriginalOnHover?: boolean
}

export function TranslatableText({ 
  children, 
  fallback, 
  className = "",
  as: Component = "span",
  showOriginalOnHover = false
}: TranslatableTextProps) {
  const { language, translate, isTranslating } = useLanguage()
  const [translatedText, setTranslatedText] = useState<string>("")
  const [originalText, setOriginalText] = useState<string>("")
  const [isTranslated, setIsTranslated] = useState(false)

  // Extract text content from children
  const getTextContent = (children: string | ReactNode): string => {
    if (typeof children === "string") {
      return children
    }
    if (typeof children === "object" && children !== null) {
      // Handle React elements
      if ("props" in children && children.props?.children) {
        return getTextContent(children.props.children)
      }
    }
    return fallback || ""
  }

  // Translate text when language changes
  useEffect(() => {
    const text = getTextContent(children)
    if (!text || text.trim() === "") return

    console.log("TranslatableText: Starting translation", { text, language, isTranslating })
    setOriginalText(text)

    // Don't translate if language is English
    if (language === "en") {
      console.log("TranslatableText: Language is English, no translation needed")
      setTranslatedText(text)
      setIsTranslated(false)
      return
    }

    // Translate the text
    const performTranslation = async () => {
      try {
        console.log("TranslatableText: Calling translate function", { text, language })
        const result = await translate(text, language)
        console.log("TranslatableText: Translation result", { original: text, translated: result, language })
        setTranslatedText(result)
        setIsTranslated(true)
      } catch (error) {
        console.error("TranslatableText: Translation failed:", error)
        setTranslatedText(text) // Fallback to original
        setIsTranslated(false)
      }
    }

    performTranslation()
  }, [children, language, translate, fallback])

  // If no text content, render children as-is
  if (!getTextContent(children)) {
    return <Component className={className}>{children}</Component>
  }

  const displayText = translatedText || getTextContent(children)
  const isCurrentlyTranslating = isTranslating && !translatedText

  return (
    <Component 
      className={`${className} ${isCurrentlyTranslating ? 'opacity-70' : ''}`}
      title={showOriginalOnHover && isTranslated ? originalText : undefined}
    >
      {isCurrentlyTranslating ? (
        <>
          {getTextContent(children)}
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-1"></span>
        </>
      ) : (
        displayText
      )}
    </Component>
  )
}

// Higher-order component for translating entire components
export function withTranslation<P extends object>(
  Component: React.ComponentType<P>,
  textProps: (props: P) => Record<string, string> = () => ({})
) {
  return function TranslatedComponent(props: P) {
    const { language, translate } = useLanguage()
    const [translatedProps, setTranslatedProps] = useState<P>(props)

    useEffect(() => {
      const textToTranslate = textProps(props)
      if (!textToTranslate || Object.keys(textToTranslate).length === 0) return

      const translateProps = async () => {
        try {
          const translated: Record<string, string> = {}
          
          for (const [key, value] of Object.entries(textToTranslate)) {
            if (language === "en") {
              translated[key] = value
            } else {
              translated[key] = await translate(value, language)
            }
          }

          setTranslatedProps({
            ...props,
            ...translated
          })
        } catch (error) {
          console.error("Failed to translate component props:", error)
        }
      }

      translateProps()
    }, [props, language, translate])

    return <Component {...translatedProps} />
  }
}

// Hook for translating text with loading state
export function useTranslatableText(text: string) {
  const { language, translate, isTranslating } = useLanguage()
  const [translatedText, setTranslatedText] = useState(text)
  const [isTranslated, setIsTranslated] = useState(false)

  useEffect(() => {
    if (!text || language === "en") {
      setTranslatedText(text)
      setIsTranslated(false)
      return
    }

    const performTranslation = async () => {
      try {
        const result = await translate(text, language)
        setTranslatedText(result)
        setIsTranslated(true)
      } catch (error) {
        console.error("Translation failed:", error)
        setTranslatedText(text)
        setIsTranslated(false)
      }
    }

    performTranslation()
  }, [text, language, translate])

  return {
    text: translatedText,
    isTranslated,
    isTranslating,
    originalText: text
  }
}
