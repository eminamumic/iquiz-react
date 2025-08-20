import React from 'react'
import type { CategoryCardProps } from '../types'

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  imageSrc,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`category-card ${active ? 'highlight-card' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <h2>{name}</h2>
      {imageSrc && <img src={imageSrc} alt={name} className="category-image" />}
    </div>
  )
}
