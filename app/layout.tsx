import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ArtisanOS',
  description: 'Plateforme SaaS pour entreprises artisanales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
