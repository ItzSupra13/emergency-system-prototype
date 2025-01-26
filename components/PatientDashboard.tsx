"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Phone, FileText, MessageSquare, Video, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DoctorContact {
  name: string
  specialty: string
  phone: string
}

interface ImportantFile {
  name: string
  type: string
  uploadDate: string
}

const volunteerDoctors: Record<string, DoctorContact[]> = {
  "General Practice": [
    { name: "Dr. Sarah Johnson", specialty: "General Practice", phone: "+1 (555) 123-4567" },
    { name: "Dr. Michael Lee", specialty: "General Practice", phone: "+1 (555) 234-5678" },
  ],
  Cardiology: [
    { name: "Dr. Emily Chen", specialty: "Cardiology", phone: "+1 (555) 345-6789" },
    { name: "Dr. David Brown", specialty: "Cardiology", phone: "+1 (555) 456-7890" },
  ],
  Neurology: [
    { name: "Dr. Rachel Green", specialty: "Neurology", phone: "+1 (555) 567-8901" },
    { name: "Dr. James Wilson", specialty: "Neurology", phone: "+1 (555) 678-9012" },
  ],
  Pediatrics: [
    { name: "Dr. Lisa Taylor", specialty: "Pediatrics", phone: "+1 (555) 789-0123" },
    { name: "Dr. Robert Martinez", specialty: "Pediatrics", phone: "+1 (555) 890-1234" },
  ],
}

export default function PatientDashboard() {
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [tempCode, setTempCode] = useState<string | null>(null)
  const [prescriptions, setPrescriptions] = useState<string[]>([])
  const [messages, setMessages] = useState<string[]>([])
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [importantFiles, setImportantFiles] = useState<ImportantFile[]>([])

  const handleEmergency = () => {
    setEmergencyActive(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: "prescription" | "important") => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      if (fileType === "prescription") {
        setPrescriptions((prev) => [...prev, ...newFiles])
      } else {
        const newImportantFiles = newFiles.map((name) => ({
          name,
          type: name.split(".").pop() || "Unknown",
          uploadDate: new Date().toLocaleString(),
        }))
        setImportantFiles((prev) => [...prev, ...newImportantFiles])
      }
    }
  }

  const generateTempCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setTempCode(code)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const message = form.message.value
    if (message) {
      setMessages((prev) => [...prev, message])
      form.reset()
    }
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Emergency Response System</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-2 border-red-500">
          <CardContent className="pt-6">
            <Button
              onClick={handleEmergency}
              className="w-full h-24 text-2xl font-bold bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white"
              disabled={emergencyActive}
            >
              {emergencyActive ? "Emergency Services Contacted" : "SOS"}
            </Button>
          </CardContent>
        </Card>

        {emergencyActive && (
          <>
            <Card className="border-2 border-blue-300">
              <CardHeader>
                <CardTitle className="text-blue-800">Ambulance Driver Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Driver Profile"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-blue-500"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-blue-800">John Doe</h3>
                  <p className="text-sm text-blue-600">3 people assisting (including medical officer)</p>
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" className="flex items-center bg-blue-500 hover:bg-blue-600 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Driver
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input name="message" placeholder="Type a message..." className="flex-grow border-blue-300" />
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </form>
                <ScrollArea className="h-32 mt-4 border-2 border-blue-300 rounded-md">
                  {messages.map((message, index) => (
                    <div key={index} className="p-2 bg-blue-100 rounded mb-2 text-blue-800">
                      {message}
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-300">
              <CardHeader>
                <CardTitle className="text-blue-800">Contact Volunteer Doctor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={(value) => setSelectedSpecialty(value)}>
                  <SelectTrigger className="border-blue-300">
                    <SelectValue placeholder="Select doctor specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(volunteerDoctors).map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSpecialty && (
                  <div className="space-y-4">
                    {volunteerDoctors[selectedSpecialty].map((doctor, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-blue-800">{doctor.name}</p>
                          <p className="text-sm text-blue-600">{doctor.phone}</p>
                        </div>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-500 hover:bg-blue-50"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-500 hover:bg-blue-50"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Video
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-500 hover:bg-blue-50"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <Card className="border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <FileText className="h-5 w-5 text-blue-500" />
              Medical History Cloud Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center space-y-4">
              <div className="flex justify-center">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <Label htmlFor="prescription-upload" className="cursor-pointer text-blue-600">
                  <span className="text-sm">Upload prescription images</span>
                  <Input
                    id="prescription-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "prescription")}
                    multiple
                    accept="image/*"
                  />
                </Label>
              </div>
            </div>

            <ScrollArea className="h-[200px] rounded-md border-2 border-blue-300 p-4">
              {prescriptions.map((prescription, index) => (
                <div key={index} className="flex items-center gap-2 py-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-800">{prescription}</span>
                </div>
              ))}
            </ScrollArea>

            <Button onClick={generateTempCode} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Generate Access Code
            </Button>

            {tempCode && (
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-600">Temporary Access Code:</p>
                <p className="text-2xl font-mono font-bold text-blue-800">{tempCode}</p>
                <p className="text-xs text-blue-500 mt-2">This code will expire in 24 hours</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Important Files Cloud Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center space-y-4">
              <div className="flex justify-center">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <Label htmlFor="important-file-upload" className="cursor-pointer text-blue-600">
                  <span className="text-sm">Upload important files</span>
                  <Input
                    id="important-file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "important")}
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </Label>
              </div>
            </div>

            <ScrollArea className="h-[200px] rounded-md border-2 border-blue-300 p-4">
              {importantFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-800">{file.name}</span>
                  </div>
                  <div className="text-xs text-blue-600">
                    <span>{file.type}</span>
                    <span className="ml-2">{file.uploadDate}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <p className="text-sm text-blue-300">
              Store important documents like allergies list, medical conditions, emergency contacts, etc.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

