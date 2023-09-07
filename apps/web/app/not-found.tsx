import { FileQuestion } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@ui/components/ui/alert";

function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Alert className="w-fit" variant="default">
        <FileQuestion className="h-4 w-4" />
        <AlertTitle>404</AlertTitle>
        <AlertDescription>The page you are trying to reach does not exist or no longer exists</AlertDescription>
      </Alert>
    </div>
  )
}

export default NotFound;
