import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Sparkles, BookOpen, PenTool } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

// Define styles for generated covers
const BOOK_VARIANTS = [
  {
    // The "Stylized Prompt" Variant: Warm Yellow cover, Orange Spine
    id: 'art',
    coverColor: '#FCD34D', // Amber-300
    spineColor: '#EA580C', // Orange-600
    backColor: '#F59E0B', // Amber-500
    icon: <PenTool className="text-orange-900/60 w-16 h-16 mix-blend-multiply" />,
    decorationColor: 'border-orange-800/20'
  },
  {
    // Technical/Blue
    id: 'tech',
    coverColor: '#38BDF8', // Sky-400
    spineColor: '#0369A1', // Sky-700
    backColor: '#0EA5E9', // Sky-500
    icon: <BookOpen className="text-sky-900/60 w-16 h-16 mix-blend-multiply" />,
    decorationColor: 'border-sky-900/20'
  },
  {
    // Magic/Purple
    id: 'magic',
    coverColor: '#C084FC', // Purple-400
    spineColor: '#7E22CE', // Purple-700
    backColor: '#A855F7', // Purple-500
    icon: <Sparkles className="text-purple-900/60 w-16 h-16 mix-blend-multiply" />,
    decorationColor: 'border-purple-900/20'
  },
];

const FloatingBook: React.FC<{ 
  variantIndex: number; 
  className?: string; 
  mouseX: number; 
  mouseY: number;
  scale?: number;
  initialRotX?: number;
  initialRotY?: number;
  initialRotZ?: number;
}> = ({ 
  variantIndex, 
  className, 
  mouseX, 
  mouseY, 
  scale = 1,
  initialRotX = 0,
  initialRotY = -30,
  initialRotZ = 0
}) => {
  // Logic for the new robust book:
  const rotateX = initialRotX + (mouseY * 8); 
  const rotateY = initialRotY + (mouseX * 12);
  const rotateZ = initialRotZ + (mouseX * 4);

  const v = BOOK_VARIANTS[variantIndex % BOOK_VARIANTS.length];

  return (
    <div className={`book-stage ${className}`} style={{ transform: `scale(${scale})` }}>
      <div 
        className="book-wrapper"
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`
        }}
      >
        {/* FRONT COVER */}
        <div className="face book-cover flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: v.coverColor }}>
             {/* Crease/Spine Effect on Left */}
             <div className="absolute left-0 top-0 bottom-0 w-[12px] bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none"></div>
             
             {/* Cover Design */}
             <div className={`w-full h-full border-4 border-dashed ${v.decorationColor} rounded-md flex flex-col items-center justify-center relative bg-white/10 backdrop-blur-[1px]`}>
                 {v.icon}
                 <div className="mt-6 w-20 h-2 bg-black/10 rounded-full"></div>
                 <div className="mt-2 w-12 h-2 bg-black/10 rounded-full"></div>
             </div>
             
             {/* Gloss */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50 pointer-events-none"></div>
        </div>
        
        {/* SPINE (Left) */}
        <div className="face book-spine flex flex-col items-center justify-center" style={{ backgroundColor: v.spineColor }}>
            <div className="h-[80%] w-[2px] bg-black/5 rounded-full"></div>
        </div>

        {/* PAGES */}
        <div className="face book-pages"></div>
        <div className="face book-pages-top"></div>
        <div className="face book-pages-bottom"></div>

        {/* BACK COVER */}
        <div className="face book-back" style={{ backgroundColor: v.backColor }}></div>

      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y }); 
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-[90vh] flex flex-col justify-center">
      
      {/* 3D Floating Books Background */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
        
        {/* --- BLURRED BACKGROUND BOOKS (DEPTH OF FIELD) --- */}

        {/* Far Top Left */}
        <div className="absolute top-[-5%] left-[15%] opacity-40 blur-[2px] animate-float" style={{ animationDelay: '1s' }}>
          <FloatingBook 
            variantIndex={1} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            scale={0.5} 
            initialRotY={40}
            initialRotX={-10}
          />
        </div>

        {/* Far Bottom Right */}
        <div className="absolute bottom-[15%] right-[-2%] opacity-30 blur-[3px] animate-float" style={{ animationDelay: '3s' }}>
          <FloatingBook 
            variantIndex={0} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            scale={0.4} 
            initialRotY={-10} 
            initialRotX={-20} 
          />
        </div>

        {/* Deep Background Center/Right */}
        <div className="absolute top-[30%] right-[35%] opacity-20 blur-[4px] animate-float" style={{ animationDelay: '5s' }}>
          <FloatingBook 
            variantIndex={2} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            scale={0.35} 
            initialRotY={180} // Back facing
            initialRotX={10}
          />
        </div>


        {/* --- MAIN FOREGROUND BOOKS --- */}
        
        {/* MAIN BOOK: Right Side - Yellow/Orange (Scaled down slightly) */}
        <div className="absolute top-[15%] right-[8%] animate-float" style={{ animationDelay: '0s' }}>
          <FloatingBook 
            variantIndex={0} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            scale={1.1} 
            initialRotY={-30}
            initialRotX={10}
          />
        </div>
        
        {/* SECONDARY BOOK: Left Side - Blue (Scaled down slightly) */}
        <div className="absolute top-[25%] left-[5%] animate-float" style={{ animationDelay: '2s' }}>
          <FloatingBook 
            variantIndex={1} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            scale={0.8}
            initialRotY={25}
            initialRotX={5}
          />
        </div>
        
        {/* THIRD BOOK: Bottom/Center - Purple (Scaled down slightly) */}
        <div className="absolute bottom-[5%] left-[35%] opacity-90 animate-float" style={{ animationDelay: '4s' }}>
           <FloatingBook 
            variantIndex={2} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            scale={0.65}
            initialRotY={-25}
            initialRotX={25}
          />
        </div>

      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm ring-4 ring-brand-50">
            <Sparkles className="w-4 h-4 text-accent-500 fill-accent-500" />
            <span className="tracking-wide">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
            {t.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500">
              {t.hero.titleSuffix}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.hero.subtitle} <strong>$10 MXN</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 group shadow-lg shadow-brand-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer z-20 relative"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-brand-500" />
              <span>{t.hero.delivery}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-accent-500" />
              <span>{t.hero.format}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-brand-500" />
              <span>{t.hero.payment}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-orange-100/50 rounded-full blur-3xl mix-blend-multiply filter opacity-70"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-pink-100/50 rounded-full blur-3xl mix-blend-multiply filter opacity-70"></div>
      </div>
    </section>
  );
};

export default Hero;