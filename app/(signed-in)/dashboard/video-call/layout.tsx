"use client"

import { createToken } from "@/app/actions/createToken"
import LoadingSpinner from "@/components/LoadingSpinner"
import { StatusCard } from "@/components/StatusCard"
import { useUser } from "@clerk/nextjs"
import { Call, StreamCall, StreamTheme, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { AlertTriangle, Video } from "lucide-react"
import { Alef } from "next/font/google"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import "stream-chat-react/dist/css/v2/index.css";

// Ensure the API key is provided before the app runs
if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
    throw new Error("Missing Stream API Key")
}

function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useUser()
    const { id } = useParams()
    
    // State to hold the active video call instance
    const [call, setCall] = useState<Call | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    // The Stream client responsible for the WebRTC connection
    const [client, setClient] = useState<StreamVideoClient | null>(null)

    // Map the Clerk user details into a shape that the Stream Video SDK understands
    const streamUser = useMemo(() => {
        if (!user?.id) return null

        return {
            id: user.id,
            name: user.fullName || user.emailAddresses[0]?.emailAddress || "Unknown User",
            image: user.imageUrl || "",
            type: "authenticated" as const
        }
    }, [user])

    // Callback that securely fetches an authentication token for the current user.
    // This calls our Next.js Server Action `createToken()`.
    const tokenProvider = useCallback(async () => {
        if (!user?.id) {
            throw new Error("Missing user id")
        }
        return await createToken(user.id)
    }, [user?.id])

    // Initialize the Stream Video Client when the user is ready.
    // Cleans up and disconnects the user if the component unmounts.
    useEffect(() => {
        if (!streamUser) {
            setClient(null)
            return
        }
        const newClient = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY as string,
            user: streamUser,
            tokenProvider
        })

        setClient(newClient)

        return () => {
            newClient.disconnectUser().catch(console.error)
        }
    }, [streamUser, tokenProvider])

    // Watch for the initialized client and the dynamic route [id].
    // Automatically join the stream call whenever the user hits this route.
    useEffect(() => {
        if (!client || !id) return

        setError(null)

        // Initialize a reference to a 'default' call type using the route param ID.
        const streamCall = client.call("default", id as string)

        const joinCall = async () => {
            try {
                // Joins the call; 'create: true' ensures it gets created if it doesn't exist yet
                await streamCall.join({ create: true })
                setCall(streamCall)
            } catch (error) {
                console.error("Failed to join call: ", error)
                setError(
                    error instanceof Error ? error.message : "Failed to join call"
                )
            }
        }
        
        joinCall()
    }, [client, id])

    // 1. Error state handling UI
    if (error) {
        return (
            <StatusCard
                title="Call Error"
                description={error}
                className="min-h-screen bg-red-50"
                action={
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                }
            >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
            </StatusCard>
        )
    }

    // 2. Loading state while the connection sets up
    if (!client) {
        return (
            <StatusCard
                title="Initializing Video Client"
                description="Setting up video call connection..."
                className="min-h-screen bg-blue-50"
            >
                <LoadingSpinner />
            </StatusCard>
        )
    }

    // 3. Loading state while actively joining the specific call ID
    if (!call) {
        return (
            <StatusCard
                title="Joining call..." className="min-h-screen bg-green-50">
                <div className="animate-bounce h-16 w-16 mx-auto">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                        <Video className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <div className="text-green-600 font-mono text-sm bg-green-100 px-3 py-1 rounded-full inline-block">
                    Call ID: {id}
                </div>
            </StatusCard>
        )
    }

    // 4. Fully initialized layout: Provide the client and call contexts to all nested children (the video view)
    return (
        <StreamVideo client={client}>
            <StreamTheme className="text-white">
                <StreamCall call={call}>{children}</StreamCall>
            </StreamTheme>
        </StreamVideo>
    )
}

export default Layout