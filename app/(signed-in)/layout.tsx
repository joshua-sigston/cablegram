"use client"

import React from 'react'
import UserSyncWrapper from '@/components/UserSyncWrapper'
import { Chat } from 'stream-chat-react'
import streamClient from '@/lib/stream'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/layouts/sidebar'
import "stream-chat-react/dist/css/v2/index.css";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex flex-col w-full">
            <UserSyncWrapper>
                {/* Wrapping Chat here provides the chat context to both the Sidebar (for ChannelList) and the main content */}
                <Chat client={streamClient} theme="str-chat__theme-light">
                    <SidebarProvider>
                        <AppSidebar />
                        {/* The main content area where DashboardPage renders */}
                        <div className="flex-1 flex flex-col min-w-0 relative">
                            {/* Make the trigger absolute or part of a header so it doesn't push the chat UI down */}
                            <div className="absolute top-4 left-4 z-50 md:hidden">
                                <SidebarTrigger />
                            </div>
                            {children}
                        </div>
                    </SidebarProvider>
                </Chat>
            </UserSyncWrapper >
        </div>
    )
}

export default Layout