import { useBranding, useBrandingClasses } from '../../contexts/BrandingContext';
import { motion } from 'framer-motion';

/**
 * Card adattiva che cambia stile in base al contesto di branding
 */
export const AdaptiveCard = ({ 
  children, 
  className = '', 
  hover = true,
  variant = 'default',
  onClick,
  ...props 
}) => {
  const branding = useBranding();
  const classes = useBrandingClasses();
  
  // Varianti specifiche per il tipo di card
  const getVariantClasses = () => {
    switch (variant) {
      case 'podcast':
        return 'card-podcast';
      case 'festival':
        return branding.isFestival() ? 'festival-card' : 'card-movieboli';
      case 'highlight':
        return `${classes.card} border-2 ${classes.borderPrimary}`;
      default:
        return classes.card;
    }
  };
  
  const cardClasses = `
    ${getVariantClasses()}
    ${hover ? 'hover-lift cursor-pointer' : ''}
    ${className}
  `.trim();
  
  const CardComponent = onClick ? motion.div : 'div';
  
  const motionProps = onClick ? {
    whileHover: { scale: hover ? 1.02 : 1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
    onClick,
  } : {};
  
  return (
    <CardComponent 
      className={cardClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

/**
 * Card specifica per eventi
 */
export const EventCard = ({ 
  title, 
  date, 
  description, 
  image, 
  category,
  onClick,
  className = '' 
}) => {
  const branding = useBranding();
  const classes = useBrandingClasses();
  
  return (
    <AdaptiveCard 
      onClick={onClick}
      className={`overflow-hidden ${className}`}
      variant={branding.isFestival() ? 'festival' : 'default'}
    >
      {image && (
        <div className="aspect-video bg-movieboli-neutral-200 rounded-lg mb-4 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="space-y-3">
        {category && (
          <span className={`inline-block ${classes.badge} text-xs`}>
            {category}
          </span>
        )}
        
        <h3 className={`${classes.fontSecondary} text-xl font-semibold ${classes.textPrimary}`}>
          {title}
        </h3>
        
        {date && (
          <p className={`text-sm ${classes.textSecondary}`}>
            {date}
          </p>
        )}
        
        {description && (
          <p className="text-movieboli-neutral-600 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </AdaptiveCard>
  );
};

/**
 * Card per podcast
 */
export const PodcastCard = ({ 
  title, 
  episode, 
  duration, 
  description, 
  audioUrl,
  publishDate,
  onClick,
  className = '' 
}) => {
  const classes = useBrandingClasses();
  
  return (
    <AdaptiveCard 
      variant="podcast"
      onClick={onClick}
      className={className}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <span className="text-white/80 text-sm font-medium">
              Episodio {episode}
            </span>
            <h3 className="text-white text-lg font-semibold mt-1 leading-tight">
              {title}
            </h3>
          </div>
          
          {duration && (
            <span className="text-white/70 text-sm bg-white/20 px-2 py-1 rounded-full">
              {duration}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {publishDate && (
            <span className="text-white/70 text-xs">
              {publishDate}
            </span>
          )}
          
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            ▶ Ascolta
          </button>
        </div>
      </div>
    </AdaptiveCard>
  );
};

/**
 * Card per statistiche
 */
export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: IconComponent, 
  trend = 'neutral',
  subtitle,
  color = 'blue',
  className = '' 
}) => {
  const classes = useBrandingClasses();
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };
  
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 text-center ${className}`}>
      {IconComponent && (
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getColorClasses()} mb-4`}>
          <IconComponent className="w-6 h-6" />
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">
          {value}
        </h3>
        
        <p className="text-sm text-gray-600">
          {title}
        </p>
        
        {subtitle && (
          <p className="text-xs text-gray-500">
            {subtitle}
          </p>
        )}
        
        {change && (
          <p className={`text-xs ${getTrendColor()}`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdaptiveCard;