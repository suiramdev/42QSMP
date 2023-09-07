"use client";

import { AlertCircle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@ui/components/ui/alert";

interface ErrorProps {
  error: Error;
}

function Error({ error }: ErrorProps) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Alert className="w-fit" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </div>
  );
}

export default Error;
