'use client'

import React, { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TagSelectorProps {
    tags: string[]
    setTags: (tags: string[]) => void
}

export function TagSelector(props: TagSelectorProps) {
    // const [tags, setTags] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ' && inputValue.trim() !== '') {
            e.preventDefault()
            addTag(inputValue.trim())
        }
    }

    const addTag = (tag: string) => {
        if (!props.tags.includes(tag)) {
            props.setTags([...props.tags, tag])
            setInputValue('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        props.setTags(props.tags.filter(tag => tag !== tagToRemove))
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <Input
                type="text"
                placeholder="Type a tag and press Enter"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="w-full"
            />
            <div className="flex flex-wrap gap-2 mt-4">
                {props.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTag(tag)}
                            aria-label={`Remove ${tag} tag`}
                        />
                    </Badge>
                ))}
            </div>
        </div>
    )
}