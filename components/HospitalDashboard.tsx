"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MetricCard } from "@/components/ui/metric-card"
import { Clock, AlertTriangle, Activity, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HospitalAnalytics } from "./HospitalAnalytics"

interface Case {
  id: string
  patientName: string
  age: number
  bloodPressure: string
  heartRate: number
  temperature: number
  oxygenLevel: number
  injuries: string
  arrivalTime: string
  status: "Arriving" | "Admitted" | "Released from ER"
  critical: boolean
  cloudCode: string
  history?: string
}

export default function HospitalDashboard() {
  const [metrics, setMetrics] = useState({
    activeEmergenciesArriving: 2,
    criticalCases: 2,
    availableBeds: 10,
    avgResponseTime: 8.5,
  })

  const [cases, setCases] = useState<Case[]>([
    {
      id: "1",
      patientName: "John Doe",
      age: 45,
      bloodPressure: "120/80",
      heartRate: 75,
      temperature: 98.6,
      oxygenLevel: 98,
      injuries: "Minor cuts and bruises",
      arrivalTime: "2025-01-26T09:30:00",
      status: "Arriving",
      critical: false,
      cloudCode: "ABC123",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      age: 32,
      bloodPressure: "130/85",
      heartRate: 90,
      temperature: 99.1,
      oxygenLevel: 97,
      injuries: "Suspected fracture in left arm",
      arrivalTime: "2025-01-26T10:15:00",
      status: "Arriving",
      critical: true,
      cloudCode: "DEF456",
    },
  ])

  const handleMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMetrics((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const handleUpdateMetrics = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating hospital metrics:", metrics)
    // Here you would typically send this data to your backend
  }

  const simulateBooking = () => {
    const newCase: Case = {
      id: (cases.length + 1).toString(),
      patientName: `Patient ${cases.length + 1}`,
      age: Math.floor(Math.random() * 60) + 20,
      bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 20) + 70}`,
      heartRate: Math.floor(Math.random() * 40) + 60,
      temperature: Number((Math.random() * 2 + 97).toFixed(1)),
      oxygenLevel: Math.floor(Math.random() * 5) + 95,
      injuries: "Simulated injuries",
      arrivalTime: new Date().toISOString(),
      status: "Arriving",
      critical: Math.random() < 0.3, // 30% chance of being critical
      cloudCode: Math.random().toString(36).substring(2, 8).toUpperCase(), // This simulates the access code
    }

    setCases((prevCases) => [...prevCases, newCase])
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      activeEmergenciesArriving: prevMetrics.activeEmergenciesArriving + 1,
      criticalCases: prevMetrics.criticalCases + (newCase.critical ? 1 : 0),
    }))
  }

  const handleStatusChange = (caseId: string, newStatus: "Arriving" | "Admitted" | "Released from ER") => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id === caseId) {
          if (newStatus === "Admitted" || newStatus === "Released from ER") {
            return {
              ...c,
              status: newStatus,
              history: `Access code: ${c.cloudCode} - Accessed on ${new Date().toLocaleString()}`,
            }
          }
          return { ...c, status: newStatus }
        }
        return c
      }),
    )

    const updatedCase = cases.find((c) => c.id === caseId)
    if (!updatedCase) return

    setMetrics((prevMetrics) => {
      const newMetrics = { ...prevMetrics }

      if (updatedCase.status === "Arriving" && newStatus === "Admitted") {
        newMetrics.activeEmergenciesArriving -= 1
        newMetrics.availableBeds -= 1
      } else if (updatedCase.status === "Arriving" && newStatus === "Released from ER") {
        newMetrics.activeEmergenciesArriving -= 1
      } else if (updatedCase.status === "Admitted" && newStatus === "Released from ER") {
        newMetrics.availableBeds += 1
      }

      return newMetrics
    })
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Hospital Dashboard</h1>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Emergencies Arriving"
            value={metrics.activeEmergenciesArriving}
            icon={AlertTriangle}
            className="border-2 border-blue-300"
          />
          <MetricCard
            title="Critical Cases"
            value={metrics.criticalCases}
            icon={Activity}
            className="border-2 border-blue-300"
          />
          <MetricCard
            title="Available Beds"
            value={metrics.availableBeds}
            icon={Users}
            className="border-2 border-blue-300"
          />
          <MetricCard
            title="Avg Response Time"
            value={`${metrics.avgResponseTime} min`}
            icon={Clock}
            className="border-2 border-blue-300"
          />
        </div>

        <Card className="border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="text-blue-800">Hospital Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <HospitalAnalytics cases={cases} onStatusChange={handleStatusChange} />
            <div className="mt-4 flex justify-end">
              <Button onClick={simulateBooking} className="bg-blue-500 hover:bg-blue-600 text-white">
                Simulate Booking
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="text-blue-800">Update Hospital Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateMetrics} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activeEmergenciesArriving" className="text-blue-600">
                  Active Emergencies Arriving
                </Label>
                <Input
                  id="activeEmergenciesArriving"
                  name="activeEmergenciesArriving"
                  type="number"
                  value={metrics.activeEmergenciesArriving}
                  onChange={handleMetricChange}
                  min={0}
                  className="border-blue-300 text-blue-800 bg-blue-50"
                />
              </div>
              <div>
                <Label htmlFor="criticalCases" className="text-blue-600">
                  Critical Cases
                </Label>
                <Input
                  id="criticalCases"
                  name="criticalCases"
                  type="number"
                  value={metrics.criticalCases}
                  onChange={handleMetricChange}
                  min={0}
                  className="border-blue-300 text-blue-800 bg-blue-50"
                />
              </div>
              <div>
                <Label htmlFor="availableBeds" className="text-blue-600">
                  Available Beds
                </Label>
                <Input
                  id="availableBeds"
                  name="availableBeds"
                  type="number"
                  value={metrics.availableBeds}
                  onChange={handleMetricChange}
                  min={0}
                  className="border-blue-300 text-blue-800 bg-blue-50"
                />
              </div>
              <div>
                <Label htmlFor="avgResponseTime" className="text-blue-600">
                  Average Response Time (minutes)
                </Label>
                <Input
                  id="avgResponseTime"
                  name="avgResponseTime"
                  type="number"
                  value={metrics.avgResponseTime}
                  onChange={handleMetricChange}
                  min={0}
                  step={0.1}
                  className="border-blue-300 text-blue-800 bg-blue-50"
                />
              </div>
              <Button type="submit" className="md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white">
                Update Metrics
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

