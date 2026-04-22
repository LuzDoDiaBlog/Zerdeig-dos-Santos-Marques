import { useState, useEffect, useRef } from 'react';
import { Facebook, Twitter, Link, Check, MessageCircle, Send, Instagram, Youtube, Music, Smartphone, Share, HeartPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import LazyImage from '@/components/ui/LazyImage';

interface MessageCardProps {
  message: Message;
}

export default function MessageCard({ message }: MessageCardProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const shareTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shareUrl = window.location.href;
  const shareText = `*${message.title}*\n\n"${message.content}"\n\n_Veja mais em:_ ${shareUrl}`;

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
    if (navigator.share) {
      try {
        await navigator.share({
          title: message.title,
          text: message.content,
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
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(message.content)}`
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
      href: `instagram://app` // More robust base deep link
    },
    {
      name: 'TikTok',
      icon: Music,
      color: 'bg-black',
      href: `tiktok://` // Modern TikTok deep link
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
      href: `kwai://` // Standard Kwai deep link
    }
  ];

  const handleSocialClick = (name: string) => {
    handleCopy(); // Always copy text + link for these platforms
    if (['Instagram', 'TikTok', 'Kwai', 'YouTube'].includes(name)) {
      // Optional: Add specific logic or analytics here
    }
    setIsShareOpen(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {message.image && (
        <LazyImage 
          src={message.image}
          alt={message.title}
          containerClassName="h-48"
          className="hover:scale-105"
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            {message.category}
          </span>
          <span className="text-slate-400 text-xs">{message.date}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
          {message.title}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-4 italic">
          "{message.content}"
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              {message.author.charAt(0)}
            </div>
            <span className="text-sm font-medium text-slate-700">{message.author}</span>
          </div>
          
          <div className="relative">
            <button
              onClick={toggleShare}
              className={cn(
                "p-2 rounded-full transition-all duration-300",
                isShareOpen ? "bg-indigo-600 text-white shadow-lg" : "hover:bg-slate-100 text-slate-500"
              )}
              aria-label="Compartilhar"
            >
              <HeartPlus size={22} />
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
                    className="absolute right-0 bottom-full mb-4 z-20 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 min-w-[240px] max-h-[80vh] overflow-y-auto scrollbar-hide"
                  >
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-slate-100 rotate-45" />
                    
                    <div className="grid gap-1 relative z-10">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">Compartilhar</p>
                      
                      {canNativeShare && (
                        <button
                          onClick={handleNativeShare}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors text-indigo-700 text-sm font-bold w-full text-left mb-2"
                        >
                          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                            <Share size={14} />
                          </div>
                          Compartilhar no Sistema
                        </button>
                      )}

                      <div className="grid grid-cols-2 gap-1">
                        {shareLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-[10px] font-bold"
                            onClick={() => handleSocialClick(link.name)}
                          >
                            <div className={cn("p-2 rounded-xl text-white shadow-sm", link.color)}>
                              <link.icon size={18} />
                            </div>
                            {link.name}
                          </a>
                        ))}
                      </div>

                      <div className="h-px bg-slate-100 my-2" />
                      
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium w-full text-left"
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                          {copied ? <Check size={14} className="text-green-600" /> : <Link size={14} />}
                        </div>
                        {copied ? 'Copiado!' : 'Texto + Link'}
                      </button>
                      <button
                        onClick={handleCopyUrl}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium w-full text-left"
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                          {copiedUrl ? <Check size={14} className="text-green-600" /> : <Link size={14} />}
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
      </div>
    </motion.div>
  );
}
