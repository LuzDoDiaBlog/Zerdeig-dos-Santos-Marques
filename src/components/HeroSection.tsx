import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, X, Heart, Star, Shield, Sun, Users } from 'lucide-react';
import { useState } from 'react';
import { generatePrayer } from '@/services/geminiService';
import { cn } from '@/lib/utils';

const PRAYER_THEMES = [
  { id: 'manha', label: 'Oração da Manhã', icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1000' },
  { id: 'paz', label: 'Paz e Esperança', icon: Sparkles, color: 'text-sky-500', bg: 'bg-sky-50', image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&q=80&w=1000' },
  { id: 'gratidao', label: 'Gratidão', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000' },
  { id: 'forca', label: 'Força e Coragem', icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-50', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000' },
  { id: 'cura', label: 'Cura e Saúde', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', image: 'https://images.unsplash.com/photo-1516589174422-809717e26b4a?auto=format&fit=crop&q=80&w=1000' },
];

export default function HeroSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrayer, setGeneratedPrayer] = useState<{ prayerText: string; reflectionText: string } | null>(null);
  const [selectedTheme, setSelectedTheme] = useState(PRAYER_THEMES[0]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const prayerData = await generatePrayer(selectedTheme.label);
    setGeneratedPrayer(prayerData);
    setIsGenerating(false);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-slate-50">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6"
          >
            <Sparkles size={16} />
            <span>Mensagens que transformam o seu dia</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Encontre <span className="text-indigo-600">Paz</span> e <span className="text-violet-600">Inspiração</span> Diária
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed mb-10"
          >
            Um espaço dedicado à espiritualidade, reflexão e oração. Receba doses diárias de esperança e compartilhe luz com quem você ama.
          </motion.p>

          {/* Theme Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10"
          >
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Escolha um tema para sua oração:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {PRAYER_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300",
                    selectedTheme.id === theme.id 
                      ? "bg-white border-indigo-600 shadow-md scale-105" 
                      : "bg-white/50 border-slate-200 hover:border-indigo-300 text-slate-600"
                  )}
                >
                  <theme.icon size={16} className={theme.color} />
                  <span className="text-sm font-semibold">{theme.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Gerar Oração de {selectedTheme.label}
                </>
              )}
            </button>
            <button 
              onClick={() => document.getElementById('liturgia')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-y-1"
            >
              Ver Liturgia de Hoje
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {generatedPrayer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-xl w-full shadow-2xl relative border border-indigo-50"
            >
              <button 
                onClick={() => setGeneratedPrayer(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="text-center">
                {selectedTheme.image && (
                  <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-md border border-slate-100">
                    <img 
                      src={selectedTheme.image} 
                      alt={selectedTheme.label} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <selectedTheme.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Sua {selectedTheme.label}</h3>
                
                <div className="space-y-6 mb-8">
                  <p className="text-xl text-slate-700 leading-relaxed italic">
                    "{generatedPrayer.prayerText}"
                  </p>
                  
                  <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Reflexão</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {generatedPrayer.reflectionText}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => {
                      const shareText = `"${generatedPrayer.prayerText}"\n\nReflexão: ${generatedPrayer.reflectionText}`;
                      navigator.clipboard.writeText(shareText);
                      alert('Copiado para a área de transferência!');
                    }}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
                  >
                    Copiar e Compartilhar
                  </button>
                  <button 
                    onClick={() => setGeneratedPrayer(null)}
                    className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
