"use client"

import React from 'react'
import UserSyncWrapper from '@/components/UserSyncWrapper'
import { Chat } from 'stream-chat-react'
import streamClient from '@/lib/stream'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/layouts/sidebar'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <UserSyncWrapper>
            <Chat client={streamClient}>
                <SidebarProvider>
                    <AppSidebar />
                    <div className="p-4">
                        <SidebarTrigger />
                        {children}
                    </div>
                </SidebarProvider>
            </Chat>
        </UserSyncWrapper >
    )
}

export default Layout