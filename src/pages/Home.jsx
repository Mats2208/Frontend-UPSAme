import Header from "../components/Header";
import Hero from "../components/Hero";
import StudentsGrid from "../components/StudentsGrid";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <StudentsGrid />
      <Benefits />
      <Footer />
    </main>
  );
}

export default Home;
