import { Heart, BookOpen, Star, Coffee, Cloud } from 'lucide-react';

const categories = [
  { name: 'Orações', icon: Heart, color: 'bg-rose-50 text-rose-600', count: 124 },
  { name: 'Reflexões', icon: BookOpen, color: 'bg-indigo-50 text-indigo-600', count: 86 },
  { name: 'Gratidão', icon: Star, color: 'bg-amber-50 text-amber-600', count: 52 },
  { name: 'Motivação', icon: Coffee, color: 'bg-emerald-50 text-emerald-600', count: 43 },
  { name: 'Paz', icon: Cloud, color: 'bg-sky-50 text-sky-600', count: 31 },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Navegue por Temas</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore nossas mensagens organizadas por categorias para encontrar exatamente o que sua alma precisa hoje.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 text-center"
            >
              <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.name}</h3>
              <p className="text-sm text-slate-400">{cat.count} mensagens</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
