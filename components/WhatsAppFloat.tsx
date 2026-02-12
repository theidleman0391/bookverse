import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-semibold hidden sm:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap group-hover:pl-2">
        Pedir Libros
      </span>
    </a>
  );
};

export default WhatsAppFloat;