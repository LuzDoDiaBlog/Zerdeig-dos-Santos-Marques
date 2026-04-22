import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MessagesSection from '@/components/MessagesSection';
import LiturgySection from '@/components/LiturgySection';
import CategoriesSection from '@/components/CategoriesSection';
import NewsletterSection from '@/components/NewsletterSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <main>
        <HeroSection />
        <LiturgySection />
        <MessagesSection />
        <CategoriesSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
