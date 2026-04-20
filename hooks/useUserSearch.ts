import React, { useState } from 'react'
import { useDebounce } from './useDebounce'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Doc } from '@/convex/_generated/dataModel'

function useUserSearch() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    const searchResults = useQuery(
        api.users.searchUsers,
        debouncedSearchTerm.trim() ? { searchTerm: debouncedSearchTerm } : "skip"
    )

    return {
        searchTerm,
        setSearchTerm,
        searchResults: (searchResults || []) as Doc<"users">[],
        isLoading: searchResults === undefined && debouncedSearchTerm.trim() !== ""
    }

}

export default useUserSearch