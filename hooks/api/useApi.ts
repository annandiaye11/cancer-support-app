import { useState, useEffect } from 'react'

interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function useApi<T>(endpoint: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api${endpoint}`)
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint])

  return { data, loading, error, refetch: fetchData }
}

export function useArticles(params?: {
  category?: string
  featured?: boolean
  search?: string
  page?: number
  limit?: number
}) {
  const queryParams = new URLSearchParams()
  
  if (params?.category) queryParams.append('category', params.category)
  if (params?.featured) queryParams.append('featured', 'true')
  if (params?.search) queryParams.append('search', params.search)
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.limit) queryParams.append('limit', params.limit.toString())
  
  const endpoint = `/articles${queryParams.toString() ? `?${queryParams}` : ''}`
  
  return useApi<PaginatedResponse<any>>(endpoint)
}

export function useVideos(params?: {
  category?: string
  featured?: boolean
  page?: number
  limit?: number
}) {
  const queryParams = new URLSearchParams()
  
  if (params?.category) queryParams.append('category', params.category)
  if (params?.featured) queryParams.append('featured', 'true')
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.limit) queryParams.append('limit', params.limit.toString())
  
  const endpoint = `/videos${queryParams.toString() ? `?${queryParams}` : ''}`
  
  return useApi<PaginatedResponse<any>>(endpoint)
}

export function useAppointments(userId?: string, params?: {
  status?: string
  type?: string
  fromDate?: string
  toDate?: string
}) {
  const queryParams = new URLSearchParams()
  
  if (userId) queryParams.append('userId', userId)
  if (params?.status) queryParams.append('status', params.status)
  if (params?.type) queryParams.append('type', params.type)
  if (params?.fromDate) queryParams.append('fromDate', params.fromDate)
  if (params?.toDate) queryParams.append('toDate', params.toDate)
  
  const endpoint = `/appointments${queryParams.toString() ? `?${queryParams}` : ''}`
  
  return useApi<PaginatedResponse<any>>(endpoint)
}

// Hook pour les mutations (POST, PUT, DELETE)
export function useApiMutation<T>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = async (
    endpoint: string,
    method: 'POST' | 'PUT' | 'DELETE' = 'POST',
    data?: any
  ): Promise<T | null> => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(data && { body: JSON.stringify(data) })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
