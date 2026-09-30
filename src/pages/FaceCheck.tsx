import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, X, Camera, Fingerprint, ArrowLeft, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

type FaceCheckState = 'idle' | 'scanning' | 'liveness' | 'verifying' | 'success' | 'failed';

export default function FaceCheck() {
  const { setCurrentView, setFaceCheckComplete } = useApp();
  const [state, setState] = useState<FaceCheckState>('idle');
  const [progress, setProgress] = useState(0);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    if (state === 'scanning') {
      const interval = setInterval(() => {
        setScanLine(prev => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    if (state === 'verifying') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState('success'), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [state]);

  const startCheck = () => {
    setState('scanning');
    setTimeout(() => {
      setState('liveness');
      setTimeout(() => {
        setState('verifying');
      }, 2000);
    }, 3000);
  };

  const handleComplete = () => {
    setFaceCheckComplete(true);
    setCurrentView('parent-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-4">
          <button onClick={() => setCurrentView('parent-dashboard')} className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-bold font-['Space_Grotesk']">Face Check</h1>
            <p className="text-xs text-gray-400">Verificação Biométrica</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                  <Shield className="w-16 h-16 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-3">Verificação de Segurança</h2>
                <p className="text-gray-400 text-sm mb-2">
                  Para operações de alto risco, realizamos uma verificação biométrica cruzada entre responsável e estudante.
                </p>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-6 text-left">
                  <h4 className="text-sm font-medium mb-2 text-amber-400">🔐 Quando é necessário:</h4>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    <li>• Solicitação de crédito acima de R$ 1.000</li>
                    <li>• Troca de dispositivo vinculado</li>
                    <li>• Alteração de limites parentais</li>
                    <li>• Primeiro acesso em novo dispositivo</li>
                  </ul>
                </div>
                <button
                  onClick={startCheck}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#0A0E17] font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Iniciar Verificação
                </button>
              </motion.div>
            )}

            {state === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="relative w-64 h-64 mx-auto mb-8">
                  {/* Face outline */}
                  <div className="absolute inset-0 border-2 border-amber-400/30 rounded-[40%] overflow-hidden">
                    {/* Scan line */}
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      style={{ top: `${scanLine}%` }}
                    />
                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={`h-${i}`} className="absolute w-full h-px bg-amber-400/30" style={{ top: `${(i + 1) * 12.5}%` }} />
                      ))}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={`v-${i}`} className="absolute h-full w-px bg-amber-400/30" style={{ left: `${(i + 1) * 12.5}%` }} />
                      ))}
                    </div>
                    {/* Face placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-24 border-2 border-amber-400/50 rounded-[50%] flex items-center justify-center">
                        <div className="flex gap-3 mt-2">
                          <div className="w-2 h-2 bg-amber-400/50 rounded-full" />
                          <div className="w-2 h-2 bg-amber-400/50 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Escaneando...</h3>
                <p className="text-sm text-gray-400">Posicione seu rosto dentro da área indicada</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-xs text-amber-400">Detectando vivacidade (Liveness)</span>
                </div>
              </motion.div>
            )}

            {state === 'liveness' && (
              <motion.div
                key="liveness"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <Fingerprint className="w-16 h-16 text-green-400 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Verificação de Vivacidade</h3>
                <p className="text-sm text-gray-400 mb-4">Confirmando que é uma pessoa real...</p>
                <div className="flex justify-center gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {state === 'verifying' && (
              <motion.div
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="stroke-white/10"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                    />
                    <path
                      className="stroke-amber-400"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                      strokeDasharray={`${progress}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-400">{progress}%</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Validação Cruzada</h3>
                <p className="text-sm text-gray-400">Comparando biometria do responsável com registro...</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>Criptografia AES-256 ativa</span>
                  </div>
                </div>
              </motion.div>
            )}

            {state === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20"
                >
                  <Check className="w-12 h-12 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">Verificação Concluída!</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Identidade confirmada com sucesso. Todos os dados foram processados com criptografia de ponta a ponta.
                </p>
                <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4 mb-6 text-left">
                  <h4 className="text-sm font-medium text-green-400 mb-2">✅ Resultado da verificação:</h4>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    <li>• Face Match: <span className="text-green-400">98.7% de similaridade</span></li>
                    <li>• Liveness: <span className="text-green-400">Aprovado</span></li>
                    <li>• Cross-validation: <span className="text-green-400">Confirmado</span></li>
                    <li>• Audit Log: <span className="text-gray-300">#FC-2024-12-10-0042</span></li>
                  </ul>
                </div>
                <button
                  onClick={handleComplete}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-green-500/25 transition-all"
                >
                  Continuar para o Painel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
