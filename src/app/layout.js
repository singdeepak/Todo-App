import './globals.css'

export const metadata = {
  title: 'My Website',
  description: 'Built with Next.js 15',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">

        <main className="p-6">
          {children}
        </main>

      </body>
    </html>
  )
}
