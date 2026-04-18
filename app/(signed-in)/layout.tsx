"use client"

import React from 'react'
import UserSyncWrapper from '@/components/UserSyncWrapper'
import { Chat } from 'stream-chat-react'
import streamClient from '@/lib/stream'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <UserSyncWrapper>
            <Chat client={streamClient}>
                {children}
            </Chat>
        </UserSyncWrapper>
    )
}

export default Layout