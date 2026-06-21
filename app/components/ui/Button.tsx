import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'ink';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantMap = {
  primary: 'bg-brand-primary text-white hover:bg-brand-deep',
  ghost: 'border border-white text-white hover:bg-white hover:text-brand-ink',
  outline: 'border border-brand-line text-brand-ink hover:border-brand-primary hover:text-brand-primary',
  ink: 'bg-brand-ink text-white hover:bg-brand-primary',
};

const sizeMap = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        font-ui font-semibold rounded-full transition-all duration-200 active:scale-95 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantMap[variant]} ${sizeMap[size]} ${className}
      `.trim()}
    >
      {children}
    </button>
  );
}
