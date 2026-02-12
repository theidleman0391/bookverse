import React, { useState, useEffect } from 'react';
import { BookOpen, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-900">
          <div className="bg-brand-600 text-white p-1.5 rounded-lg">
             <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">{t.navbar.brand}<span className="text-brand-600">{t.navbar.brandSuffix}</span></span>
        </div>

        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 text-sm font-medium"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'es' ? 'ES' : 'EN'}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;