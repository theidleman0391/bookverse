import React, { useState } from 'react';
import { Search, ArrowRight, Loader2, BookOpen, Globe2, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { WHATSAPP_NUMBER } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface Recommendation {
  title: string;
  author: string;
  reason: string;
  availability: string;
}

const AIRecommender: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState('');
  const { language, t } = useLanguage();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const langInstruction = language === 'es' 
        ? "Responde en Español. Indica la disponibilidad en: 'Español', 'Inglés' o 'Ambos'."
        : "Respond in English. Indicate availability as: 'Spanish', 'English' or 'Both'.";

      const prompt = `
        Act as an expert bookseller. The user speaks ${language === 'es' ? 'Spanish' : 'English'}.
        Recommend exactly 3 books based on this user request: "${query}".
        
        ${langInstruction}
        
        Return ONLY a valid JSON array (no markdown code blocks) with this exact structure:
        [
          {
            "title": "Book Title",
            "author": "Author Name",
            "reason": "Brief persuasive reason (max 15 words) in the requested language.",
            "availability": "Availability status string in the requested language"
          }
        ]
        
        If the request implies offensive content or nonsense, recommend 3 universal classics.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        setRecommendations(data);
      } else {
        throw new Error("No response from AI");
      }
    } catch (err) {
      console.error(err);
      setError(t.recommender.error);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (bookTitle: string) => {
    const message = language === 'es' 
      ? `Hola, Bookverse me recomendó el libro "${bookTitle}" y me gustaría comprarlo por $10 MXN.`
      : `Hello, Bookverse recommended the book "${bookTitle}" and I would like to buy it for $10 MXN.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.recommender.title}</h2>
          <p className="text-slate-600">
            {t.recommender.subtitle}
          </p>
        </div>

        {/* Input Area */}
        <div className="max-w-2xl mx-auto mb-16">
          <form 
            onSubmit={handleSearch} 
            className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-3xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-brand-500 transition-all"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.recommender.placeholder}
              className="flex-grow pl-6 pr-4 py-3 bg-transparent outline-none text-lg placeholder:text-slate-400 w-full"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shrink-0 shadow-sm hover:shadow-md"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              <span>{loading ? t.recommender.buttonLoading : t.recommender.button}</span>
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-3 text-sm">{error}</p>}
        </div>

        {/* Results */}
        {recommendations && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((book, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
                          <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                          <Globe2 className="w-3 h-3" />
                          {book.availability}
                      </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{book.title}</h3>
                  <p className="text-sm text-brand-600 font-medium mb-3">{book.author}</p>
                  <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                    "{book.reason}"
                  </p>
                  <a
                    href={getWhatsAppLink(book.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 border border-slate-200 hover:border-brand-500 hover:text-brand-600 rounded-xl text-slate-600 font-semibold text-sm transition-colors flex items-center justify-center gap-2 group"
                  >
                    {t.recommender.cardButton}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>

            {/* Try Again Button */}
            <div className="mt-10 text-center animate-in fade-in duration-700 delay-300">
              <p className="text-slate-500 mb-4 text-sm font-medium">{t.recommender.tryAgainMessage}</p>
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="inline-flex items-center gap-2 text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 px-6 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow active:scale-95"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{t.recommender.tryAgain}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIRecommender;