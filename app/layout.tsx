import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'


//Adding custom fonts
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'ElectroSwift',
  description: 'Your one-stop destination for cutting-edge electric products. Explore a seamless shopping experience with the latest innovations in electronics at ElectroSwift.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
