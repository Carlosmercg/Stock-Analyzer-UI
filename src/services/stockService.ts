// services/stockService.ts
import axios from 'axios'
import type { Stock } from '../types/Stock'

const api = axios.create({
  baseURL: 'http://localhost:8085/api',
})

export const fetchStocks = async (
  page: number = 1,
  limit: number = 21
): Promise<{ data: Stock[]; total: number }> => {
  const response = await api.get('/stocks/', {
    params: { page, limit },
  })
  return response.data
}

export const fetchFilteredStocks = async (
  filters: {
    company?: string
    ticker?: string
    brokerage?: string
    rating_to?: string
    order?: 'asc' | 'desc' 
  },
  page: number = 1,
  limit: number = 21
): Promise<{ data: Stock[]; total: number }> => {
  const response = await api.get('/stocks/filter', {
    params: { ...filters, page, limit },
  })
  return response.data
}

export const fetchTopStocks = async (): Promise<Stock[]> => {
  const response = await api.get('/stocks/top')
  return response.data
}

export const fetchTopByBrokerage = async (brokerage: string) => {
  const response = await fetch(`http://localhost:8085/api/stocks/top-by-brokerage?brokerage=${encodeURIComponent(brokerage)}`)
  const data = await response.json()
  return data
}

export async function fetchBrokerages(): Promise<string[]> {
  const response = await api.get('/stocks/brokerages')
  return response.data
}

export async function fetchRatings(): Promise<string[]> {
  const response = await api.get('/stocks/ratings')
  return response.data
}