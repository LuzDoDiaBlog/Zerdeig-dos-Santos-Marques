import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-xl text-white">
                  <Shield size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Política de Privacidade</h2>
                  <p className="text-sm text-slate-500">Última atualização: Abril de 2026</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <Eye size={20} />
                  <h3 className="font-bold text-lg">Coleta de Informações</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  No Luz do Dia, respeitamos sua privacidade. Coletamos apenas informações básicas necessárias para o funcionamento do blog, como seu endereço de e-mail (caso você se inscreva em nossa newsletter) e dados anônimos de navegação para melhorar sua experiência.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <Lock size={20} />
                  <h3 className="font-bold text-lg">Uso de Dados</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Seus dados nunca serão vendidos ou compartilhados com terceiros para fins comerciais. Utilizamos seu e-mail exclusivamente para enviar as reflexões e novidades que você solicitou. As reflexões pessoais que você escreve na seção de liturgia são armazenadas apenas no seu navegador (localStorage) e não são enviadas para nossos servidores.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <FileText size={20} />
                  <h3 className="font-bold text-lg">Cookies</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Utilizamos cookies essenciais para lembrar suas preferências (como o tema escolhido) e ferramentas de análise (como Google Analytics) para entender como o site é utilizado e como podemos melhorá-lo.
                </p>
              </section>

              <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                <p className="text-indigo-900 text-sm font-medium">
                  Ao utilizar nosso site, você concorda com os termos desta política. Se tiver dúvidas, entre em contato através do e-mail: <span className="font-bold">contato@luzdodia.com.br</span>
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 text-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
