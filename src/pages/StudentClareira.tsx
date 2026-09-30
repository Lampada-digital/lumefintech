import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Target, GraduationCap, CreditCard, Play, Check, Lock, Trophy, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentClareira() {
  const { courses, setCurrentView } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const completedCourses = courses.filter(c => c.completed);
  const availableCourses = courses.filter(c => !c.completed);
  const totalXp = completedCourses.reduce((acc, c) => acc + c.xpReward, 0);
  const totalCashback = completedCourses.reduce((acc, c) => acc + c.cashbackReward, 0);

  const handleStartCourse = (courseId: string) => {
    setSelectedCourse(courseId);
    setQuizActive(true);
    setQuizAnswer(null);
    setQuizComplete(false);
  };

  const handleAnswer = (idx: number) => {
    setQuizAnswer(idx);
    setTimeout(() => setQuizComplete(true), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold font-['Space_Grotesk']">A Clareira</h1>
            <div className="flex items-center gap-2">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-purple-400 text-xs font-bold">{completedCourses.length}/{courses.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500/10 to-amber-500/10 border border-white/[0.06] rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Seu Progresso</p>
              <p className="text-xs text-gray-400">Continue aprendendo para ganhar mais!</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-purple-400">{totalXp}</p>
              <p className="text-xs text-gray-400">XP Ganho</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-amber-400">R$ {totalCashback.toFixed(2)}</p>
              <p className="text-xs text-gray-400">Cashback</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz Modal */}
        <AnimatePresence>
          {quizActive && selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#0A0E17]/95 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div className="bg-[#131A2E] border border-white/10 rounded-3xl p-6 w-full max-w-md">
                {!quizComplete ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Play className="w-4 h-4 text-purple-400" />
                      </div>
                      <h3 className="font-bold">Quiz Rápido</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-6">
                      Qual é a principal vantagem de investir cedo?
                    </p>
                    <div className="space-y-3">
                      {['Juros compostos trabalham mais tempo', 'Risco zero de perda', 'Isenção de IR garantida', 'Liquidez imediata'].map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            quizAnswer === i
                              ? i === 0
                                ? 'bg-green-500/10 border-green-500/50 text-green-400'
                                : 'bg-red-500/10 border-red-500/50 text-red-400'
                              : 'bg-white/5 border-white/10 hover:border-amber-500/30'
                          }`}
                        >
                          <span className="text-sm">{option}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Parabéns! 🎉</h3>
                    <p className="text-gray-400 text-sm mb-4">Você acertou e ganhou:</p>
                    <div className="flex justify-center gap-4 mb-6">
                      <div className="bg-purple-500/10 rounded-xl px-4 py-2">
                        <p className="text-purple-400 font-bold">+200 XP</p>
                      </div>
                      <div className="bg-amber-500/10 rounded-xl px-4 py-2">
                        <p className="text-amber-400 font-bold">+R$ 5,00</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setQuizActive(false); setSelectedCourse(null); }}
                      className="bg-amber-500 text-[#0A0E17] font-bold px-8 py-3 rounded-xl"
                    >
                      Continuar
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed Courses */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Concluídos ({completedCourses.length})
          </h3>
          <div className="space-y-2">
            {completedCourses.map(course => (
              <div key={course.id} className="flex items-center gap-3 bg-green-500/5 border border-green-500/10 rounded-xl p-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-xl">
                  {course.thumbnail}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{course.title}</p>
                  <p className="text-xs text-gray-400">{course.duration} • +{course.xpReward} XP</p>
                </div>
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-green-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Courses */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Play className="w-4 h-4 text-amber-400" />
            Disponíveis ({availableCourses.length})
          </h3>
          <div className="space-y-3">
            {availableCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:border-amber-500/20 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                    {course.thumbnail}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{course.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{course.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-500">{course.duration}</span>
                      <span className="text-xs text-purple-400">+{course.xpReward} XP</span>
                      <span className="text-xs text-amber-400">+R$ {course.cashbackReward}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleStartCourse(course.id)}
                  className="w-full mt-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium py-2.5 rounded-xl text-sm hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Iniciar Curso
                </button>
              </motion.div>
            ))}
          </div>
        </div>
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
                item.view === 'student-clareira' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
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
