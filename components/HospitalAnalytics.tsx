import React from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

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

interface HospitalAnalyticsProps {
  cases: Case[]
  onStatusChange: (caseId: string, newStatus: "Arriving" | "Admitted" | "Released from ER") => void
}

export function HospitalAnalytics({ cases, onStatusChange }: HospitalAnalyticsProps) {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border-2 border-blue-300">
      <Table>
        <TableCaption className="text-blue-600">List of incoming emergency cases</TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="text-blue-800">ID</TableHead>
            <TableHead className="text-blue-800">Patient Name</TableHead>
            <TableHead className="text-blue-800">Age</TableHead>
            <TableHead className="text-blue-800">Blood Pressure</TableHead>
            <TableHead className="text-blue-800">Heart Rate</TableHead>
            <TableHead className="text-blue-800">Temperature</TableHead>
            <TableHead className="text-blue-800">Oxygen Level</TableHead>
            <TableHead className="text-blue-800">Injuries</TableHead>
            <TableHead className="text-blue-800">Arrival Time</TableHead>
            <TableHead className="text-blue-800">Status</TableHead>
            <TableHead className="text-blue-800">Critical</TableHead>
            <TableHead className="text-blue-800">History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((case_) => (
            <TableRow key={case_.id} className="bg-white">
              <TableCell className="text-blue-800">{case_.id}</TableCell>
              <TableCell className="text-blue-800">{case_.patientName}</TableCell>
              <TableCell className="text-blue-800">{case_.age}</TableCell>
              <TableCell className="text-blue-800">{case_.bloodPressure}</TableCell>
              <TableCell className="text-blue-800">{case_.heartRate}</TableCell>
              <TableCell className="text-blue-800">{case_.temperature}</TableCell>
              <TableCell className="text-blue-800">{case_.oxygenLevel}</TableCell>
              <TableCell className="text-blue-800">{case_.injuries}</TableCell>
              <TableCell className="text-blue-800">{new Date(case_.arrivalTime).toLocaleString()}</TableCell>
              <TableCell>
                <Select
                  value={case_.status}
                  onValueChange={(value: "Arriving" | "Admitted" | "Released from ER") =>
                    onStatusChange(case_.id, value)
                  }
                >
                  <SelectTrigger className="w-[150px] border-blue-300 text-blue-800 bg-blue-50">
                    <SelectValue>{case_.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arriving">Arriving</SelectItem>
                    <SelectItem value="Admitted">Admitted</SelectItem>
                    <SelectItem value="Released from ER">Released from ER</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Badge variant={case_.critical ? "destructive" : "secondary"} className="bg-blue-100 text-blue-800">
                  {case_.critical ? "Yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell className="text-blue-800">
                {(case_.status === "Admitted" || case_.status === "Released from ER") && case_.history}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

