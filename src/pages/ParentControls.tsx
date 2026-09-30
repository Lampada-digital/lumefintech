import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Shield, Bell, ArrowLeft, Save, MapPin, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TransactionCategory } from '../types';

export default function ParentControls() {
  const { parentalRules, updateRule, setCurrentView, student } = useApp();
  const [saved, setSaved] = useState(false);

  const categoryLabels: Record<TransactionCategory, string> = {
    TRANSPORTE: '🚌 Transporte',
    ALIMENTACAO: '🍔 Alimentação',
    LAZER: '🎮 Lazer',
    EDUCACAO: '📚 Educação',
    SAUDE: '💊 Saúde',
    OUTROS: '📦 Outros',
  };

  const categoryColors: Record<TransactionCategory, string> = {
    TRANSPORTE: '#3B82F6',
    ALIMENTACAO: '#10B981',
    LAZER: '#F59E0B',
    EDUCACAO: '#8B5CF6',
    SAUDE: '#EF4444',
    OUTROS: '#6B7280',
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
              { icon: Shield, label: 'Controles', view: 'parent-controls' as const, active: true },
              { icon: Bell, label: 'Aprovações', view: 'parent-approvals' as const, active: false },
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
          <h1 className="font-bold font-['Space_Grotesk']">Controles Parentais</h1>
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
                item.view === 'parent-controls' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-['Space_Grotesk']">Controles Parentais</h2>
              <p className="text-sm text-gray-400 mt-1">Gerencie limites e regras para {student.name}</p>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                saved ? 'bg-green-500 text-white' : 'bg-amber-500 text-[#0A0E17] hover:bg-amber-400'
              }`}
            >
              <Save className="w-4 h-4" />
              {saved ? 'Salvo!' : 'Salvar'}
            </button>
          </div>

          {/* Autonomy Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/10 rounded-2xl p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Nível de Autonomia Progressiva</h3>
              <span className="text-amber-400 font-bold">{student.autonomyLevel}%</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              O nível de autonomia aumenta conforme {student.name.split(' ')[0]} completa cursos, atinge metas e mantém bom histórico financeiro.
            </p>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all" style={{ width: `${student.autonomyLevel}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Iniciante</span>
              <span>Explorador</span>
              <span>Avançado</span>
              <span>Mestre</span>
            </div>
          </motion.div>

          {/* Category Limits */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-lg">Limites por Categoria</h3>
            {parentalRules.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[rule.category] }} />
                    <h4 className="font-medium">{categoryLabels[rule.category]}</h4>
                  </div>
                  <button
                    onClick={() => updateRule(rule.id, { requiresApproval: !rule.requiresApproval })}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs text-gray-400">
                      {rule.requiresApproval ? 'Aprovação obrigatória' : 'Livre'}
                    </span>
                    {rule.requiresApproval ? (
                      <ToggleRight className="w-6 h-6 text-amber-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Limite Diário</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">R$</span>
                      <input
                        type="number"
                        defaultValue={rule.dailyLimit}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Limite Mensal</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">R$</span>
                      <input
                        type="number"
                        defaultValue={rule.monthlyLimit}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Geofencing */}
                {rule.isGeofenced && rule.safeZones && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">Zonas Seguras</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rule.safeZones.map(zone => (
                        <span key={zone.id} className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-lg">
                          📍 {zone.name} ({zone.radius}m)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Alerts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Alertas e Notificações
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Alertas fora de zona segura', enabled: true },
                { label: 'Notificar transações acima de R$ 30', enabled: true },
                { label: 'Resumo semanal por email', enabled: false },
                { label: 'Alertas de novo dispositivo', enabled: true },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-300">{alert.label}</span>
                  <button className={alert.enabled ? 'text-amber-400' : 'text-gray-600'}>
                    {alert.enabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
