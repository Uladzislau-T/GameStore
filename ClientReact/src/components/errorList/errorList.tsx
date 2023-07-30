import { FC } from 'react';
import { FieldErrorsImpl } from 'react-hook-form';

interface ErrorsListProps {
  cssclasses: string,
  errors: Partial<FieldErrorsImpl<any>>;
}

export const ErrorList: FC<ErrorsListProps> = ({cssclasses, errors }) => {
  return (
    <ul className={cssclasses}>
      {(Object.keys(errors) as (keyof typeof errors)[]).map((field) => (
        <li
          key={`error-${String(field)}`}
        >
          {errors[String(field)]!.message as string}
        </li>
      ))}
    </ul>
  );
};