import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '食迷个',
  description: '食迷个',
  generator: 'Btrya',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
