import * as React from 'react'

import "./input.style.css"

interface SearchInputProps {
    handleSearch: (query: string) => void;
}

export function SearchInput ({ handleSearch }: SearchInputProps) {
    return (
        <div className='search-input'>
        <label>
            <input type='text' placeholder='Filter key words...' onInput={(e) => {handleSearch(e.currentTarget.value)}} />
        </label>
        </div>
    )
}