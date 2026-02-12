import React from 'react';
import { SAMPLE_BOOKS, WHATSAPP_LINK } from '../constants';
import { Book } from '../types';

const BookCard: React.FC<{ book: Book }> = ({ book }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
    <div className="aspect-[2/3] overflow-hidden bg-slate-100 relative">
      <img 
        src={book.image} 
        alt={book.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-600 font-bold px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg">
          Pedir este
        </a>
      </div>
    </div>
    <div className="p-4">
      <div className="text-xs font-bold text-accent-600 mb-1 uppercase tracking-wider">{book.category}</div>
      <h4 className="font-bold text-slate-900 truncate">{book.title}</h4>
      <div className="flex justify-between items-center mt-3">
        <span className="text-slate-400 text-sm line-through">$250+</span>
        <span className="text-xl font-black text-brand-600">$10 MXN</span>
      </div>
    </div>
  </div>
);

const Showcase: React.FC = () => {
  return (
    <section id="catalogo" className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Joyas Literarias</h2>
            <p className="text-slate-600">
              Estos son solo algunos destellos de nuestra colección. Tenemos galaxias enteras de libros esperando por ti.
            </p>
          </div>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 font-bold hover:text-brand-700 flex items-center gap-1 group bg-white px-6 py-3 rounded-full shadow-sm hover:shadow border border-brand-100"
          >
            Ver catálogo completo
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SAMPLE_BOOKS.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-brand-800 to-accent-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-black text-white mb-6">¿Buscas algo específico?</h3>
                <p className="text-brand-100 mb-8 max-w-xl mx-auto text-lg">
                    Nuestro radar literario puede encontrar casi cualquier libro. Solo dinos el título o autor.
                </p>
                <a 
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-brand-700 hover:bg-brand-50 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg"
                >
                    Preguntar por un libro
                </a>
            </div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;