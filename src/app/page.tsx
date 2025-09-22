import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
import Tutorials from "@/components/Tutorials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      <Header />
      <Hero />
      <main className="max-w-[1320px] mx-auto">
        <Articles />
        <Tutorials />
        <Newsletter />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
