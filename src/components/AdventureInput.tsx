import React from 'react'

interface AdventureInputProps {
  setAdventureInput: (input: string) => void;
}

export default function AdventureInput({setAdventureInput}: AdventureInputProps) {
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setAdventureInput(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  }

  return (
    <textarea 
      className='adventure-input' 
      onKeyPress={handleKeyPress} 
      rows={5}
    />
  )
}
