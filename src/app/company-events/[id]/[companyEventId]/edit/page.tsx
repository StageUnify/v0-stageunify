'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CompanyEventFormData {
  companyId: string
  incomeAmount: number
  expenseAmount: number
  currency: string
  notes?: string
}

export default function EditCompanyEventPage({ 
  params 
}: { 
  params: { id: string, companyEventId: string } 
}) {
  const router = useRouter()
  const [formData, setFormData] = useState<CompanyEventFormData>({
    companyId: '',
    incomeAmount: 0,
    expenseAmount: 0,
    currency: 'ARS',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyEvent = async () => {
      try {
        const response = await fetch(`/api/company-events/${params.id}/${params.companyEventId}`)
        if (!response.ok) {
          throw new Error('Error al cargar el company event')
        }
        const data = await response.json()
        setFormData({
          companyId: data.companyId,
          incomeAmount: data.incomeAmount,
          expenseAmount: data.expenseAmount,
          currency: data.currency,
          notes: data.notes || ''
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      }
    }

    fetchCompanyEvent()
  }, [params.id, params.companyEventId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/company-events/${params.id}/${params.companyEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el company event')
      }

      router.push(`/events/${params.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Editar Empresa Participante</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">
                ID de la Empresa
              </label>
              <input
                type="text"
                id="companyId"
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="incomeAmount" className="block text-sm font-medium text-gray-700">
                Monto de Ingresos
              </label>
              <input
                type="number"
                id="incomeAmount"
                value={formData.incomeAmount}
                onChange={(e) => setFormData({ ...formData, incomeAmount: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="expenseAmount" className="block text-sm font-medium text-gray-700">
                Monto de Gastos
              </label>
              <input
                type="number"
                id="expenseAmount"
                value={formData.expenseAmount}
                onChange={(e) => setFormData({ ...formData, expenseAmount: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Moneda
              </label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notas
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 