"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Mic,
  BarChart3,
  X,
} from "lucide-react"

interface VoiceMessagePlayerProps {
  duration: number
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  className?: string
}

export function VoiceMessagePlayer({
  duration,
  isPlaying,
  onPlay,
  onPause,
  onStop,
  className,
}: VoiceMessagePlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            onStop()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, duration, onStop])

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause()
    } else {
      onPlay()
    }
  }

  const handleStop = () => {
    onStop()
    setCurrentTime(0)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = Math.floor(percentage * duration)
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const waveformBars = Array.from({ length: 20 }, (_, i) => {
    const height = Math.random() * 60 + 20
    return (
      <div
        key={i}
        className="bg-current opacity-60 rounded-full"
        style={{ height: `${height}%`, width: '2px' }}
      />
    )
  })

  return (
    <div className={cn("flex items-center space-x-3 p-3 bg-gray-100 rounded-lg", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePlayPause}
        className="p-2"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      <div className="flex-1 space-y-2">
        <div
          className="relative h-8 cursor-pointer"
          onClick={handleSeek}
        >
          <div className="absolute inset-0 flex items-center space-x-1">
            {waveformBars}
          </div>
          <div
            className="absolute top-0 left-0 h-full bg-[#00A884] opacity-30 transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMuted(!isMuted)}
          className="p-1"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleStop}
          className="p-1"
        >
          <Square className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface VoiceRecorderProps {
  onRecordingComplete: (duration: number) => void
  onRecordingCancel: () => void
  className?: string
}

export function VoiceRecorder({
  onRecordingComplete,
  onRecordingCancel,
  className,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    intervalRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    onRecordingComplete(recordingTime)
  }

  const pauseRecording = () => {
    setIsPaused(true)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const resumeRecording = () => {
    setIsPaused(false)
    intervalRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const cancelRecording = () => {
    setIsRecording(false)
    setRecordingTime(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    onRecordingCancel()
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const waveformBars = Array.from({ length: 20 }, (_, i) => {
    const height = Math.random() * 60 + 20
    return (
      <div
        key={i}
        className="bg-red-500 rounded-full animate-pulse"
        style={{ height: `${height}%`, width: '2px' }}
      />
    )
  })

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className={cn("flex items-center space-x-3 p-3 bg-red-50 rounded-lg", className)}>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-red-600">Recording</span>
      </div>

      <div className="flex-1 space-y-2">
        <div className="h-8 flex items-center space-x-1">
          {waveformBars}
        </div>
        <div className="text-xs text-red-600">
          {formatTime(recordingTime)}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {isPaused ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={resumeRecording}
            className="p-1 text-red-600"
          >
            <Play className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={pauseRecording}
            className="p-1 text-red-600"
          >
            <Pause className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={stopRecording}
          className="p-1 text-red-600"
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={cancelRecording}
          className="p-1 text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 