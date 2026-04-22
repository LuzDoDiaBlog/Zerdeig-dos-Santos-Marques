import { useState, useEffect, useCallback, useRef } from 'react';
import { MESSAGES } from '@/constants';
import MessageCard from './MessageCard';
import { Loader2 } from 'lucide-react';
import { Message } from '@/types';

export default function MessagesSection() {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>(MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Simula o carregamento de mais mensagens
  const loadMoreMessages = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simula um atraso de rede
    setTimeout(() => {
      // Como não temos um backend real, vamos duplicar as mensagens existentes com novos IDs
      // para demonstrar o scroll infinito. Em um app real, isso seria uma chamada de API.
      const nextBatch = MESSAGES.map(m => ({
        ...m,
        id: `${m.id}-${displayedMessages.length}-${Math.random()}`
      }));

      setDisplayedMessages(prev => [...prev, ...nextBatch]);
      setIsLoading(false);

      // Limitamos a 30 mensagens para não travar o navegador nesta demo
      if (displayedMessages.length >= 30) {
        setHasMore(false);
      }
    }, 1000);
  }, [isLoading, hasMore, displayedMessages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreMessages();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreMessages, hasMore]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Mensagens Recentes</h2>
            <p className="text-slate-500">As últimas orações e reflexões publicadas</p>
          </div>
          <div className="flex gap-2">
            {['Tudo', 'Orações', 'Reflexões', 'Gratidão'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 text-sm font-medium rounded-full border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>

        {/* Elemento sentinela para o scroll infinito */}
        <div ref={loaderRef} className="mt-16 flex justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-2 text-indigo-600">
              <Loader2 className="animate-spin" size={32} />
              <span className="text-sm font-medium">Carregando mais luz...</span>
            </div>
          )}
          {!hasMore && (
            <p className="text-slate-400 text-sm italic">Você chegou ao fim das mensagens de hoje.</p>
          )}
        </div>
      </div>
    </section>
  );
}
