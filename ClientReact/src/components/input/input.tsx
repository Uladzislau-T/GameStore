import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

enum InputSize {
  SM = 'SM',
  BASE = 'BASE',
}

interface InputProps {
  cssclasses:string,
  placeholder: ComponentPropsWithRef<'input'>['placeholder'];
  name: ComponentPropsWithRef<'input'>['name'];
  onChange: ComponentPropsWithRef<'input'>['onChange'];
  onBlur: ComponentPropsWithRef<'input'>['onBlur'];
  type?: ComponentPropsWithRef<'input'>['type'];
  size?: keyof typeof InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = InputSize.BASE, ...inputProps }, ref) => {
    // const inputClasses = clsx('border border-black/15 rounded w-full', {
    //   'py-3 px-6 text-xl': size === InputSize.BASE,
    //   'py-1 px-2 text-base': size === InputSize.SM,
    // });

    return <input ref={ref} {...inputProps} className={inputProps.cssclasses} />;
  }
);