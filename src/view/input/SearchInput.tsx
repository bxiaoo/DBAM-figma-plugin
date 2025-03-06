import * as React from 'react'

interface SearchInputProps {
    handleSearch: (query: string) => void;
}

export function SearchInput ({ handleSearch }: SearchInputProps) {
    return (
        <label>
            <input type='text' onInput={(e) => {handleSearch(e.currentTarget.value)}} />
        </label>
    )
}