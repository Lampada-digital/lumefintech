import React from 'react';
import { motion } from 'framer-motion';
import { Home, Target, GraduationCap, CreditCard, Laptop, BookOpen, Shield, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentCredit() {
  const { student, setCurrentView } = useApp();

  const products = [
    {
      id: 'setup',
      name: 'Lume Setup',
      icon: Laptop,
      description: 'Financiamento de equipamentos para estudos com garantia tecnológica inclusa (MDM).',
      maxAmount: 5000,
      installments: '6x a 12x',
      rate: '1.5% a.m.',
      benefits: ['Garantia estendida', 'Seguro contra roubo', 'Suporte técnico'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'salto',
      name: 'Lume Salto',
      icon: BookOpen,
      description: 'Financiamento estudantil modelo ISA — você paga uma % da renda futura após formado.',
      maxAmount: 20000,
      installments: 'ISA: até 5% da renda',
      rate: 'Sem juros fixos',
      benefits: ['Sem parcela fixa', 'Paga só quando empregado', 'Cap máximo de 2x'],
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-lg font-bold font-['Space_Grotesk']">Crédito Estudantil</h1>
          <p className="text-xs text-gray-400">Produtos exclusivos para seu futuro</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/10 rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400">Seu Score Lume</p>
              <p className="text-3xl font-bold font-['Space_Grotesk'] text-amber-400">720</p>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-white/5"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                />
                <path
                  className="stroke-amber-400"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray="72, 100"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-400">B+</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Baseado em: histórico de pagamentos, cursos completos, metas atingidas e comportamento financeiro.
          </p>
        </motion.div>

        {/* Products */}
        <div className="space-y-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                  <product.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{product.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <p className="text-xs text-gray-400">Até</p>
                  <p className="text-sm font-bold text-amber-400">R$ {(product.maxAmount / 1000).toFixed(0)}k</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <p className="text-xs text-gray-400">Parcelas</p>
                  <p className="text-sm font-bold">{product.installments.split(' ')[0]}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <p className="text-xs text-gray-400">Taxa</p>
                  <p className="text-sm font-bold">{product.rate.split(' ')[0]}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                {product.benefits.map((benefit, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-xs text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#0A0E17] font-bold py-3 rounded-xl text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                Simular {product.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pending Request */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-amber-400">Solicitação Pendente</h3>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Lume Setup - Notebook</span>
              <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded-lg">Análise</span>
            </div>
            <p className="text-xs text-gray-400">Dell Inspiron 15 - R$ 3.500,00</p>
            <p className="text-xs text-gray-500 mt-2">Solicitado em 05/12/2024</p>
            <div className="flex items-center gap-2 mt-3">
              <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs text-yellow-400">Aguardando aprovação do responsável</span>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-start gap-3 bg-white/[0.02] border border-white/[0.04] rounded-xl p-4"
        >
          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">
            Todas as análises de crédito seguem políticas de compliance com verificação PLD/FTP. 
            Para menores de 18 anos, é necessária autorização do responsável legal.
          </p>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0E17]/90 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-3">
          {[
            { icon: Home, label: 'Início', view: 'student-home' as const },
            { icon: Target, label: 'Metas', view: 'student-goals' as const },
            { icon: GraduationCap, label: 'Clareira', view: 'student-clareira' as const },
            { icon: CreditCard, label: 'Crédito', view: 'student-credit' as const },
          ].map(item => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors ${
                item.view === 'student-credit' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
