import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Shield, Bell, Settings, TrendingUp, Users, ArrowRight, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useApp } from '../context/AppContext';
import { monthlySpending } from '../data/mockData';

export default function ParentDashboard() {
  const { student, transactions, notifications, setCurrentView } = useApp();
  
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const pendingApprovals = transactions.filter(t => t.status === 'PENDING').length;
  const totalSpentMonth = transactions
    .filter(t => t.status === 'COMPLETED' && t.type === 'DEBIT')
    .reduce((acc, t) => acc + t.amount, 0);

  const categoryData = [
    { name: 'Transporte', value: 120, color: '#3B82F6' },
    { name: 'Alimentação', value: 280, color: '#10B981' },
    { name: 'Lazer', value: 150, color: '#F59E0B' },
    { name: 'Educação', value: 90, color: '#8B5CF6' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      {/* Sidebar */}
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
              { icon: LayoutDashboard, label: 'Dashboard', view: 'parent-dashboard' as const, active: true },
              { icon: Shield, label: 'Controles', view: 'parent-controls' as const, active: false },
              { icon: Bell, label: `Aprovações (${pendingApprovals})`, view: 'parent-approvals' as const, active: false },
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

        <div className="mt-auto p-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-[#0A0E17] font-bold text-xs">LS</span>
              </div>
              <div>
                <p className="text-sm font-medium">{student.name}</p>
                <p className="text-xs text-gray-400">{student.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${student.autonomyLevel}%` }} />
              </div>
              <span className="text-xs text-gray-400">{student.autonomyLevel}%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-[#0A0E17] font-bold text-xs">L</span>
            </div>
            <span className="font-bold font-['Space_Grotesk'] text-sm">Copiloto</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('parent-approvals')}
              className="relative w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center"
            >
              <Bell className="w-4 h-4 text-gray-400" />
              {pendingApprovals > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                  {pendingApprovals}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Tabs */}
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
                item.view === 'parent-dashboard' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'
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
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Saldo do Filho', value: `R$ ${student.account.balance.toFixed(2)}`, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Gasto no Mês', value: `R$ ${totalSpentMonth.toFixed(2)}`, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Aprovações Pendentes', value: pendingApprovals.toString(), icon: Bell, color: 'text-red-400', bg: 'bg-red-500/10' },
            { label: 'Nível de Autonomia', value: `${student.autonomyLevel}%`, icon: Users, color: 'text-green-400', bg: 'bg-green-500/10' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
            >
              <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className="text-xl font-bold mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Spending Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
          >
            <h3 className="font-semibold mb-4">Gastos Mensais por Categoria</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#131A2E', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="transporte" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alimentacao" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lazer" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="educacao" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
          >
            <h3 className="font-semibold mb-4">Distribuição este mês</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-gray-400">{cat.name}</span>
                    <span className="text-xs font-medium ml-auto">R$ {cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spending Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-8"
        >
          <h3 className="font-semibold mb-4">Tendência de Gastos (6 meses)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlySpending.map(m => ({ ...m, total: m.transporte + m.alimentacao + m.lazer + m.educacao }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#131A2E', border: '1px solid #ffffff10', borderRadius: '12px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="total" stroke="#FFB300" fill="#FFB30020" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setCurrentView('parent-controls')}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-left hover:border-amber-500/20 transition-all group"
          >
            <Shield className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="font-semibold mb-1">Configurar Limites</h4>
            <p className="text-xs text-gray-400">Ajuste limites por categoria e geofencing</p>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setCurrentView('parent-approvals')}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-left hover:border-amber-500/20 transition-all group"
          >
            <Bell className="w-8 h-8 text-red-400 mb-3" />
            <h4 className="font-semibold mb-1">Aprovações Pendentes</h4>
            <p className="text-xs text-gray-400">{pendingApprovals} transações aguardando</p>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => setCurrentView('face-check')}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-left hover:border-amber-500/20 transition-all group"
          >
            <MapPin className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-semibold mb-1">Face Check</h4>
            <p className="text-xs text-gray-400">Verificação biométrica de segurança</p>
            <ArrowRight className="w-4 h-4 text-gray-500 mt-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </main>
    </div>
  );
}
