import { env } from "./env"

/**
 * Interface for geolocation coordinates
 */
export interface Coordinates {
  latitude: number
  longitude: number
}

/**
 * Interface for location data
 */
export interface LocationData {
  coordinates: Coordinates
  address: string
  city: string
  country: string
  postalCode: string
}

/**
 * Geolocation service that uses the GEOLOCATION_API_KEY
 */
export class GeolocationService {
  private apiKey: string

  constructor() {
    // Uses the env utility to get the API key, which will use the mock value in development
    this.apiKey = env.geolocationApiKey
  }

  /**
   * Gets the current location based on IP address
   * @returns Promise with location data
   */
  async getCurrentLocation(): Promise<LocationData> {
    try {
      // In development with mock API key, return mock data
      if (env.isDevelopment() && this.apiKey === "mock-geolocation-api-key-for-development") {
        console.log("Using mock geolocation data")
        return this.getMockLocationData()
      }

      // Make the actual API call using the API key
      const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.apiKey}`)

      if (!response.ok) {
        throw new Error(`Geolocation API error: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        coordinates: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        address: data.address || "",
        city: data.city,
        country: data.country_name,
        postalCode: data.zipcode,
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error)
      return this.getMockLocationData()
    }
  }

  /**
   * Geocodes an address to get coordinates
   * @param address Address to geocode
   * @returns Promise with coordinates
   */
  async geocodeAddress(address: string): Promise<Coordinates> {
    try {
      // In development with mock API key, return mock data
      if (env.isDevelopment() && this.apiKey === "mock-geolocation-api-key-for-development") {
        console.log("Using mock geocoding data")
        return {
          latitude: 1.3521, // Singapore latitude
          longitude: 103.8198, // Singapore longitude
        }
      }

      // Make the actual API call using the API key
      const encodedAddress = encodeURIComponent(address)
      const response = await fetch(`https://api.geocodify.com/v2/geocode?api_key=${this.apiKey}&q=${encodedAddress}`)

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const location = (data.features[0] ? data.features[0].geometry : undefined)?.coordinates
        return {
          // GeoJSON returns [longitude, latitude]
          latitude: location[1],
          longitude: location[0],
        }
      }

      throw new Error("No geocoding results found")
    } catch (error) {
      console.error("Error geocoding address:", error)
      // Return Singapore coordinates as fallback
      return {
        latitude: 1.3521,
        longitude: 103.8198,
      }
    }
  }

  /**
   * Returns mock location data (Singapore)
   * @returns Mock location data
   */
  private getMockLocationData(): LocationData {
    return {
      coordinates: {
        latitude: 1.3521, // Singapore latitude
        longitude: 103.8198, // Singapore longitude
      },
      address: "1 Raffles Place",
      city: "Singapore",
      country: "Singapore",
      postalCode: "048616",
    }
  }
}

// Export a singleton instance
export const geolocationService = new GeolocationService()
