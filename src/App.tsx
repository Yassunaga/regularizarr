import Header from "./components/Header";
import Hero from "./components/Hero";
import Simulator from "./components/Simulator";
import About from "./components/About";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Simulator />
        <About />
        <Services />
        <Benefits />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
