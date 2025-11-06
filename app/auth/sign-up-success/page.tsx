import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Check Your Email</h1>
        <p className="text-muted-foreground mb-6">
          We've sent you a confirmation link. Please check your email and click the link to verify your account.
        </p>
        <Link href="/">
          <Button className="w-full">Back to Home</Button>
        </Link>
      </Card>
    </main>
  )
}
