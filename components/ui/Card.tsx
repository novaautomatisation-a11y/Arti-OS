import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const hoverStyles = hover
    ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
    : ''

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${paddingStyles[padding]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  )
}
