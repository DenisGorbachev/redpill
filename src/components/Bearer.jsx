import React from 'react'

export default function Bearer({ error }) {
  return (
    <div className="error">
      Error: {error.toString()}
    </div>
  )
}
