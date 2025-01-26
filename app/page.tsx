import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { UserCircle, Ambulance, Hospital } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-12">Emergency Response System</h1>
        <div className="grid gap-6">
          <Link href="/patient" className="w-full block">
            <Card className="hover:bg-blue-100 transition-colors border-2 border-blue-300">
              <CardContent className="flex items-center p-6">
                <UserCircle className="h-12 w-12 text-blue-500 mr-6" />
                <div>
                  <h2 className="text-2xl font-semibold text-blue-800">Patient</h2>
                  <p className="text-gray-600">Access your medical information and request emergency services</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/ambulance" className="w-full block">
            <Card className="hover:bg-blue-100 transition-colors border-2 border-blue-300">
              <CardContent className="flex items-center p-6">
                <Ambulance className="h-12 w-12 text-red-500 mr-6" />
                <div>
                  <h2 className="text-2xl font-semibold text-blue-800">Ambulance</h2>
                  <p className="text-gray-600">Manage emergency calls and patient information</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/hospital" className="w-full block">
            <Card className="hover:bg-blue-100 transition-colors border-2 border-blue-300">
              <CardContent className="flex items-center p-6">
                <Hospital className="h-12 w-12 text-blue-500 mr-6" />
                <div>
                  <h2 className="text-2xl font-semibold text-blue-800">Hospital</h2>
                  <p className="text-gray-600">Monitor incoming cases and manage hospital resources</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}

