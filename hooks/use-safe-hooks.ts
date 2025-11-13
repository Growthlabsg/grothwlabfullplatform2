"use client"

import { useState, useEffect } from "react"

// Helper function to safely use hooks that might not be available
export function useSafeHook<T, F>(hookImport: string, hookName: string, fallbackValue: T, hookParams?: any[]): T {
  const [hookResult, setHookResult] = useState<T>(fallbackValue)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadHook() {
      try {
        // Dynamic import to avoid the error if the module doesn't exist
        const module = await import(`@/contexts/${hookImport}`)
        const hook = module[hookName]

        if (typeof hook === "function") {
          try {
            // Try to use the hook with the provided parameters
            const result = hookParams ? hook(...hookParams) : hook()
            setHookResult(result)
          } catch (err) {
            console.warn(`${hookName} failed to execute:`, err)
            setError(err instanceof Error ? err : new Error(String(err)))
          }
        } else {
          console.warn(`${hookName} is not a function in ${hookImport}`)
          setError(new Error(`${hookName} is not a function`))
        }
      } catch (err) {
        console.warn(`Failed to import ${hookImport}:`, err)
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    }

    loadHook()
  }, [hookImport, hookName, hookParams])

  return hookResult
}
