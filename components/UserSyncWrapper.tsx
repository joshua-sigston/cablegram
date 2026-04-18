"use client"

import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { useCallback, useEffect, useState } from "react"
import { api } from "@/convex/_generated/api"
import ErrorMessage from "./ErrorMessage"
import streamClient from "@/lib/stream"
import { createToken } from "@/app/actions/createToken"


export default function UserSyncWrapper({ children }: { children: React.ReactNode }) {
    const { user, isLoaded: isUserLoaded } = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const createOrUpdateUser = useMutation(api.users.upsertUserByEmail)

    const syncUser = useCallback(async () => {
        if (!user?.id) return

        try {
            setIsLoading(true)
            setError(null)

            const tokenProvider = async () => {
                if (!user?.id) {
                    throw new Error("User is not authenticated")
                }

                const token = await createToken(user.id)
                return token;
            }

            // 1. Save user to Convex 
            await createOrUpdateUser({
                userId: user.id,
                name: user.fullName || "",
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl || ""
            })

            // 2. Connect user to Stream
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

    const disconnectUser = useCallback(async () => {
        try {
            await streamClient.disconnectUser()
        } catch (error) {
            console.error("Failed to disconnect user:", error)
            setError(error instanceof Error ? error.message : "Failed to disconnect user.")
        }
    }, [])

    useEffect(() => {
        if (!isUserLoaded) return

        if (user) {
            syncUser()
        } else {
            disconnectUser()
            setIsLoading(false)
        }

        return () => {
            if (user) {
                disconnectUser()
            }
        }
    }, [user, isUserLoaded, syncUser, disconnectUser])

    if (error) {
        <ErrorMessage />
    }
    ``
    return (
        <div>{children}</div>
    )
}
