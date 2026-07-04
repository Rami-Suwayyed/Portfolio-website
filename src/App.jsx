import { useTheme } from "./hooks/useTheme";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Work from "./components/sections/Work";
import Contact from "./components/sections/Contact";
import ScrollTop from "./components/ui/ScrollTop";

function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav theme={theme} onToggle={toggle} />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}

export default App;
