import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextJob Morocco - Professional CV Review & Templates',
  description: 'Get 5 modern CV templates for free, and book a 30-min 1:1 CV Review for only 99 DH. Transform your career with professional guidance.',
  keywords: 'CV review, Morocco, job search, career, templates, HR, recruitment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}