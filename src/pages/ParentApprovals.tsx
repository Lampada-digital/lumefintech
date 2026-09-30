import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Shield, Bell, ArrowLeft, Check, X, Clock, MapPin, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ParentApprovals() {
  const { transactions, approveTransaction, rejectTransaction, setCurrentView, student } = useApp();
  const pendingTx = transactions.filter(t => t.status === 'PENDING');

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0D1320] border-r border-white/5 hidden lg:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-[#0A0E17] font-bold text-xs">L</span>
            </div>
            <div>
              <p className="font-bold font-['Space_Grotesk'] text-sm">LUME</p>
              <p className="text-[10px] text-gray-500">Copiloto dos Pais</p>
            </div>
          </div>
          <nav className="space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', view: 'parent-dashboard' as const, active: false },
              { icon: Shield, label: 'Controles', view: 'parent-controls' as const, active: false },
              { icon: Bell, label: `Aprovações (${pendingTx.length})`, view: 'parent-approvals' as const, active: true },
            ].map(item => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  item.active
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => setCurrentView('parent-dashboard')} className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="font-bold font-['Space_Grotesk']">Aprovações</h1>
        </div>
        <div className="flex border-t border-white/5">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', view: 'parent-dashboard' as const },
            { icon: Shield, label: 'Controles', view: 'parent-controls' as const },
            { icon: Bell, label: 'Aprovações', view: 'parent-approvals' as const },
          ].map(item => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${
                item.view === 'parent-approvals' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-['Space_Grotesk']">Aprovações em Tempo Real</h2>
            <p className="text-sm text-gray-400 mt-1">Transações de {student.name} aguardando sua decisão</p>
          </div>

          {pendingTx.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tudo em ordem!</h3>
              <p className="text-gray-400 text-sm">Não há transações pendentes no momento.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {pendingTx.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-amber-500/10 rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-amber-400 font-medium">Aguardando aprovação</span>
                      </div>
                      <h4 className="font-semibold text-lg">{tx.description}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {tx.merchant} • {tx.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-400">R$ {tx.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(tx.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Context Info */}
                  <div className="bg-white/[0.03] rounded-xl p-3 mb-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-500">Categoria:</span>
                        <span className="ml-2 text-gray-300">{tx.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Limite diário usado:</span>
                        <span className="ml-2 text-gray-300">65%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Localização:</span>
                        <span className="ml-2 text-gray-300">Dentro da zona segura</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Risco PLD:</span>
                        <span className="ml-2 text-green-400">Baixo</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => approveTransaction(tx.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 font-medium py-3 rounded-xl hover:bg-green-500/20 transition-colors"
                    >
                      <Check className="w-5 h-5" />
                      Aprovar
                    </button>
                    <button
                      onClick={() => rejectTransaction(tx.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 font-medium py-3 rounded-xl hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-5 h-5" />
                      Recusar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Recent Approvals History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h3 className="font-semibold mb-4">Histórico Recente</h3>
            <div className="space-y-2">
              {transactions.filter(t => t.status === 'APPROVED' || t.status === 'COMPLETED').slice(0, 5).map(tx => (
                <div key={tx.id} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">R$ {tx.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Todas as aprovações são registradas em logs de auditoria imutáveis. 
              Para transações acima de R$ 200, é necessária validação cruzada via Face Check.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
