import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Target, GraduationCap, CreditCard, Plus, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentGoals() {
  const { goals, student, setCurrentView } = useApp();
  const [showAddGoal, setShowAddGoal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-lg font-bold font-['Space_Grotesk']">Minhas Metas</h1>
          <button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-[#0A0E17]" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Add Goal Form */}
        {showAddGoal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white/[0.03] border border-amber-500/20 rounded-2xl p-4 mb-6"
          >
            <h3 className="font-semibold mb-3 text-amber-400">Nova Meta</h3>
            <input
              type="text"
              placeholder="Nome da meta"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-amber-500/50"
            />
            <input
              type="number"
              placeholder="Valor alvo (R$)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-amber-500/50"
            />
            <div className="flex gap-2">
              <button className="flex-1 bg-amber-500 text-[#0A0E17] font-bold py-3 rounded-xl text-sm">
                Criar Meta
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="px-4 bg-white/5 border border-white/10 rounded-xl text-sm"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal, i) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${goal.color}15` }}
                    >
                      {goal.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <p className="text-xs text-gray-400">
                        {goal.deadline && `Prazo: ${new Date(goal.deadline).toLocaleDateString('pt-BR')}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-lg" style={{ backgroundColor: `${goal.color}15`, color: goal.color }}>
                    {progress.toFixed(0)}%
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">
                      R$ {goal.currentAmount.toFixed(2)} de R$ {goal.targetAmount.toFixed(2)}
                    </span>
                    <span className="text-amber-400 font-medium">
                      Faltam R$ {remaining.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: goal.color }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-xl text-xs font-medium hover:bg-white/10 transition-colors">
                    <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
                    Depositar
                  </button>
                  <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-xl text-xs font-medium hover:bg-white/10 transition-colors">
                    Ver detalhes
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/10 rounded-2xl p-5"
        >
          <h3 className="font-semibold text-amber-400 mb-2">💡 Dica do dia</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Separar 10% da mesada automaticamente para suas metas é um ótimo hábito. 
            Complete o curso "Orçamento Inteligente" na Clareira para ganhar R$ 3,00 de cashback!
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
                item.view === 'student-goals' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
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
