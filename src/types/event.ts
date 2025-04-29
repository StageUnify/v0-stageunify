export interface Event {
  id: string
  name: string
  date: string
  location: string
  organizer: string
  venueId: string
  venue?: {
    id: string
    name: string
  }
  companyEvents: Array<{
    id: string
    company: {
      id: string
      name: string
    }
  }>
  socioEvents: Array<{
    id: string
    socio: {
      id: string
      name: string
    }
  }>
} 