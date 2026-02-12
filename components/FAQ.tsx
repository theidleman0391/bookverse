import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-slate-900 pr-8">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Preguntas Frecuentes</h2>
          <p className="text-slate-600">Resolvemos tus dudas antes de que compres.</p>
        </div>
        
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <FAQItem 
            question="¿Cómo recibo los libros?" 
            answer="Una vez confirmado tu pago, te enviamos los archivos directamente a tu WhatsApp, correo electrónico o mediante un enlace de descarga en la nube (Google Drive/Mega)." 
          />
          <FAQItem 
            question="¿En qué formato vienen?" 
            answer="La mayoría de nuestros libros están en formato PDF y EPUB de alta calidad, compatibles con Kindle, tablets, celulares y computadoras." 
          />
          <FAQItem 
            question="¿Qué métodos de pago aceptan?" 
            answer="Aceptamos transferencia bancaria, depósito en OXXO y Mercado Pago para tu mayor comodidad." 
          />
          <FAQItem 
            question="¿Tienen libros en español e inglés?" 
            answer="Sí, contamos con un amplio catálogo en ambos idiomas. Especialmente en libros técnicos (O'Reilly) tenemos mucho material en inglés, y literatura en español." 
          />
          <FAQItem 
            question="¿Qué pasa si no tienen el libro que busco?" 
            answer="¡Lo buscamos por ti! Si no está en nuestro inventario inmediato, podemos conseguirlo bajo pedido sin costo extra, manteniendo el precio de $10 MXN." 
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;