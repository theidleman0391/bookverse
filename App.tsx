import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIRecommender from './components/AIRecommender';
import Features from './components/Features';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <AIRecommender />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;