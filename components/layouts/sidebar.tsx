"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import { ChannelList } from "stream-chat-react"
import { ChannelFilters, ChannelOptions, ChannelSort } from "stream-chat"

export function AppSidebar() {
    const { user } = useUser()
    const filters: ChannelFilters = {
        members: { $in: [user?.id as string] },
        type: { $in: ["messaging", "team"] }
    }
    const options = { presence: true, state: true }
    const sort: ChannelSort = {
        last_message_at: -1
    }
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-between p-2">
                    <span className="text-muted-foreground">Welcome Back</span>
                    <UserButton signInUrl="/sign-in" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="bg-slate-400 h-full">
                    <Button variant="outline">Start New Chat</Button>
                    <ChannelList
                        filters={filters}
                        options={options}
                        sort={sort}
                        EmptyStateIndicator={() => (
                            <div className="text-sm text-center text-muted mt-12">
                                <h2>Ready to Chat?</h2>
                                <p className="">Your conversations will appear here once you start chatting with others.</p>
                            </div>
                        )}
                    />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}