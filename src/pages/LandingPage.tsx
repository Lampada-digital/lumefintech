import React from 'react';
import { motion } from 'framer-motion';
import { Shield, GraduationCap, Wallet, Users, ArrowRight, Sparkles, Lock, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { setCurrentView, setFaceCheckComplete } = useApp();

  const handleEnter = (role: 'student' | 'parent') => {
    setFaceCheckComplete(true);
    if (role === 'student') setCurrentView('student-home');
    else setCurrentView('parent-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#0A0E17]" />
            </div>
            <span className="text-2xl font-bold font-['Space_Grotesk']">LUME</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-amber-400 transition-colors">Recursos</a>
            <a href="#security" className="hover:text-amber-400 transition-colors">Segurança</a>
            <a href="#education" className="hover:text-amber-400 transition-colors">Educação</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium">Fintech #1 para Estudantes</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold font-['Space_Grotesk'] max-w-4xl leading-tight"
          >
            Ilumine seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              futuro financeiro
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg lg:text-xl max-w-2xl mt-6 leading-relaxed"
          >
            A plataforma financeira que ensina jovens a cuidar do dinheiro com autonomia progressiva, 
            controle parental inteligente e educação gamificada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <button
              onClick={() => handleEnter('student')}
              className="group flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0A0E17] font-bold px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
            >
              <GraduationCap className="w-5 h-5" />
              Sou Estudante
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleEnter('parent')}
              className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
            >
              <Users className="w-5 h-5 text-amber-400" />
              Sou Responsável
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 text-sm mt-6"
          >
            🔒 Demo interativa — Clique para explorar o painel
          </motion.p>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-['Space_Grotesk'] mb-4">
            Tudo que o jovem precisa
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
            Uma plataforma completa que combina autonomia, segurança e aprendizado financeiro.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wallet, title: 'Conta Digital', desc: 'Pix, cartão virtual e físico com cashback em tudo', color: 'from-amber-500 to-orange-500' },
              { icon: Shield, title: 'Controle Parental', desc: 'Limites por categoria, geofencing e aprovação em tempo real', color: 'from-blue-500 to-cyan-500' },
              { icon: TrendingUp, title: 'Crédito Estudantil', desc: 'Lume Setup e Lume Salto com scoring inteligente', color: 'from-green-500 to-emerald-500' },
              { icon: GraduationCap, title: 'A Clareira', desc: 'Cursos gamificados que geram XP e cashback real', color: 'from-purple-500 to-pink-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-amber-500/20 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div id="security" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 text-sm font-medium">Segurança Zero Trust</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] mb-6">
                  Proteção de ponta a ponta
                </h2>
                <ul className="space-y-4">
                  {[
                    'Face Check com detecção de vivacidade (Liveness)',
                    '2FA Adaptativo baseado em risco da transação',
                    'Criptografia AES-256 para dados sensíveis',
                    'Logs de auditoria imutáveis (Blockchain-ready)',
                    'Conformidade LGPD e Bacen',
                    'Validação cruzada Pai ↔ Filho para alto risco',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-amber-400 rounded-full" />
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="bg-[#0D1320] border border-white/5 rounded-2xl p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-500 ml-2 text-xs">compliance-check.middleware.ts</span>
                  </div>
                  <pre className="text-gray-400 overflow-x-auto">
{`// PLD/FTP Verification Middleware
@Injectable()
export class ComplianceCheck {
  async validate(tx: Transaction) {
    const risk = await this.riskEngine
      .assess(tx);
    
    if (risk.level === 'HIGH') {
      // Cross-validation required
      await this.crossValidate({
        student: tx.student,
        parent: tx.guardian,
        amount: tx.amount,
      });
    }
    
    // Immutable audit log
    await this.audit.log({
      action: 'TX_VALIDATION',
      result: risk.level,
      timestamp: new Date(),
    });
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0A0E17]" />
            </div>
            <span className="font-bold font-['Space_Grotesk']">LUME</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Lume Fintech. CNPJ: 00.000.000/0001-00. Autorizado pelo Banco Central do Brasil.
          </p>
        </div>
      </footer>
    </div>
  );
}
