import { Button } from "@/components/ui/button"

interface SOSButtonProps {
  onEmergency: () => void
}

export default function SOSButton({ onEmergency }: SOSButtonProps) {
  return (
    <Button
      onClick={onEmergency}
      className="w-full h-24 text-2xl font-bold bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300"
    >
      SOS
    </Button>
  )
}

