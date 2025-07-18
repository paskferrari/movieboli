import { useBranding, useBrandingClasses } from '../../contexts/BrandingContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Componente Button adattivo che cambia stile in base al contesto di branding
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const branding = useBranding();
  const classes = useBrandingClasses();

  // Varianti di stile
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'terracotta':
        return 'btn-terracotta';
      case 'ghost':
        return 'btn-ghost';
      case 'festival':
        return branding.isFestival() ? 'festival-badge' : 'btn-primary';
      case 'podcast':
        return 'bg-movieboli-podcast hover:bg-movieboli-podcast-dark text-white px-4 py-2 rounded-lg transition-colors duration-200';
      default:
        return 'btn-primary';
    }
  };

  // Dimensioni
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-1.5';
      case 'md':
        return 'text-base px-4 py-2';
      case 'lg':
        return 'text-lg px-6 py-3';
      default:
        return 'text-base px-4 py-2';
    }
  };

  // Classi di base
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-movieboli
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  // Contenuto con icona
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  // Animazione
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  // Rendering condizionale: Link o Button
  if (href) {
    return (
      <Link href={href} legacyBehavior passHref>
        <motion.a
          className={baseClasses}
          {...motionProps}
          {...props}
        >
          {content}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={baseClasses}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
};

/**
 * Variante IconButton
 */
export const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <Button
      variant={variant}
      className={`${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon}
    </Button>
  );
};

/**
 * Variante ButtonGroup
 */
export const ButtonGroup = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  // Clona i figli per passare le props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        variant,
        size,
        className: 'first:rounded-r-none last:rounded-l-none rounded-none border-r-0 last:border-r',
      });
    }
    return child;
  });

  return (
    <div className={`inline-flex ${className}`} {...props}>
      {childrenWithProps}
    </div>
  );
};

export default Button;