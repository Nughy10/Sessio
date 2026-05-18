'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Zap, TrendingUp, Bell, Sparkles } from 'lucide-react';

type Language = 'es' | 'en';

const translations = {
  es: {
    brand: 'Sessio',
    tagline: 'Retención impulsada por IA',
    title: 'Recupera los Clientes que Estás Perdiendo',
    subtitle: 'Sessio predice abandono 7 días antes. Reconexión automática. Ingresos protegidos.',
    problemsTitle: 'El desafío real',
    problem1: '40% de abandono anual',
    problem1Desc: 'Coaches pierden clientes silenciosamente cada mes',
    problem2: 'Sin visibilidad',
    problem2Desc: 'Ni siquiera sabes por qué se van',
    problem3: 'Ingresos perdidos',
    problem3Desc: '500€-5.000€ por cliente desaparecido',
    benefitsTitle: 'La solución Sessio',
    benefit1: 'Predicción IA',
    benefit1Desc: 'Detecta clientes en riesgo 7 días antes',
    benefit2: 'Alertas Inteligentes',
    benefit2Desc: 'Notificaciones automáticas en tiempo real',
    benefit3: 'Reconexión Automática',
    benefit3Desc: 'Mensajes personalizados por IA',
    ctaTitle: 'Acceso Anticipado',
    ctaSubtitle: 'Semana 7 • Primeros 100 coaches • Acceso de por vida al precio actual',
    namePlaceholder: 'Nombre completo',
    emailPlaceholder: 'Email profesional',
    buttonSubmit: 'Activar Acceso Anticipado',
    buttonLoading: 'Registrando...',
    successTitle: '¡Bienvenido!',
    successMsg: 'Te notificaremos cuando lancemos Sessio. Eres parte de la revolución de retención.',
    errorMsg: 'Error al registrarse. Intenta de nuevo.',
    footerText: 'Designed for coaches, therapists & consultants',
    launchWeek: 'Lanzamiento Semana 7',
    earlyBadge: 'Acceso anticipado',
  },
  en: {
    brand: 'Sessio',
    tagline: 'AI-powered retention',
    title: 'Recover the Clients You\'re Losing',
    subtitle: 'Sessio predicts churn 7 days early. Auto reconnection. Revenue protected.',
    problemsTitle: 'The real challenge',
    problem1: '40% annual churn',
    problem1Desc: 'Coaches lose clients silently every month',
    problem2: 'No visibility',
    problem2Desc: 'You don\'t even know why they\'re leaving',
    problem3: 'Lost revenue',
    problem3Desc: '500€-5,000€ per client gone',
    benefitsTitle: 'The Sessio solution',
    benefit1: 'AI Prediction',
    benefit1Desc: 'Detects at-risk clients 7 days early',
    benefit2: 'Smart Alerts',
    benefit2Desc: 'Automatic real-time notifications',
    benefit3: 'Auto Reconnection',
    benefit3Desc: 'AI-personalized messages',
    ctaTitle: 'Early Access',
    ctaSubtitle: 'Week 7 • First 100 coaches • Lifetime pricing',
    namePlaceholder: 'Full name',
    emailPlaceholder: 'Professional email',
    buttonSubmit: 'Activate Early Access',
    buttonLoading: 'Registering...',
    successTitle: 'Welcome!',
    successMsg: 'We\'ll notify you when Sessio launches. You\'re part of the retention revolution.',
    errorMsg: 'Error registering. Try again.',
    footerText: 'Designed for coaches, therapists & consultants',
    launchWeek: 'Launch Week 7',
    earlyBadge: 'Early access',
  },
};

export default function EarlyAccess() {
  const [language, setLanguage] = useState<Language>('es');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, language: language }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail('');
        setName('');
      } else {
        setError(t.errorMsg);
      }
    } catch (err) {
      setError(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.5; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.1); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), inset 0 0 30px rgba(168, 85, 247, 0.2); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .orbe-1 {
          animation: float 8s ease-in-out infinite;
        }
        .orbe-2 {
          animation: float 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        .input-glow:focus {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .card-entrance {
          animation: slide-up 0.6s ease-out forwards;
        }
        .card-entrance:nth-child(2) {
          animation-delay: 0.1s;
        }
        .card-entrance:nth-child(3) {
          animation-delay: 0.2s;
        }
      `}</style>

      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="orbe-1 absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="orbe-2 absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black text-white text-lg tracking-tight">{t.brand}</p>
              <p className="text-xs text-purple-300 font-semibold">{t.tagline}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('es')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                language === 'es'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                language === 'en'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-16">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-full backdrop-blur-xl">
            <span className="text-sm font-bold text-purple-300">{t.earlyBadge}</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
            {t.title}
          </h1>
          <p className="text-xl sm:text-1.5xl text-gray-300 mb-8 leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* PROBLEMS SECTION */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">{t.problemsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: AlertCircle, color: 'from-red-500 to-pink-500', title: t.problem1, desc: t.problem1Desc },
              { icon: AlertCircle, color: 'from-orange-500 to-red-500', title: t.problem2, desc: t.problem2Desc },
              { icon: AlertCircle, color: 'from-yellow-500 to-orange-500', title: t.problem3, desc: t.problem3Desc },
            ].map((problem, idx) => (
              <div
                key={idx}
                className="card-entrance group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                  <problem.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                <p className="text-gray-400 leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">{t.benefitsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, color: 'from-green-500 to-emerald-500', title: t.benefit1, desc: t.benefit1Desc },
              { icon: Bell, color: 'from-blue-500 to-cyan-500', title: t.benefit2, desc: t.benefit2Desc },
              { icon: TrendingUp, color: 'from-purple-500 to-pink-500', title: t.benefit3, desc: t.benefit3Desc },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="card-entrance group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative bg-gradient-to-br from-purple-600/80 via-blue-600/80 to-cyan-600/80 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-black mb-3 text-white text-center leading-tight">{t.ctaTitle}</h2>
            <p className="text-blue-100 text-center mb-10 text-lg font-medium">{t.ctaSubtitle}</p>

            {success ? (
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-2xl p-10 text-center backdrop-blur-xl">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-white mb-2">{t.successTitle}</p>
                <p className="text-green-200 text-lg">{t.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  className="input-glow w-full px-6 py-4 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 bg-white/10 backdrop-blur font-medium transition-all duration-200 hover:bg-white/20"
                />
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  className="input-glow w-full px-6 py-4 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 bg-white/10 backdrop-blur font-medium transition-all duration-200 hover:bg-white/20"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full bg-gradient-to-r from-purple-400 to-pink-400 text-gray-900 hover:from-purple-300 hover:to-pink-300 disabled:opacity-50 font-black py-4 rounded-xl transition-all duration-300 text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95"
                >
                  {loading ? t.buttonLoading : t.buttonSubmit}
                </button>
                {error && <p className="text-red-300 text-center text-sm font-medium">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-400 mb-2 font-medium">{t.footerText}</p>
          <p className="text-sm text-gray-500">🚀 {t.launchWeek}</p>
        </div>
      </footer>
    </div>
  );
}