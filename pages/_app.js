import '@/styles/globals.css'
import AnimatedBackground from '@/components/AnimatedBackground'
import BackgroundMusic from '@/components/BackgroundMusic'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatedBackground />
      <BackgroundMusic />
      <Component {...pageProps} />
    </>
  )
}