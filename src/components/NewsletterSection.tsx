import { useState, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setStatus('loading');
    
    // Simula uma chamada de API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulação de erro aleatório para demonstração (10% de chance)
      if (Math.random() < 0.1) {
        throw new Error('Ocorreu um erro ao processar sua inscrição. Tente novamente.');
      }
      
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 text-white">
              <Mail size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Receba Luz no seu E-mail
            </h2>
            <p className="text-indigo-100 text-lg mb-10">
              Junte-se a mais de 10.000 pessoas que recebem nossas orações e reflexões diárias diretamente na caixa de entrada.
            </p>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
                >
                  <div className="flex flex-col items-center gap-4 text-white">
                    <CheckCircle2 size={48} className="text-emerald-400" />
                    <h3 className="text-2xl font-bold">Inscrição Confirmada!</h3>
                    <p className="text-indigo-100">Obrigado por se juntar a nós. Em breve você receberá sua primeira mensagem de luz.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-4 px-6 py-2 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
                    >
                      Voltar
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative" onSubmit={handleSubmit}>
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu melhor e-mail"
                        className={`w-full px-6 py-4 rounded-2xl bg-white text-slate-900 focus:outline-none focus:ring-4 transition-all ${
                          !isValid ? 'ring-4 ring-rose-400/50' : 'focus:ring-indigo-400/50'
                        }`}
                        required
                        disabled={status === 'loading'}
                      />
                      {!isValid && (
                        <div className="absolute left-0 -bottom-6 flex items-center gap-1 text-rose-200 text-xs font-medium">
                          <AlertCircle size={12} />
                          <span>Por favor, insira um e-mail válido.</span>
                        </div>
                      )}
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center min-w-[140px]"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        'Inscrever-se'
                      )}
                    </button>
                  </form>
                  
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-4 bg-rose-500/20 border border-rose-500/30 rounded-2xl text-rose-100 text-sm flex items-center gap-3 justify-center"
                    >
                      <AlertCircle size={18} />
                      {errorMsg}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-8 text-indigo-200 text-sm">
              Respeitamos sua privacidade. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
