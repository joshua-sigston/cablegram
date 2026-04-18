'use client'

import { ReactNode } from 'react'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'

// Ensure we have a valid endpoint for our Convex backend before initializing
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

// Initialize the Convex client that will communicate with our backend
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        // Wraps the application to seamlessly integrate Clerk's authentication with Convex
        // This ensures all Convex mutations/queries automatically include the user's auth token
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    )
}