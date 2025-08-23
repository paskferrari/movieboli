import React from 'react';
import { motion } from 'framer-motion';

// Componente LineChart per grafici a linee
export const LineChart = ({ data, title, xKey = 'date', yKey = 'value', color = 'blue' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Nessun dato disponibile
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item[yKey] || 0));
  const colorClasses = {
    blue: 'stroke-blue-500 fill-blue-100',
    green: 'stroke-green-500 fill-green-100',
    purple: 'stroke-purple-500 fill-purple-100',
    orange: 'stroke-orange-500 fill-orange-100'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Griglia di sfondo */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Linea del grafico */}
          {data.length > 1 && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d={`M ${data.map((item, index) => {
                const x = (index / (data.length - 1)) * 380 + 10;
                const y = 190 - ((item[yKey] || 0) / maxValue) * 180;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}`}
              className={colorClasses[color]}
              strokeWidth="3"
              fill="none"
            />
          )}
          
          {/* Punti sui dati */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 380 + 10;
            const y = 190 - ((item[yKey] || 0) / maxValue) * 180;
            return (
              <motion.circle
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                cx={x}
                cy={y}
                r="4"
                className={`fill-${color}-500`}
              />
            );
          })}
        </svg>
        
        {/* Etichette asse Y */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>0</span>
        </div>
      </div>
      
      {/* Etichette asse X */}
      <div className="flex justify-between mt-2 text-xs text-slate-500">
        {data.slice(0, 5).map((item, index) => (
          <span key={index}>
            {item[xKey] ? new Date(item[xKey]).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' }) : `Item ${index + 1}`}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Componente BarChart per grafici a barre
export const BarChart = ({ data, title, xKey = 'label', yKey = 'value', color = 'blue' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Nessun dato disponibile
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item[yKey] || 0));
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      
      <div className="space-y-3">
        {data.slice(0, 8).map((item, index) => {
          const percentage = maxValue > 0 ? (item[yKey] / maxValue) * 100 : 0;
          const label = item[xKey] || `Item ${index + 1}`;
          const value = item[yKey] || 0;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-700 font-medium truncate" title={label}>
                  {typeof label === 'string' && label.length > 20 ? `${label.substring(0, 20)}...` : label}
                </span>
                <span className="text-slate-900 font-semibold">{value}</span>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full ${colorClasses[color]} rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length > 8 && (
        <div className="mt-4 text-center">
          <span className="text-sm text-slate-500">
            Mostrando i primi 8 di {data.length} elementi
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default { LineChart, BarChart };