import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-slate-900 mb-4">
            <div className="bg-brand-600 text-white p-1.5 rounded-lg">
            <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">{t.navbar.brand}<span className="text-brand-600">{t.navbar.brandSuffix}</span></span>
        </div>
        
        <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
            {t.footer.desc}
        </p>
        
        <div className="text-sm text-slate-400">
          <p>© {new Date().getFullYear()} {t.navbar.brand}{t.navbar.brandSuffix}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;