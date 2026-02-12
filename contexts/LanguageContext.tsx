import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  es: {
    navbar: {
      brand: "Book",
      brandSuffix: "Verse",
    },
    hero: {
      badge: "Bienvenidos a BookVerse",
      title: "Lectura que enciende",
      titleSuffix: "tu imaginación.",
      subtitle: "Descubre un universo de historias, conocimiento y aventura. La biblioteca digital más vibrante de México por solo",
      cta: "Pedir un Libro",
      delivery: "Entrega inmediata",
      format: "Multi-formato",
      payment: "Pago Seguro",
    },
    recommender: {
      badge: "IA Recomendador",
      title: "¿No sabes qué leer?",
      subtitle: "Cuéntanos qué te gusta, cómo te sientes o qué buscas aprender. Te daremos 3 opciones perfectas para ti.",
      placeholder: "Ej. Quiero una novela de misterio corta...",
      button: "Recomendar",
      buttonLoading: "Pensando...",
      cardButton: "Pedir este libro",
      error: "Hubo un error conectando con la IA. Por favor intenta de nuevo.",
      availabilityLabel: "Disponibilidad:",
      tryAgainMessage: "¿No te convencen estos libros?",
      tryAgain: "Probar de nuevo"
    },
    features: {
      title: "Todo lo que buscas en un solo lugar",
      subtitle: "Nuestra colección abarca desde las editoriales técnicas más prestigiosas hasta los clásicos literarios.",
      techTitle: "Técnicos & Programación",
      techDesc: "La colección completa de O'Reilly, Packt y más. Mantente actualizado en desarrollo, datos e IA.",
      academicTitle: "Académicos & Universidad",
      academicDesc: "Libros de texto para ingeniería, medicina, derecho y ciencias sociales.",
      litTitle: "Literatura & Best Sellers",
      litDesc: "Novelas, autoayuda y clásicos disponibles en las mejores librerías.",
      langTitle: "Idiomas",
      langDesc: "Material para aprender inglés, francés, alemán y más.",
      formatTitle: "Formatos Universales",
      formatDesc: "PDF, EPUB y MOBI. Compatibles con Kindle, iPad, Android y PC.",
      supportTitle: "Atención Personalizada",
      supportDesc: "¿Buscas un título específico? Escríbenos por WhatsApp.",
    },
    footer: {
      desc: "Democratizando el acceso al conocimiento. Libros digitales de alta calidad a $10 MXN.",
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    navbar: {
      brand: "Book",
      brandSuffix: "Verse",
    },
    hero: {
      badge: "Welcome to BookVerse",
      title: "Reading that ignites",
      titleSuffix: "your imagination.",
      subtitle: "Discover a universe of stories, knowledge, and adventure. The most vibrant digital library in Mexico for just",
      cta: "Order a Book",
      delivery: "Instant Delivery",
      format: "Multi-format",
      payment: "Secure Payment",
    },
    recommender: {
      badge: "AI Recommender",
      title: "Don't know what to read?",
      subtitle: "Tell us what you like, how you feel, or what you want to learn. We'll give you 3 perfect options.",
      placeholder: "Ex. I want a short mystery novel...",
      button: "Recommend",
      buttonLoading: "Thinking...",
      cardButton: "Order this book",
      error: "There was an error connecting to AI. Please try again.",
      availabilityLabel: "Availability:",
      tryAgainMessage: "Not convinced?",
      tryAgain: "Try again"
    },
    features: {
      title: "Everything you look for in one place",
      subtitle: "Our collection ranges from prestigious technical publishers to literary classics.",
      techTitle: "Tech & Programming",
      techDesc: "Complete collection from O'Reilly, Packt, and more. Stay updated on dev, data, and AI.",
      academicTitle: "Academic & University",
      academicDesc: "Textbooks for engineering, medicine, law, and social sciences.",
      litTitle: "Literature & Best Sellers",
      litDesc: "Novels, self-help, and classics available in top bookstores.",
      langTitle: "Languages",
      langDesc: "Materials to learn English, French, German, and more.",
      formatTitle: "Universal Formats",
      formatDesc: "PDF, EPUB, and MOBI. Compatible with Kindle, iPad, Android, and PC.",
      supportTitle: "Personalized Support",
      supportDesc: "Looking for a specific title? Write to us on WhatsApp.",
    },
    footer: {
      desc: "Democratizing access to knowledge. High-quality digital books for $10 MXN.",
      rights: "All rights reserved."
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};