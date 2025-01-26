"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MedicalHistoryUpload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    // Here you would typically upload the file to your backend
    // For this example, we'll just log the file name
    console.log(`Uploading file: ${file.name}`)

    // Simulating an upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("File uploaded successfully")
    setFile(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upload Medical History</h2>
      <div className="space-y-2">
        <Label htmlFor="file-upload">Select a file:</Label>
        <Input id="file-upload" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      </div>
      <Button onClick={handleUpload} disabled={!file} className="w-full">
        Upload Medical History
      </Button>
    </div>
  )
}

