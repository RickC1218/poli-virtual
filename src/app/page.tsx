import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-4xl'>Welcome to 
      <Image
        src='/logo.png'
        width={250}
        height={250}
        alt='Poli Virtual Logo'
      />
      </h1>
    </main>
  )
}
