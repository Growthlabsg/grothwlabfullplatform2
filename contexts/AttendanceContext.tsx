"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AttendanceRecord {
  id: string
  eventId: number
  userId: string
  userName: string
  userEmail: string
  checkInTime: string
  checkOutTime?: string
  status: 'checked-in' | 'checked-out' | 'no-show'
  qrCode: string
  profile: {
    name: string
    title: string
    company: string
    avatar: string
    bio: string
    socialLinks: {
      linkedin?: string
      twitter?: string
      github?: string
    }
  }
}

interface DemeritRecord {
  id: string
  userId: string
  eventId: number
  eventTitle: string
  date: string
  points: number
  reason: 'no-show' | 'late-cancellation' | 'inappropriate-behavior'
  status: 'active' | 'appealed' | 'resolved'
}

interface VirtualNameCard {
  id: string
  fromUserId: string
  toUserId: string
  fromUserName: string
  toUserName: string
  eventId: number
  eventTitle: string
  meetingDate: string
  meetingTime: string
  photo?: string
  notes?: string
  connectionStatus: 'pending' | 'accepted' | 'declined'
}

interface AttendanceContextType {
  attendanceRecords: AttendanceRecord[]
  demeritRecords: DemeritRecord[]
  virtualNameCards: VirtualNameCard[]
  userDemeritPoints: number
  isRestricted: boolean
  
  // Attendance functions
  checkInUser: (eventId: number, qrCode: string) => Promise<boolean>
  checkOutUser: (eventId: number, userId: string) => Promise<boolean>
  markNoShow: (eventId: number, userId: string) => Promise<void>
  getEventAttendance: (eventId: number) => AttendanceRecord[]
  
  // Demerit functions
  addDemeritPoints: (userId: string, eventId: number, reason: string) => Promise<void>
  getDemeritHistory: (userId: string) => DemeritRecord[]
  appealDemerit: (demeritId: string, reason: string) => Promise<boolean>
  
  // Virtual name card functions
  createVirtualNameCard: (toUserId: string, eventId: number, photo?: string, notes?: string) => Promise<boolean>
  acceptNameCard: (cardId: string) => Promise<boolean>
  declineNameCard: (cardId: string) => Promise<boolean>
  getMyNameCards: () => VirtualNameCard[]
  getReceivedNameCards: () => VirtualNameCard[]
  
  // QR Code functions
  generateQRCode: (userId: string, eventId?: number) => string
  scanQRCode: (qrCode: string) => { userId: string; eventId?: number } | null
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [demeritRecords, setDemeritRecords] = useState<DemeritRecord[]>([])
  const [virtualNameCards, setVirtualNameCards] = useState<VirtualNameCard[]>([])
  const [userDemeritPoints, setUserDemeritPoints] = useState(0)
  const [isRestricted, setIsRestricted] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const attendance = localStorage.getItem('attendanceRecords')
      const demerits = localStorage.getItem('demeritRecords')
      const nameCards = localStorage.getItem('virtualNameCards')
      const userPoints = localStorage.getItem('userDemeritPoints')

      if (attendance) setAttendanceRecords(JSON.parse(attendance))
      if (demerits) setDemeritRecords(JSON.parse(demerits))
      if (nameCards) setVirtualNameCards(JSON.parse(nameCards))
      if (userPoints) {
        const points = parseInt(userPoints)
        setUserDemeritPoints(points)
        setIsRestricted(points >= 10) // Restrict after 10 demerit points
      }
    }

    loadData()
  }, [])

  // Save data to localStorage
  const saveAttendanceRecords = (records: AttendanceRecord[]) => {
    setAttendanceRecords(records)
    localStorage.setItem('attendanceRecords', JSON.stringify(records))
  }

  const saveDemeritRecords = (records: DemeritRecord[]) => {
    setDemeritRecords(records)
    localStorage.setItem('demeritRecords', JSON.stringify(records))
  }

  const saveVirtualNameCards = (cards: VirtualNameCard[]) => {
    setVirtualNameCards(cards)
    localStorage.setItem('virtualNameCards', JSON.stringify(cards))
  }

  const saveUserDemeritPoints = (points: number) => {
    setUserDemeritPoints(points)
    setIsRestricted(points >= 10)
    localStorage.setItem('userDemeritPoints', points.toString())
  }

  // Attendance functions
  const checkInUser = async (eventId: number, qrCode: string): Promise<boolean> => {
    try {
      const qrData = scanQRCode(qrCode)
      if (!qrData) return false

      const { userId, eventId: qrEventId } = qrData
      
      // If QR code has a specific event ID, validate it matches
      if (qrEventId && qrEventId !== eventId) {
        console.log('QR code is for a different event')
        return false
      }
      const now = new Date().toISOString()

      // Check if user is already checked in
      const existingRecord = attendanceRecords.find(
        record => record.eventId === eventId && record.userId === userId && record.status === 'checked-in'
      )

      if (existingRecord) return false

      // Create new attendance record
      const newRecord: AttendanceRecord = {
        id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        eventId,
        userId,
        userName: `User ${userId.slice(-4)}`, // Mock user name
        userEmail: `user${userId.slice(-4)}@example.com`, // Mock email
        checkInTime: now,
        status: 'checked-in',
        qrCode,
        profile: {
          name: `User ${userId.slice(-4)}`,
          title: 'Attendee',
          company: 'GrowthLab Community',
          avatar: '/default-avatar.png',
          bio: 'Event attendee',
          socialLinks: {}
        }
      }

      const updatedRecords = [...attendanceRecords, newRecord]
      saveAttendanceRecords(updatedRecords)

      // Send email notification
      await sendEmailNotification('check-in', {
        eventId,
        userId,
        userName: newRecord.userName,
        userEmail: newRecord.userEmail,
        checkInTime: now
      })

      return true
    } catch (error) {
      console.error('Error checking in user:', error)
      return false
    }
  }

  const checkOutUser = async (eventId: number, userId: string): Promise<boolean> => {
    try {
      const recordIndex = attendanceRecords.findIndex(
        record => record.eventId === eventId && record.userId === userId && record.status === 'checked-in'
      )

      if (recordIndex === -1) return false

      const updatedRecords = [...attendanceRecords]
      const record = updatedRecords[recordIndex]
      if (record) {
        updatedRecords[recordIndex] = {
          ...record,
          checkOutTime: new Date().toISOString(),
          status: 'checked-out'
        }
      }

      saveAttendanceRecords(updatedRecords)

      // Send email notification
      if (record) {
        await sendEmailNotification('check-out', {
          eventId,
          userId,
          userName: record.userName,
          userEmail: record.userEmail,
          checkOutTime: record.checkOutTime || new Date().toISOString()
        })
      }

      return true
    } catch (error) {
      console.error('Error checking out user:', error)
      return false
    }
  }

  const markNoShow = async (eventId: number, userId: string): Promise<void> => {
    // Add demerit points for no-show
    await addDemeritPoints(userId, eventId, 'no-show')
  }

  const getEventAttendance = (eventId: number): AttendanceRecord[] => {
    return attendanceRecords.filter(record => record.eventId === eventId)
  }

  // Demerit functions
  const addDemeritPoints = async (userId: string, eventId: number, reason: string): Promise<void> => {
    const points = reason === 'no-show' ? 3 : reason === 'late-cancellation' ? 2 : 1
    const newDemerit: DemeritRecord = {
      id: `dem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      eventId,
      eventTitle: `Event ${eventId}`, // Mock event title
      date: new Date().toISOString(),
      points,
      reason: reason as 'no-show' | 'late-cancellation' | 'inappropriate-behavior',
      status: 'active'
    }

    const updatedDemerits = [...demeritRecords, newDemerit]
    saveDemeritRecords(updatedDemerits)

    // Update user's total demerit points
    const userDemerits = updatedDemerits.filter(d => d.userId === userId && d.status === 'active')
    const totalPoints = userDemerits.reduce((sum, d) => sum + d.points, 0)
    saveUserDemeritPoints(totalPoints)

    // Send email notification
    await sendEmailNotification('demerit-added', {
      userId,
      eventId,
      points,
      reason,
      totalPoints
    })
  }

  const getDemeritHistory = (userId: string): DemeritRecord[] => {
    return demeritRecords.filter(record => record.userId === userId)
  }

  const appealDemerit = async (demeritId: string, reason: string): Promise<boolean> => {
    try {
    const updatedDemerits = demeritRecords.map(record =>
      record.id === demeritId ? { ...record, status: 'appealed' as const } : record
    )
      saveDemeritRecords(updatedDemerits)

      // Send email notification
      await sendEmailNotification('demerit-appeal', {
        demeritId,
        reason
      })

      return true
    } catch (error) {
      console.error('Error appealing demerit:', error)
      return false
    }
  }

  // Virtual name card functions
  const createVirtualNameCard = async (toUserId: string, eventId: number, photo?: string, notes?: string): Promise<boolean> => {
    try {
    const newCard: VirtualNameCard = {
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fromUserId: 'current-user', // Mock current user ID
      toUserId,
      fromUserName: 'Current User', // Mock current user name
      toUserName: `User ${toUserId.slice(-4)}`, // Mock target user name
      eventId,
      eventTitle: `Event ${eventId}`, // Mock event title
      meetingDate: new Date().toISOString().split('T')[0] || '',
      meetingTime: new Date().toLocaleTimeString(),
      photo,
      notes,
      connectionStatus: 'pending' as const
    }

      const updatedCards = [...virtualNameCards, newCard]
      saveVirtualNameCards(updatedCards)

      // Send email notification
      await sendEmailNotification('name-card-created', {
        toUserId,
        eventId,
        fromUserName: newCard.fromUserName
      })

      return true
    } catch (error) {
      console.error('Error creating virtual name card:', error)
      return false
    }
  }

  const acceptNameCard = async (cardId: string): Promise<boolean> => {
    try {
    const updatedCards = virtualNameCards.map(card =>
      card.id === cardId ? { ...card, connectionStatus: 'accepted' as const } : card
    )
      saveVirtualNameCards(updatedCards)

      // Send email notification
      await sendEmailNotification('name-card-accepted', {
        cardId
      })

      return true
    } catch (error) {
      console.error('Error accepting name card:', error)
      return false
    }
  }

  const declineNameCard = async (cardId: string): Promise<boolean> => {
    try {
    const updatedCards = virtualNameCards.map(card =>
      card.id === cardId ? { ...card, connectionStatus: 'declined' as const } : card
    )
      saveVirtualNameCards(updatedCards)

      return true
    } catch (error) {
      console.error('Error declining name card:', error)
      return false
    }
  }

  const getMyNameCards = (): VirtualNameCard[] => {
    return virtualNameCards.filter(card => card.fromUserId === 'current-user')
  }

  const getReceivedNameCards = (): VirtualNameCard[] => {
    return virtualNameCards.filter(card => card.toUserId === 'current-user')
  }

  // Unified QR Code functions
  const generateQRCode = (userId: string, eventId?: number): string => {
    // Generate unified QR code that works for all purposes
    return JSON.stringify({
      type: "unified",
      userId: userId,
      profileUrl: `${window.location.origin}/profile`,
      settingsUrl: `${window.location.origin}/settings/profile`,
      eventId: eventId || null,
      timestamp: Date.now()
    })
  }

  const scanQRCode = (qrCode: string): { userId: string; eventId?: number } | null => {
    try {
      // Try to parse as JSON first (unified QR code)
      const parsedData = JSON.parse(qrCode)
      if (parsedData.type === "unified" && parsedData.userId) {
        return {
          userId: parsedData.userId,
          eventId: parsedData.eventId
        }
      }
    } catch (error) {
      // Fallback to old format for backward compatibility
      const parts = qrCode.split('_')
      if (parts.length >= 4 && parts[0] === 'GROWTHLAB' && parts[1] && parts[2]) {
        return {
          eventId: parseInt(parts[1]),
          userId: parts[2]
        }
      }
    }
    return null
  }

  // Email notification function
  const sendEmailNotification = async (type: string, data: any): Promise<void> => {
    // Mock email notification - in real implementation, this would call an email service
    console.log(`Email notification sent: ${type}`, data)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  const value: AttendanceContextType = {
    attendanceRecords,
    demeritRecords,
    virtualNameCards,
    userDemeritPoints,
    isRestricted,
    checkInUser,
    checkOutUser,
    markNoShow,
    getEventAttendance,
    addDemeritPoints,
    getDemeritHistory,
    appealDemerit,
    createVirtualNameCard,
    acceptNameCard,
    declineNameCard,
    getMyNameCards,
    getReceivedNameCards,
    generateQRCode,
    scanQRCode
  }

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  )
}

export function useAttendance() {
  const context = useContext(AttendanceContext)
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider')
  }
  return context
}
