import HomeFirstSection from "./home/FirstSection"
import WhyChoose from "./home/WhyChoose"
import Features from "./home/Features"
import AboutUs from "./home/AboutUs"
import Videos from "./home/Videos"
import Gallery from "./home/Gallery"
// import Testimonials from "./home/Testimonials"
export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* First section component within app/home */}
      <HomeFirstSection />
      <AboutUs />
      <Videos />
      <Features />
      <WhyChoose />
      <Gallery />
      {/* <Testimonials /> */}
    </main>
  )
}
