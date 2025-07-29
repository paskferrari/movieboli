import React from 'react';
import { motion } from 'framer-motion';

const DemographicsChart = ({ users }) => {
  // Calcola le statistiche demografiche
  const calculateDemographics = () => {
    if (!users || users.length === 0) {
      return {
        ageGroups: {},
        genderDistribution: {},
        totalUsers: 0
      };
    }

    const ageGroups = {
      '13-17': 0,
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55+': 0
    };

    const genderDistribution = {
      'M': 0,
      'F': 0,
      'Altro': 0,
      'Preferisco non rispondere': 0
    };

    users.forEach(user => {
      // Calcola gruppo età
      const age = user.age;
      if (age >= 13 && age <= 17) ageGroups['13-17']++;
      else if (age >= 18 && age <= 24) ageGroups['18-24']++;
      else if (age >= 25 && age <= 34) ageGroups['25-34']++;
      else if (age >= 35 && age <= 44) ageGroups['35-44']++;
      else if (age >= 45 && age <= 54) ageGroups['45-54']++;
      else if (age >= 55) ageGroups['55+']++;

      // Calcola distribuzione genere
      if (genderDistribution.hasOwnProperty(user.gender)) {
        genderDistribution[user.gender]++;
      }
    });

    return {
      ageGroups,
      genderDistribution,
      totalUsers: users.length
    };
  };

  const { ageGroups, genderDistribution, totalUsers } = calculateDemographics();

  // Calcola percentuali
  const getPercentage = (count) => {
    if (totalUsers === 0) return 0;
    return Math.round((count / totalUsers) * 100);
  };

  // Colori per i grafici
  const ageColors = {
    '13-17': 'bg-purple-500',
    '18-24': 'bg-blue-500',
    '25-34': 'bg-green-500',
    '35-44': 'bg-yellow-500',
    '45-54': 'bg-orange-500',
    '55+': 'bg-red-500'
  };

  const genderColors = {
    'M': 'bg-blue-500',
    'F': 'bg-pink-500',
    'Altro': 'bg-purple-500',
    'Preferisco non rispondere': 'bg-gray-500'
  };

  const genderLabels = {
    'M': 'Maschio',
    'F': 'Femmina',
    'Altro': 'Altro',
    'Preferisco non rispondere': 'Non specificato'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Distribuzione per Età */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20"
      >
        <h3 className="text-xl font-bold text-movieboli-crema mb-6">
          Distribuzione per Età
        </h3>
        
        <div className="space-y-4">
          {Object.entries(ageGroups).map(([ageGroup, count], index) => {
            const percentage = getPercentage(count);
            
            return (
              <div key={ageGroup} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-movieboli-crema/80 font-medium">
                    {ageGroup} anni
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-movieboli-crema">{count}</span>
                    <span className="text-movieboli-crema/60 text-sm">({percentage}%)</span>
                  </div>
                </div>
                
                <div className="w-full bg-movieboli-neroProfondo/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${ageColors[ageGroup]} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-movieboli-violaPrincipale/20 text-center">
          <p className="text-2xl font-bold text-movieboli-violaPrincipale">{totalUsers}</p>
          <p className="text-movieboli-crema/60 text-sm">Utenti Totali</p>
        </div>
      </motion.div>

      {/* Distribuzione per Genere */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20"
      >
        <h3 className="text-xl font-bold text-movieboli-crema mb-6">
          Distribuzione per Genere
        </h3>
        
        <div className="space-y-4">
          {Object.entries(genderDistribution).map(([gender, count], index) => {
            const percentage = getPercentage(count);
            
            return (
              <div key={gender} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-movieboli-crema/80 font-medium">
                    {genderLabels[gender]}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-movieboli-crema">{count}</span>
                    <span className="text-movieboli-crema/60 text-sm">({percentage}%)</span>
                  </div>
                </div>
                
                <div className="w-full bg-movieboli-neroProfondo/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className={`h-full ${genderColors[gender]} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Grafico a torta semplificato */}
        <div className="mt-6 pt-4 border-t border-movieboli-violaPrincipale/20">
          <div className="flex justify-center">
            <div className="flex space-x-1 rounded-full overflow-hidden h-4 w-48">
              {Object.entries(genderDistribution).map(([gender, count]) => {
                const percentage = getPercentage(count);
                if (percentage === 0) return null;
                
                return (
                  <motion.div
                    key={gender}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 1 }}
                    className={`${genderColors[gender]} h-full`}
                    title={`${genderLabels[gender]}: ${count} (${percentage}%)`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemographicsChart;