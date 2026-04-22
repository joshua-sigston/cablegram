"use client"

import LoadingSpinner from "@/components/LoadingSpinner"
import { StatusCard } from "@/components/StatusCard"
import { useSidebar } from "@/components/ui/sidebar"
import { CallControls, CallingState, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Check, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

function VideoCall() {
    // Stream's state hooks allow us to reactively access details about the ongoing call
    const { useCallCallingState, useParticipants } = useCallStateHooks()
    
    // Returns the current status of the local user's connection to the call (e.g., joined, joining, left, reconnecting)
    const callingState = useCallCallingState()
    
    // Returns an array of all users currently in the video call
    const participants = useParticipants()
    
    const router = useRouter()
    const [copied, setCopied] = useState(false)
    const { setOpen } = useSidebar()

    // Redirect the user back to the dashboard and open the sidebar when they leave the call
    const handleLeave = () => {
        router.push("/dashboard")
        setOpen(true)
    }

    // Helper function to copy the current call URL so others can be invited
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            
            // Reset the 'copied' state back to false after 2 seconds for visual feedback
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.error("Failed to copy: ", error)
        }
    }

    // Handlers for different WebRTC states during the connection lifecycle
    
    if (callingState === CallingState.JOINING) {
        return (
            <StatusCard
                title="Joining Call..."
                description="Please wait while we connect you to the call."
                className="bg-ray-50 rounded-lg">
                <LoadingSpinner />
            </StatusCard>
        )
    }

    // Let the user know if their internet drops and Stream is trying to reconnect
    if (callingState === CallingState.RECONNECTING) {
        return (
            <StatusCard
                title="Reconnecting..."
                description="Connection lost, attempting to reconnect"
                className="bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="animate-pulse rounded-full h-12 w-12 bg-yellow-400 mx-auto"></div>
            </StatusCard>
        )
    }

    // If the call is not explicitly joined at this point, we assume it has ended or failed.
    if (callingState !== CallingState.JOINED) {
        return (
            <StatusCard
                title="Call Ended"
                description="The call has ended. Please close this window."
                className="bg-gray-50 rounded-lg">
                <div className="animate-pulse rounded-full h-12 w-12 bg-gray-400 mx-auto"></div>
            </StatusCard>
        )
    }

    return (
        <div className="flex flex-col h-full w-full">
            {/* The main video grid/speaker layout provided natively by Stream SDK */}
            <div className="flex-1 relative">
                <SpeakerLayout />
            </div>
            
            {/* Float the CallControls (mic, camera, leave buttons) at the bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <CallControls onLeave={handleLeave} />
            </div>
            
            {/* If the current user is the only one in the call, show an invitation modal overlay */}
            {participants.length === 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <Copy className="w-8 h-8 text-blue-600" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">Waiting for others to join</h2>
                                <p className="text-gray-600">
                                    Share this link with others to invite them to the call
                                </p>
                            </div>

                            {/* Link copying container */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 text-sm text-gray-700 font-mono break-all">
                                        {window.location.href}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {copied ? (
                                            <><Check className="w-4 h-4 inline-block" /> Copied!</>
                                        ) : (
                                            <><Copy className="w-4 h-4 inline-block" /> Copy Link</>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            <p className="text-sm text-gray-500">
                                Others will be able to join using this link
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoCall