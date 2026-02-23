import { useStorage } from "@vueuse/core";

export interface DevEvent {
  id: string
  title: string
  date: string
  priority: 'low' | 'medium' | 'high'
  locationType: 'online' | 'offline'
  description?: string
  status: 'upcoming' | 'completed'
}

export function useEvents() {
  const events = useStorage<DevEvent[]>('dev-events', [])

  const addEvent = (payload: Omit<DevEvent, 'id' | 'status'>) => {
    const newEvent: DevEvent = {
      ...payload,
      id: crypto.randomUUID(),
      status: 'upcoming'
    }
    events.value.push(newEvent)
  }

  const toggleStatus = (id: string) => {
    const event = events.value.find(e => e.id === id)
    if (event) {
      event.status = event.status === 'upcoming' ? 'completed' : 'upcoming'
    }
  }

  const deleteEvent = (id: string) => {
    events.value = events.value.filter(e => e.id !== id)
  }

  return { events, addEvent, toggleStatus, deleteEvent }
}