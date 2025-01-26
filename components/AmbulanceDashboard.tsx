"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/metric-card"
import {
  MapPin,
  Navigation,
  Clock,
  AlertTriangle,
  Activity,
  Users,
  FileText,
  Hospital,
  Search,
  Phone,
  MessageSquare,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"

interface HospitalMetrics {
  id: number
  name: string
  activeEmergencies: number
  criticalCases: number
  availableBeds: number
  avgResponseTime: number
  lat: number
  lng: number
}

interface PatientLocation {
  lat: number
  lng: number
}

const nearbyHospitals: HospitalMetrics[] = [
  {
    id: 1,
    name: "Central Hospital",
    lat: 40.7128,
    lng: -73.99,
    activeEmergencies: Math.floor(Math.random() * 10),
    criticalCases: Math.floor(Math.random() * 5),
    availableBeds: Math.floor(Math.random() * 20) + 5,
    avgResponseTime: Math.floor(Math.random() * 10) + 5,
  },
  {
    id: 2,
    name: "St. Mary's Medical",
    lat: 40.72,
    lng: -74.0,
    activeEmergencies: Math.floor(Math.random() * 10),
    criticalCases: Math.floor(Math.random() * 5),
    availableBeds: Math.floor(Math.random() * 20) + 5,
    avgResponseTime: Math.floor(Math.random() * 10) + 5,
  },
  {
    id: 3,
    name: "Memorial Hospital",
    lat: 40.705,
    lng: -73.98,
    activeEmergencies: Math.floor(Math.random() * 10),
    criticalCases: Math.floor(Math.random() * 5),
    availableBeds: Math.floor(Math.random() * 20) + 5,
    avgResponseTime: Math.floor(Math.random() * 10) + 5,
  },
]

export default function AmbulanceDashboard() {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    oxygenLevel: "",
    injuries: "",
    hospitalLocation: "",
    critical: false,
    cloudCode: "",
  })
  const [routeOption, setRouteOption] = useState("nearest")
  const [selectedHospital, setSelectedHospital] = useState<HospitalMetrics | null>(null)
  const [accessCode, setAccessCode] = useState("")
  const [medicalHistory, setMedicalHistory] = useState<string[]>([])
  const [patientLocation, setPatientLocation] = useState<PatientLocation | null>(null)
  const [patientPhone, setPatientPhone] = useState<string | null>(null)
  const [emergencyCallActive, setEmergencyCallActive] = useState(false)
  const [patientMessages, setPatientMessages] = useState<string[]>([])

  const handleHospitalSelect = (hospital: HospitalMetrics) => {
    setSelectedHospital(hospital)
  }

  const handleAccessMedicalHistory = () => {
    if (accessCode.length === 6) {
      setMedicalHistory([
        "Prescription_001.jpg - Dr. Smith - 01/15/2024",
        "Prescription_002.jpg - Dr. Johnson - 02/01/2024",
        "Prescription_003.jpg - Dr. Williams - 02/20/2024",
      ])
    }
  }

  const handleEmergencyCall = () => {
    setEmergencyCallActive(true)
    setPatientLocation({ lat: 40.7112, lng: -73.9976 })
    setPatientPhone("+1 (555) 123-4567")
  }

  const handleSendMessageToPatient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const message = form.patientMessage.value
    if (message) {
      setPatientMessages((prev) => [...prev, message])
      form.reset()
    }
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Ambulance Dashboard</h1>
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-2 border-red-500">
          <CardHeader>
            <CardTitle className="text-blue-800">Emergency Call Simulation</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleEmergencyCall} className="w-full bg-red-600 hover:bg-red-700 text-white">
              Simulate Emergency Call
            </Button>
          </CardContent>
        </Card>

        {patientPhone && (
          <Card className="border-2 border-blue-300">
            <CardHeader>
              <CardTitle className="text-blue-800">Patient Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Patient Phone: {patientPhone}</span>
                <Button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Patient
                </Button>
              </div>
              <div className="space-y-2">
                <form onSubmit={handleSendMessageToPatient} className="flex space-x-2">
                  <Input
                    name="patientMessage"
                    placeholder="Type a message to the patient..."
                    className="flex-grow border-blue-300 text-blue-800 bg-blue-50"
                  />
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </form>
                <ScrollArea className="h-32 w-full rounded-md border border-blue-300 p-2">
                  {patientMessages.map((message, index) => (
                    <div key={index} className="mb-2 p-2 bg-blue-100 rounded text-blue-800">
                      {message}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="text-blue-800">GPS Tracking & Route Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-blue-100 flex items-center justify-center mb-4 relative rounded-lg border-2 border-blue-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-blue-500">Google Maps Placeholder</span>
              </div>
              {nearbyHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${((hospital.lng + 74.0) / 0.04) * 100}%`,
                    top: `${((40.72 - hospital.lat) / 0.03) * 100}%`,
                  }}
                  onClick={() => handleHospitalSelect(hospital)}
                >
                  <Hospital
                    className={`w-6 h-6 ${selectedHospital?.id === hospital.id ? "text-red-500" : "text-blue-500"}`}
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow">
                    {hospital.name} ({hospital.availableBeds} beds)
                  </div>
                </div>
              ))}
              {patientLocation && (
                <div
                  className="absolute"
                  style={{
                    left: `${((patientLocation.lng + 74.0) / 0.04) * 100}%`,
                    top: `${((40.72 - patientLocation.lat) / 0.03) * 100}%`,
                  }}
                >
                  <MapPin className="w-6 h-6 text-red-500" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow">
                    Patient Location
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow">
                <Navigation className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="space-y-4">
              <RadioGroup defaultValue="nearest" onValueChange={(routeOption) => setRouteOption(routeOption)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nearest" id="nearest" />
                  <Label htmlFor="nearest" className="text-blue-600">
                    Route to Nearest Hospital
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="text-blue-600">
                    Custom Destination
                  </Label>
                </div>
              </RadioGroup>
              {routeOption === "custom" && (
                <div className="flex space-x-2">
                  <MapPin className="w-6 h-6 text-blue-300" />
                  <Input
                    placeholder="Enter destination hospital"
                    value={selectedHospital?.name || ""}
                    onChange={() => {}} // This would be handled by hospital selection
                    readOnly
                    className="border-blue-300 text-blue-800 bg-blue-50"
                  />
                </div>
              )}
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Calculate Fastest Route</Button>
            </div>
          </CardContent>
        </Card>

        {selectedHospital && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Active Emergencies"
              value={selectedHospital.activeEmergencies}
              icon={AlertTriangle}
              className="border-2 border-blue-300"
            />
            <MetricCard
              title="Critical Cases"
              value={selectedHospital.criticalCases}
              icon={Activity}
              className="border-2 border-blue-300"
            />
            <MetricCard
              title="Available Beds"
              value={selectedHospital.availableBeds}
              icon={Users}
              className="border-2 border-blue-300"
            />
            <MetricCard
              title="Avg Response Time"
              value={`${selectedHospital.avgResponseTime} min`}
              icon={Clock}
              className="border-2 border-blue-300"
            />
          </div>
        )}

        {emergencyCallActive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Access Medical History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="font-mono text-center text-lg border-blue-300 text-blue-800 bg-blue-50"
                  />
                  <Button onClick={handleAccessMedicalHistory} className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                {medicalHistory.length > 0 && (
                  <ScrollArea className="h-[200px] rounded-md border-2 border-blue-300 p-4">
                    {medicalHistory.map((record, index) => (
                      <div key={index} className="flex items-center gap-2 py-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-800">{record}</span>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-300">
              <CardHeader>
                <CardTitle className="text-blue-800">Patient Data Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-blue-600">
                      Patient Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={patientData.name}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, name: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-blue-600">
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={patientData.age}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, age: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodPressure" className="text-blue-600">
                      Blood Pressure
                    </Label>
                    <Input
                      id="bloodPressure"
                      name="bloodPressure"
                      placeholder="120/80"
                      value={patientData.bloodPressure}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, bloodPressure: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heartRate" className="text-blue-600">
                      Heart Rate (bpm)
                    </Label>
                    <Input
                      id="heartRate"
                      name="heartRate"
                      type="number"
                      value={patientData.heartRate}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, heartRate: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="temperature" className="text-blue-600">
                      Temperature (°F)
                    </Label>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      step="0.1"
                      value={patientData.temperature}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, temperature: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="oxygenLevel" className="text-blue-600">
                      Oxygen Level (%)
                    </Label>
                    <Input
                      id="oxygenLevel"
                      name="oxygenLevel"
                      type="number"
                      max="100"
                      value={patientData.oxygenLevel}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, oxygenLevel: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hospitalLocation" className="text-blue-600">
                      Hospital Location
                    </Label>
                    <Input
                      id="hospitalLocation"
                      name="hospitalLocation"
                      value={patientData.hospitalLocation}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, hospitalLocation: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cloudCode" className="text-blue-600">
                      Cloud Code
                    </Label>
                    <Input
                      id="cloudCode"
                      name="cloudCode"
                      value={patientData.cloudCode}
                      onChange={(e) => setPatientData((prev) => ({ ...prev, cloudCode: e.target.value }))}
                      className="border-blue-300 text-blue-800 bg-blue-50"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="critical"
                    checked={patientData.critical}
                    onCheckedChange={(checked) => setPatientData((prev) => ({ ...prev, critical: checked }))}
                  />
                  <Label htmlFor="critical" className="text-blue-600">
                    Critical Case
                  </Label>
                </div>
                <div>
                  <Label htmlFor="injuries" className="text-blue-600">
                    Injuries & Notes
                  </Label>
                  <Input
                    id="injuries"
                    name="injuries"
                    value={patientData.injuries}
                    onChange={(e) => setPatientData((prev) => ({ ...prev, injuries: e.target.value }))}
                    className="h-20 border-blue-300 text-blue-800 bg-blue-50"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Submit Patient Data
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

