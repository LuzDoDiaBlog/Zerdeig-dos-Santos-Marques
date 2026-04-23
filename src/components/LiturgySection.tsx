import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Calendar as CalendarIcon, 
  Book, 
  User, 
  Sparkles, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  MessageCircle, 
  HeartPlus, 
  Facebook, 
  Twitter, 
  Link, 
  Check, 
  Send, 
  Instagram, 
  Youtube, 
  Music, 
  Smartphone, 
  Share 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getDailyLiturgy } from '@/services/geminiService';
import { cn } from '@/lib/utils';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface LiturgyData {
  title: string;
  color: string;
  colorHex: string;
  saint: string;
  firstReading: { reference: string; text: string };
  psalm: { reference: string; text: string };
  gospel: { reference: string; text: string };
  reflection: string;
}

export default function LiturgySection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [liturgy, setLiturgy] = useState<LiturgyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(undefined);
  const [comments, setComments] = useState<{ id: string; text: string; date: string; timestamp: number }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const shareTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = liturgy ? `*Liturgia Diária - ${format(selectedDate, "dd/MM/yyyy")}*\n\n*${liturgy.title}*\n\n*Evangelho:* ${liturgy.gospel.reference}\n${liturgy.gospel.text.substring(0, 200)}...\n\n*Reflexão:* ${liturgy.reflection}\n\nVeja a liturgia completa em: ${shareUrl}` : '';

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  // Fecha o menu automaticamente após 5 segundos
  useEffect(() => {
    if (isShareOpen) {
      shareTimeoutRef.current = setTimeout(() => {
        setIsShareOpen(false);
      }, 5000);
    } else {
      if (shareTimeoutRef.current) {
        clearTimeout(shareTimeoutRef.current);
      }
    }
    return () => {
      if (shareTimeoutRef.current) {
        clearTimeout(shareTimeoutRef.current);
      }
    };
  }, [isShareOpen]);

  const toggleShare = () => {
    setIsShareOpen(!isShareOpen);
  };

  const handleNativeShare = async () => {
    if (navigator.share && liturgy) {
      try {
        await navigator.share({
          title: `Liturgia Diária - ${liturgy.title}`,
          text: shareText,
          url: shareUrl,
        });
        setIsShareOpen(false);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Erro ao compartilhar:', err);
        }
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-black',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500',
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600',
      href: `instagram://app`
    },
    {
      name: 'TikTok',
      icon: Music,
      color: 'bg-black',
      href: `tiktok://`
    },
    {
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-600',
      href: `https://www.youtube.com/`
    },
    {
      name: 'Kwai',
      icon: Smartphone,
      color: 'bg-orange-500',
      href: `kwai://`
    }
  ];

  const handleSocialClick = (name: string) => {
    handleCopy();
    setIsShareOpen(false);
  };

  const fetchLiturgy = async (date: Date) => {
    setIsLoading(true);
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const data = await getDailyLiturgy(dateStr);
      setLiturgy(data);
      
      // Carregar comentários locais para esta data
      const savedComments = localStorage.getItem(`liturgy_comments_${dateStr}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching liturgy:', error);
      setLiturgy(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiturgy(selectedDate);
  }, [selectedDate]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      text: newComment,
      date: dateStr,
      timestamp: Date.now()
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`liturgy_comments_${dateStr}`, JSON.stringify(updatedComments));
    setNewComment('');
  };

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setIsCalendarOpen(false);
    }
  };

  const toggleCalendar = () => {
    if (!isCalendarOpen) {
      setActiveStartDate(selectedDate);
    }
    setIsCalendarOpen(!isCalendarOpen);
  };

  const LiturgySkeleton = () => (
    <div className="space-y-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-4 rounded-full bg-slate-200" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>
            <div className="h-8 w-full bg-slate-200 rounded mb-4" />
            <div className="h-8 w-2/3 bg-slate-200 rounded mb-4" />
            <div className="h-16 w-full bg-slate-50 rounded-2xl" />
          </div>
          <div className="bg-slate-200 h-48 rounded-[2rem]" />
        </div>

        {/* Readings Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-slate-200 rounded-full" />
                  <div className="h-6 w-40 bg-slate-200 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="liturgia" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Liturgia Diária</h2>
          <p className="text-slate-600">Acompanhe as leituras e o evangelho de cada dia</p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center justify-center gap-4 mb-12 relative">
          <button 
            onClick={handlePrevDay}
            className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-indigo-600"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="relative">
            <button 
              onClick={toggleCalendar}
              className="flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-md border-2 border-indigo-100 hover:shadow-lg hover:border-indigo-400 transition-all active:scale-95 group"
            >
              <CalendarIcon size={24} className="text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-slate-800 capitalize">
                {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </span>
            </button>

            <AnimatePresence>
              {isCalendarOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsCalendarOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-50 bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 min-w-[320px]"
                  >
                    <div className="flex justify-between items-center mb-4 px-2">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Selecionar Data</span>
                      <button onClick={() => setIsCalendarOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={18} />
                      </button>
                    </div>
                    <div className="custom-calendar-wrapper">
                      <Calendar 
                        onChange={handleDateChange} 
                        value={selectedDate}
                        activeStartDate={activeStartDate}
                        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate || undefined)}
                        locale="pt-BR"
                        className="border-none font-sans"
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNextDay}
            className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-indigo-600"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LiturgySkeleton />
            </motion.div>
          ) : liturgy ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-4 h-4 rounded-full shadow-inner" 
                        style={{ backgroundColor: liturgy.colorHex || '#ccc' }}
                      />
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Cor Litúrgica: {liturgy.color}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                      {liturgy.title}
                    </h3>
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl mb-6">
                      <User size={20} className="text-indigo-600 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Santo do Dia</p>
                        <p className="text-slate-700 font-medium">{liturgy.saint}</p>
                      </div>
                    </div>

                    {/* Share Button */}
                    <div className="relative">
                      <button
                        onClick={toggleShare}
                        className={cn(
                          "w-full flex items-center justify-center gap-3 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm",
                          isShareOpen 
                            ? "bg-indigo-600 text-white shadow-indigo-200" 
                            : "bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50"
                        )}
                      >
                        <HeartPlus size={20} />
                        Compartilhar Liturgia
                      </button>

                      <AnimatePresence>
                        {isShareOpen && (
                          <>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 z-10"
                              onClick={() => setIsShareOpen(false)}
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              className="absolute left-0 bottom-full mb-4 z-20 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 min-w-[280px] max-h-[80vh] overflow-y-auto scrollbar-hide"
                            >
                              <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white border-r border-b border-slate-100 rotate-45" />
                              
                              <div className="grid gap-2 relative z-10">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">Compartilhar Liturgia</p>
                                
                                {canNativeShare && (
                                  <button
                                    onClick={handleNativeShare}
                                    className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition-colors text-indigo-700 text-sm font-bold w-full text-left mb-2"
                                  >
                                    <div className="p-2 rounded-xl bg-indigo-600 text-white">
                                      <Share size={16} />
                                    </div>
                                    Compartilhar no Sistema
                                  </button>
                                )}

                                <div className="grid grid-cols-2 gap-2">
                                  {shareLinks.map((link) => (
                                    <a
                                      key={link.name}
                                      href={link.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700 text-[10px] font-bold border border-slate-50"
                                      onClick={() => handleSocialClick(link.name)}
                                    >
                                      <div className={cn("p-2.5 rounded-xl text-white shadow-sm", link.color)}>
                                        <link.icon size={20} />
                                      </div>
                                      {link.name}
                                    </a>
                                  ))}
                                </div>

                                <div className="h-px bg-slate-100 my-2" />
                                
                                <button
                                  onClick={handleCopy}
                                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium w-full text-left"
                                >
                                  <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                                    {copied ? <Check size={16} className="text-green-600" /> : <Link size={16} />}
                                  </div>
                                  {copied ? 'Copiado!' : 'Texto + Link'}
                                </button>
                                <button
                                  onClick={handleCopyUrl}
                                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium w-full text-left"
                                >
                                  <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                                    {copiedUrl ? <Check size={16} className="text-green-600" /> : <Link size={16} />}
                                  </div>
                                  {copiedUrl ? 'Link Copiado!' : 'Link Direto'}
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-200">
                    <Sparkles size={32} className="mb-4 opacity-50" />
                    <h4 className="text-xl font-bold mb-4">Reflexão</h4>
                    <p className="text-indigo-50 leading-relaxed italic">
                      "{liturgy.reflection}"
                    </p>
                  </div>
                </div>

                {/* Readings Content */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                    <div className="space-y-12">
                      {/* First Reading */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Book size={24} className="text-indigo-600" />
                          <h4 className="text-xl font-bold text-slate-900">1ª Leitura</h4>
                          <span className="text-slate-400 text-sm font-medium">({liturgy.firstReading.reference})</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                          {liturgy.firstReading.text}
                        </p>
                      </div>

                      {/* Psalm */}
                      <div className="pl-6 border-l-4 border-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="text-xl font-bold text-slate-900">Salmo Responsorial</h4>
                          <span className="text-slate-400 text-sm font-medium">({liturgy.psalm.reference})</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg italic">
                          {liturgy.psalm.text}
                        </p>
                      </div>

                      {/* Gospel */}
                      <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles size={24} className="text-indigo-600" />
                          <h4 className="text-xl font-bold text-slate-900">Evangelho</h4>
                          <span className="text-slate-400 text-sm font-medium">({liturgy.gospel.reference})</span>
                        </div>
                        <p className="text-slate-900 leading-relaxed text-xl font-medium">
                          {liturgy.gospel.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Reflections Section */}
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle size={28} className="text-indigo-600" />
                  <h3 className="text-2xl font-bold text-slate-900">Suas Reflexões</h3>
                </div>

                <form onSubmit={handleAddComment} className="mb-10">
                  <div className="relative">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="O que esta liturgia diz ao seu coração hoje?"
                      className="w-full p-6 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 transition-all min-h-[120px] text-slate-700"
                    />
                    <button
                      type="submit"
                      className="absolute bottom-4 right-4 px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                    >
                      Salvar Reflexão
                    </button>
                  </div>
                  <p className="mt-3 text-slate-400 text-xs italic">
                    Nota: Suas reflexões são salvas localmente no seu navegador.
                  </p>
                </form>

                <div className="space-y-6">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                              U
                            </div>
                            <span className="text-sm font-bold text-slate-700">Minha Reflexão</span>
                          </div>
                          <span className="text-xs text-slate-400">
                            {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed italic">
                          "{comment.text}"
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-slate-400">Nenhuma reflexão salva para este dia ainda.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400">Não foi possível carregar a liturgia para esta data.</p>
              <button 
                onClick={() => fetchLiturgy(selectedDate)}
                className="mt-4 text-indigo-600 font-bold hover:underline"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
