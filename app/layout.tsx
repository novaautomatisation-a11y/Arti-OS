import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArtisanOS - L\'OS des artisans',
  description: 'Centralise tes devis, chantiers, heures et factures. L\'outil de pilotage pour artisans suisses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
