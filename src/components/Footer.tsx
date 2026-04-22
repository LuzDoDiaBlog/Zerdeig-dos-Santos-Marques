import { useState } from 'react';
import { Sun, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Sun size={24} />
              </div>
              <span className="text-xl font-bold text-white">Luz do Dia</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Nossa missão é levar uma palavra de conforto, esperança e fé para o seu dia a dia através de mensagens inspiradoras.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Explorar</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Orações da Manhã</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Reflexões de Fé</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Gratidão Diária</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Mensagens de Paz</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Suporte</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contato</a></li>
              <li>
                <button 
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Privacidade
                </button>
              </li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <p className="text-slate-400 mb-4">
              Dúvidas ou sugestões? Entre em contato conosco.
            </p>
            <a href="mailto:contato@luzdodia.com" className="text-indigo-400 font-medium hover:underline">
              contato@luzdodia.com
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Luz do Dia (Anônimo). Todos os direitos reservados.</p>
        </div>
      </div>

      <PrivacyPolicyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </footer>
  );
}
