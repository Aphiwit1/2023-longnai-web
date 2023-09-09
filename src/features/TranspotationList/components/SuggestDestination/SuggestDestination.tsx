import React from 'react'

export const SuggestDestination = ({ text, key }: any) => {
    return (
        <div key={key} className="inline-block text-xs text-slate-500 border-2 rounded-lg p-2 m-1">
           {text} 
        </div>
    )
}
