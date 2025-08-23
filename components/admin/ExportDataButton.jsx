import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExportDataButton = ({ 
  data, 
  format = 'csv', 
  label, 
  description,
  className = '' 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = (data) => {
    if (!data) return;
    
    let csvContent = '';
    
    if (data.filmStats) {
      // Export film statistics
      csvContent = 'Film,Total Votes,Average Rating,Median Rating,Standard Deviation,Voting Velocity,User Engagement,Trend\n';
      
      Object.entries(data.filmStats).forEach(([filmId, stats]) => {
        csvContent += `"${filmId}",${stats.totalVotes},${stats.averageRating},${stats.medianRating},${stats.standardDeviation?.toFixed(2) || 0},${stats.votingVelocity?.toFixed(2) || 0},${stats.userEngagement?.toFixed(2) || 0},${stats.trendDirection}\n`;
      });
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `movieboli-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = async (data) => {
    // Implementazione semplificata - in produzione useresti una libreria come jsPDF
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `movieboli-report-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = (data) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `movieboli-data-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async () => {
    if (!data) {
      alert('Nessun dato disponibile per l\'export');
      return;
    }

    setIsExporting(true);
    
    try {
      switch (format) {
        case 'csv':
          exportToCSV(data);
          break;
        case 'pdf':
          await exportToPDF(data);
          break;
        case 'json':
          exportToJSON(data);
          break;
        default:
          exportToJSON(data);
      }
    } catch (error) {
      console.error('Errore durante l\'export:', error);
      alert('Errore durante l\'export dei dati');
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = () => {
    switch (format) {
      case 'csv': return '📊';
      case 'pdf': return '📄';
      case 'json': return '💾';
      default: return '📁';
    }
  };

  const getDefaultLabel = () => {
    switch (format) {
      case 'csv': return 'Esporta CSV';
      case 'pdf': return 'Genera PDF';
      case 'json': return 'Esporta JSON';
      default: return 'Esporta Dati';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleExport}
      disabled={isExporting || !data}
      className={`
        bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20
        hover:border-movieboli-violaPrincipale/40 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-lg flex items-center justify-center">
          <span className="text-2xl">{getFormatIcon()}</span>
        </div>
        {isExporting && (
          <div className="w-6 h-6 border-2 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-movieboli-crema mb-2">
        {label || getDefaultLabel()}
      </h3>
      
      {description && (
        <p className="text-movieboli-crema/70 text-sm">
          {description}
        </p>
      )}
      
      <div className="mt-4 text-xs text-movieboli-crema/50">
        {isExporting ? 'Esportazione in corso...' : 'Clicca per esportare'}
      </div>
    </motion.button>
  );
};

export default ExportDataButton;