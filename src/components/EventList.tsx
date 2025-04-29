'use client'

import { useState, useEffect } from 'react'
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
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Error al cargar los eventos')
        }
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Eventos</h2>
        <Link
          href="/events/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Nuevo Evento
        </Link>
      </div>
      <div className="divide-y divide-gray-200">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay eventos registrados</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                  {event.venue && (
                    <p className="text-sm text-gray-600">Venue: {event.venue.name}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/events/${event.id}`}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    Ver detalles
                  </Link>
                  <Link
                    href={`/events/${event.id}/edit`}
                    className="text-gray-500 hover:text-gray-600 text-sm font-medium"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 