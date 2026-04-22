import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Comunidade Santa Fé",
    content: "O Luz do Dia se tornou meu companheiro matinal. A liturgia é fácil de ler e as orações geradas parecem falar diretamente ao meu coração.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "João Pedro",
    role: "Catequista",
    content: "Excelente ferramenta para quem busca se aprofundar na palavra. O design é limpo e a funcionalidade de reflexões pessoais ajuda muito no estudo bíblico.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Ana Clara",
    role: "Jovens em Missão",
    content: "Adoro como é fácil compartilhar a liturgia e as orações nas redes sociais. É uma forma moderna e linda de evangelizar meus amigos.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Vozes da Nossa Comunidade
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Saiba como o Luz do Dia está ajudando pessoas a fortalecerem sua fé e conexão espiritual diariamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 rotate-12 group-hover:rotate-0 transition-transform">
                <Quote size={24} />
              </div>

              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
