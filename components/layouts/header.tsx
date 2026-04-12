"use client"

import { SignInButton, UserButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated } from "convex/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

function Header() {
    const pathname = usePathname()
    const isDashboard = pathname.startsWith("/dashboard")
    return (
        <header className="p-4 flex justify-between items-center container mx-auto">
            <Link href="/dashboard" className="font-medium uppercase tracking-widest">
                Beam
            </Link>
            <div className="flex items-center space-x-4">
                <Authenticated>
                    {!isDashboard && (
                        <Link href="/dashboard">
                            <Button variant="outline" className="rounded-sm">Dashboard</Button>
                        </Link>
                    )}
                    <UserButton />
                </Authenticated>
                <Unauthenticated>
                    <SignInButton
                        mode="modal"
                        forceRedirectUrl="/dashboard"
                        signUpForceRedirectUrl="/dashboard">
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                </Unauthenticated>
            </div>
        </header>
    )
}

export default Header