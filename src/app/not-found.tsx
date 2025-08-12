import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Stránka nebyla nalezena</h1>
      <p className="text-lg">Stránka, na kterou jste se snažili přejít, neexistuje.</p>
      <Link href="/" className="text-blue-500">Zpět na domovskou stránku</Link>
    </div>
  )
}

export default NotFound
