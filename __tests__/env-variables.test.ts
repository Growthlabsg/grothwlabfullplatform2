/**
 * Tests for environment variables handling
 */

import { getEnv, getBoolEnv, getNumEnv, getJsonEnv, env } from "../lib/env"
import { mockEnvVariables } from "../lib/mock-env-variables"

describe("Environment Variables", () => {
  // Save the original env
  const originalEnv = { ...process.env }

  beforeEach(() => {
    // Reset env between tests
    process.env = { ...originalEnv }
    // Make NODE_ENV writable for testing
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'test',
      writable: true,
      configurable: true
    })
  })

  afterAll(() => {
    // Restore original env after all tests
    process.env = originalEnv
  })

  describe("getEnv", () => {
    it("should return the value from process.env if it exists", () => {
      process.env.TEST_VAR = "test-value"
      expect(getEnv("TEST_VAR")).toBe("test-value")
    })

    it("should fall back to mock variables in development environment", () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true
      })
      expect(getEnv("JWT_SECRET")).toBe(mockEnvVariables.JWT_SECRET)
    })

    it("should fall back to mock variables in test environment", () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        writable: true,
        configurable: true
      })
      expect(getEnv("JWT_SECRET")).toBe(mockEnvVariables.JWT_SECRET)
    })

    it("should return the fallback value when provided", () => {
      expect(getEnv("NONEXISTENT_VAR", "fallback")).toBe("fallback")
    })

    it("should return empty string when no value or fallback exists", () => {
      expect(getEnv("NONEXISTENT_VAR")).toBe("")
    })

    it("should throw an error for required variables that are not set", () => {
      expect(() => getEnv("NONEXISTENT_VAR", undefined, true)).toThrow()
    })
  })

  describe("getBoolEnv", () => {
    it('should convert "true" to boolean true', () => {
      process.env.BOOL_TRUE = "true"
      expect(getBoolEnv("BOOL_TRUE")).toBe(true)
    })

    it('should convert "1" to boolean true', () => {
      process.env.BOOL_ONE = "1"
      expect(getBoolEnv("BOOL_ONE")).toBe(true)
    })

    it('should convert "yes" to boolean true', () => {
      process.env.BOOL_YES = "yes"
      expect(getBoolEnv("BOOL_YES")).toBe(true)
    })

    it('should convert "on" to boolean true', () => {
      process.env.BOOL_ON = "on"
      expect(getBoolEnv("BOOL_ON")).toBe(true)
    })

    it("should convert other values to boolean false", () => {
      process.env.BOOL_FALSE = "false"
      expect(getBoolEnv("BOOL_FALSE")).toBe(false)
    })

    it("should use the default value when not set", () => {
      expect(getBoolEnv("NONEXISTENT_BOOL", true)).toBe(true)
    })
  })

  describe("getNumEnv", () => {
    it("should convert string numbers to actual numbers", () => {
      process.env.NUM_VAR = "42"
      expect(getNumEnv("NUM_VAR")).toBe(42)
    })

    it("should return the default value for invalid numbers", () => {
      process.env.INVALID_NUM = "not-a-number"
      expect(getNumEnv("INVALID_NUM", 100)).toBe(100)
    })

    it("should use the default value when not set", () => {
      expect(getNumEnv("NONEXISTENT_NUM", 99)).toBe(99)
    })
  })

  describe("getJsonEnv", () => {
    it("should parse valid JSON strings", () => {
      process.env.JSON_VAR = '{"key":"value"}'
      expect(getJsonEnv("JSON_VAR", {})).toEqual({ key: "value" })
    })

    it("should return the default value for invalid JSON", () => {
      process.env.INVALID_JSON = "{not-valid-json}"
      const defaultObj = { default: true }
      expect(getJsonEnv("INVALID_JSON", defaultObj)).toBe(defaultObj)
    })

    it("should use the default value when not set", () => {
      const defaultArr = [1, 2, 3]
      expect(getJsonEnv("NONEXISTENT_JSON", defaultArr)).toBe(defaultArr)
    })
  })

  describe("env object", () => {
    it("should provide access to environment variables", () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true
      })
      expect(env.nodeEnv).toBe("development")
    })

    it("should check if environment is production", () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true
      })
      expect(env.isProduction()).toBe(true)

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true
      })
      expect(env.isProduction()).toBe(false)
    })

    it("should check if environment is development", () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true
      })
      expect(env.isDevelopment()).toBe(true)

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true
      })
      expect(env.isDevelopment()).toBe(false)
    })

    it("should check if environment is test", () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        writable: true,
        configurable: true
      })
      expect(env.isTest()).toBe(true)

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true
      })
      expect(env.isTest()).toBe(false)
    })
  })
})
