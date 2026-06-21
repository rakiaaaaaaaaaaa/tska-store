import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-ui font-medium text-brand-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`
          w-full px-4 py-2.5 rounded-xl border border-brand-line bg-white text-brand-ink
          placeholder:text-brand-muted font-ui text-sm
          focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-light
          transition-all duration-200
          ${className}
        `.trim()}
      />
    </div>
  )
);

Input.displayName = 'Input';
export default Input;
