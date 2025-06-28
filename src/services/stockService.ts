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

export const fetchStocksByCompany = async (company: string): Promise<Stock[]> => {
  const response = await api.get('/stocks/filter', {
    params: { company }
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

