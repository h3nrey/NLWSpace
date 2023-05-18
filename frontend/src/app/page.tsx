import { cookies } from 'next/headers'
import Copyright from '@/Components/Copyright'
import EmptyMemorie from '@/Components/EmptyMemorie'
import Hero from '@/Components/Hero'
import SigninButton from '@/Components/SigninButton'
import Profile from '@/Components/Profile'

export default function Home() {
  const isAuthenticated = cookies().has('token')
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {isAuthenticated ? <Profile /> : <SigninButton />}

        {/* Hero  */}
        <Hero />

        {/* Copyright  */}
        <Copyright />
      </div>

      {/* Right */}
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemorie />
      </div>
    </main>
  )
}
