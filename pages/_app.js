import AnimatedBackground from '@/components/AnimatedBackground'
import BackgroundMusic from '@/components/BackgroundMusic'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatedBackground />
      <BackgroundMusic />
      <Component {...pageProps} />
    </>
  )
}