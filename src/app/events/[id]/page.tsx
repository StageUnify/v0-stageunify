'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Event {
  id: string
  name: string
  date: string
  location: string
  organizer: string
  venueId: string
  venue?: {
    name: string
  }
  companyEvents: Array<{
    id: string
    companyId: string
    company: {
      name: string
    }
    incomeAmount: number
    expenseAmount: number
    currency: string
    notes?: string
  }>
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`)
        if (!response.ok) {
          throw new Error('Error al cargar el evento')
        }
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || 'Evento no encontrado'}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
            <Link
              href={`/events/${event.id}/edit`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Editar Evento
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Detalles del Evento</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                  <dd className="text-base text-gray-900">
                    {new Date(event.date).toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Ubicación</dt>
                  <dd className="text-base text-gray-900">{event.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Organizador</dt>
                  <dd className="text-base text-gray-900">{event.organizer}</dd>
                </div>
                {event.venue && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Venue</dt>
                    <dd className="text-base text-gray-900">{event.venue.name}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Empresas Participantes</h2>
                <Link
                  href={`/company-events/${event.id}/new`}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Agregar Empresa
                </Link>
              </div>
              <div className="space-y-4">
                {event.companyEvents.length === 0 ? (
                  <p className="text-gray-500">No hay empresas participantes</p>
                ) : (
                  event.companyEvents.map((companyEvent) => (
                    <div
                      key={companyEvent.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {companyEvent.company.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Ingresos: {companyEvent.currency} {companyEvent.incomeAmount}
                          </p>
                          <p className="text-sm text-gray-500">
                            Gastos: {companyEvent.currency} {companyEvent.expenseAmount}
                          </p>
                          {companyEvent.notes && (
                            <p className="text-sm text-gray-600 mt-2">
                              {companyEvent.notes}
                            </p>
                          )}
                        </div>
                        <Link
                          href={`/company-events/${event.id}/${companyEvent.id}/edit`}
                          className="text-gray-500 hover:text-gray-600 text-sm font-medium"
                        >
                          Editar
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 