import React from 'react';
import { Book, GraduationCap, Code, Globe, Library, MessageCircle } from 'lucide-react';
import { FeatureProps } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-slate-100">
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-slate-900 border border-slate-100">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="beneficios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.features.title}</h2>
          <p className="text-slate-600 text-lg">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title={t.features.techTitle}
            description={t.features.techDesc}
            icon={<Code className="w-6 h-6" />}
          />
          <FeatureCard 
            title={t.features.academicTitle}
            description={t.features.academicDesc}
            icon={<GraduationCap className="w-6 h-6" />}
          />
          <FeatureCard 
            title={t.features.litTitle}
            description={t.features.litDesc}
            icon={<Book className="w-6 h-6" />}
          />
          <FeatureCard 
            title={t.features.langTitle}
            description={t.features.langDesc}
            icon={<Globe className="w-6 h-6" />}
          />
          <FeatureCard 
            title={t.features.formatTitle}
            description={t.features.formatDesc}
            icon={<Library className="w-6 h-6" />}
          />
          <FeatureCard 
            title={t.features.supportTitle}
            description={t.features.supportDesc}
            icon={<MessageCircle className="w-6 h-6" />}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;