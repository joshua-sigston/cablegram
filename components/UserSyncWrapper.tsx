"use client"

import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { useCallback, useEffect, useState } from "react"
import { api } from "@/convex/_generated/api"
import ErrorMessage from "./ErrorMessage"
import streamClient from "@/lib/stream"
import { createToken } from "@/app/actions/createToken"
import LoadingSpinner from "./LoadingSpinner"

export default function UserSyncWrapper({ children }: { children: React.ReactNode }) {
    // 1. Fetch the currently authenticated user from Clerk
    const { user, isLoaded: isUserLoaded } = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // 2. Prepare the Convex mutation to save the user to our database
    const createOrUpdateUser = useMutation(api.users.upsertUserByEmail)

    // Main synchronization logic: Keeps Clerk, Convex, and Stream in sync
    const syncUser = useCallback(async () => {
        if (!user?.id) return

        try {
            setIsLoading(true)
            setError(null)

            // A helper function that Stream uses to securely fetch an auth token from our server
            const tokenProvider = async () => {
                if (!user?.id) {
                    throw new Error("User is not authenticated")
                }

                // Call our Next.js Server Action to generate a token securely
                const token = await createToken(user.id)
                return token;
            }

            // Step A: Save the user's latest information (from Clerk) to our Convex Database
            await createOrUpdateUser({
                userId: user.id,
                name: user.fullName || "",
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl || ""
            })

            // Step B: Authenticate the user with Stream Chat using their ID, profile data, and token
            await streamClient.connectUser(
                {
                    id: user.id,
                    name: user.fullName || "Unknown",
                    image: user.imageUrl || "",
                },
                tokenProvider
            )

        } catch (error) {
            console.error("Failed to sync user:", error)
            setError(error instanceof Error ? error.message : "Failed to sync user.")
        } finally {
            setIsLoading(false)
        }
    }, [createOrUpdateUser, user])

    // Utility to clean up the Stream connection when the user logs out or leaves
    const disconnectUser = useCallback(async () => {
        try {
            await streamClient.disconnectUser()
        } catch (error) {
            console.error("Failed to disconnect user:", error)
            setError(error instanceof Error ? error.message : "Failed to disconnect user.")
        }
    }, [])

    // React Lifecycle: Trigger the sync whenever the user object changes
    useEffect(() => {
        if (!isUserLoaded) return

        if (user) {
            syncUser() // Connect them if logged in
        } else {
            disconnectUser() // Disconnect them if signed out
            setIsLoading(false)
        }

        // Cleanup function: run when component unmounts
        return () => {
            if (user) {
                disconnectUser()
            }
        }
    }, [user, isUserLoaded, syncUser, disconnectUser])

    if (error) {
        return <ErrorMessage />
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    // Render children once the setup processes are complete
    return (
        <div>{children}</div>
    )
}
