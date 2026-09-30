import React from 'react';
import { motion } from 'framer-motion';
import { Home, Target, GraduationCap, CreditCard, Sparkles, Bell, ChevronRight, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentHome() {
  const { student, transactions, goals, setCurrentView } = useApp();
  const recentTx = transactions.filter(t => t.status === 'COMPLETED').slice(0, 5);
  const xpProgress = (student.xp / student.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-[#0A0E17] font-bold text-sm">LS</span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Olá,</p>
              <p className="font-semibold text-sm">{student.name.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 text-xs font-bold">{student.xp} XP</span>
            </div>
            <button className="relative w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">2</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#131A2E] to-[#0D1320] border border-white/[0.06] rounded-3xl p-6 mb-6"
        >
          <p className="text-gray-400 text-sm mb-1">Saldo disponível</p>
          <p className="text-3xl font-bold font-['Space_Grotesk']">
            R$ {student.account.balance.toFixed(2).replace('.', ',')}
          </p>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-amber-500 text-[#0A0E17] font-bold py-3 rounded-xl text-sm hover:bg-amber-400 transition-colors">
              Pix
            </button>
            <button className="flex-1 bg-white/5 border border-white/10 font-medium py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">
              Transferir
            </button>
            <button className="flex-1 bg-white/5 border border-white/10 font-medium py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">
              Cartão
            </button>
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌟</span>
              <div>
                <p className="font-semibold text-sm">{student.level}</p>
                <p className="text-xs text-gray-400">{student.xp}/{student.nextLevelXp} XP</p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-medium">Autonomia: {student.autonomyLevel}%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Faltam {student.nextLevelXp - student.xp} XP para o próximo nível</p>
        </motion.div>

        {/* Goals Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Minhas Metas</h3>
            <button onClick={() => setCurrentView('student-goals')} className="text-amber-400 text-sm flex items-center gap-1">
              Ver todas <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {goals.map(goal => (
              <div key={goal.id} className="min-w-[160px] bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
                <span className="text-2xl">{goal.icon}</span>
                <p className="font-medium text-sm mt-2">{goal.title}</p>
                <p className="text-xs text-gray-400 mt-1">
                  R$ {goal.currentAmount} / {goal.targetAmount}
                </p>
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%`, backgroundColor: goal.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-3">Últimas Transações</h3>
          <div className="space-y-2">
            {recentTx.map(tx => (
              <div key={tx.id} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    tx.type === 'CASHBACK' || tx.type === 'PIX_IN'
                      ? 'bg-green-500/10'
                      : 'bg-red-500/10'
                  }`}>
                    {tx.type === 'CASHBACK' || tx.type === 'PIX_IN' ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.merchant || tx.category}</p>
                  </div>
                </div>
                <p className={`font-semibold text-sm ${
                  tx.type === 'CASHBACK' || tx.type === 'PIX_IN' ? 'text-green-400' : 'text-white'
                }`}>
                  {tx.type === 'CASHBACK' || tx.type === 'PIX_IN' ? '+' : '-'}R$ {tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0E17]/90 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-3">
          {[
            { icon: Home, label: 'Início', view: 'student-home' as const, active: true },
            { icon: Target, label: 'Metas', view: 'student-goals' as const, active: false },
            { icon: GraduationCap, label: 'Clareira', view: 'student-clareira' as const, active: false },
            { icon: CreditCard, label: 'Crédito', view: 'student-credit' as const, active: false },
          ].map(item => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors ${
                item.active ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
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
