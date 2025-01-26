"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface RemoteConsultationProps {
  emergencyActive: boolean
}

export default function RemoteConsultation({ emergencyActive }: RemoteConsultationProps) {
  const [isCallActive, setIsCallActive] = useState(false)

  const handleStartCall = () => {
    // Here you would typically initiate a WebRTC call
    console.log("Starting remote consultation")
    setIsCallActive(true)
  }

  const handleEndCall = () => {
    // Here you would typically end the WebRTC call
    console.log("Ending remote consultation")
    setIsCallActive(false)
  }

  if (!emergencyActive) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Remote Consultation</h2>
      {!isCallActive ? (
        <Button onClick={handleStartCall} className="w-full">
          Start Video Call with Specialist
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="aspect-video bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">Video Call Active</span>
          </div>
          <Button onClick={handleEndCall} variant="destructive" className="w-full">
            End Call
          </Button>
        </div>
      )}
    </div>
  )
}

