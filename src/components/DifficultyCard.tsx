import React from 'react'
import type { DifficultyCardProps } from '../types'

export const DifficultyCard: React.FC<DifficultyCardProps> = ({
  level,
  active,
  onClick,
}) => {
  return (
    <div
      className={`difficulty-card ${active ? 'highlight-card-diff' : ''}`}
      onClick={onClick}
    >
      <p className="difficulty-text">{level}</p>
    </div>
  )
}
