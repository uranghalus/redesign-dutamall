import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Input/Form field — design.md
 * - radius none (0px), tanpa shadow
 * - border default monokrom (text/15), focus/error pakai primary #f00808
 * - label & placeholder pakai typography.body: SUIT 14px 700 letter -0.28px line 1, placeholder text-muted #666666
 * - spacing scale, motion fast + easing
 * - states: hover/focus/active/disabled/empty/error
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", label, error, hint, id, disabled, ...props }, ref) => {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-[5px]">
      {label && (
        <label
          htmlFor={inputId}
          className="font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-text peer-disabled:text-text-muted"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={
          "peer w-full font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-text placeholder:text-text-muted " +
          "bg-surface border rounded-none shadow-none " +
          "px-[11px] py-[8px] " +
          "transition-colors duration-[200ms] ease-[cubic-bezier(0.19,1,0.22,1)] " +
          "hover:border-text/30 " +
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 " +
          "disabled:bg-surface disabled:text-text-muted disabled:border-text/10 disabled:cursor-not-allowed " +
          (error ? "border-primary " : "border-text/15 ") +
          className
        }
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-primary">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
Input.displayName = "Input";

export function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={
        "w-full font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-text placeholder:text-text-muted " +
        "bg-surface border border-text/15 rounded-none shadow-none " +
        "px-[11px] py-[8px] min-h-[80px] " +
        "transition-colors duration-[200ms] ease-[cubic-bezier(0.19,1,0.22,1)] " +
        "hover:border-text/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 disabled:opacity-40 " +
        className
      }
      {...props}
    />
  );
}
