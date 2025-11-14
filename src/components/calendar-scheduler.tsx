'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

interface CalendarSchedulerProps {
  onBooking?: (data: BookingData) => void
}

interface BookingData {
  date: Date
  time: string
  name: string
  email: string
  notes?: string
}

const AVAILABLE_TIMES = [
  '10:00 AM', '10:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
]

export default function CalendarScheduler({ onBooking }: CalendarSchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<'calendar' | 'time' | 'details'>('calendar')
  const [formData, setFormData] = useState({ name: '', email: '', notes: '' })

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6 // Exclude weekends
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep('time')
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep('details')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDate && selectedTime) {
      const bookingData: BookingData = {
        date: selectedDate,
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        notes: formData.notes
      }
      onBooking?.(bookingData)
      alert(`Booking confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}`)
      // Reset
      setStep('calendar')
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({ name: '', email: '', notes: '' })
    }
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="text-white">
      {step === 'calendar' && (
        <div>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">{formatMonth(currentDate)}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm text-white/60 font-semibold py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              const isAvailable = isDateAvailable(date)
              const isToday = date && date.toDateString() === new Date().toDateString()

              return (
                <button
                  key={index}
                  onClick={() => date && isAvailable && handleDateSelect(date)}
                  disabled={!date || !isAvailable}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all
                    ${!date ? 'invisible' : ''}
                    ${isAvailable
                      ? 'bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer'
                      : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
                    }
                    ${isToday ? 'ring-2 ring-yellow-500' : ''}
                  `}
                >
                  {date?.getDate()}
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-sm text-white/60 text-center">
            Select a date to view available times
          </p>
        </div>
      )}

      {step === 'time' && selectedDate && (
        <div>
          <button
            onClick={() => setStep('calendar')}
            className="mb-4 text-sm text-white/70 hover:text-white transition-colors"
          >
            ← Back to calendar
          </button>

          <h3 className="text-2xl font-bold mb-2">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </h3>
          <p className="text-white/60 mb-6">Select a time slot (Eastern Time)</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
            {AVAILABLE_TIMES.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className="p-4 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'details' && selectedDate && selectedTime && (
        <div>
          <button
            onClick={() => setStep('time')}
            className="mb-4 text-sm text-white/70 hover:text-white transition-colors"
          >
            ← Back to time selection
          </button>

          <h3 className="text-2xl font-bold mb-2">Confirm Your Booking</h3>
          <div className="mb-6 p-4 rounded-lg bg-white/10 border border-white/20">
            <p className="text-white/80">
              <strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <p className="text-white/80 mt-1">
              <strong>Time:</strong> {selectedTime} (Eastern Time)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="booking-name" className="block text-sm font-semibold mb-2">
                Name *
              </label>
              <input
                type="text"
                id="booking-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors text-white placeholder:text-white/40"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="booking-email" className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="booking-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors text-white placeholder:text-white/40"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-sm font-semibold mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors resize-none text-white placeholder:text-white/40"
                placeholder="Anything we should know?"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
