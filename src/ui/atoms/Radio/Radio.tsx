import * as React from 'react';

import './_Radio.scss';

interface Props {
  type?: 'horizontal' | 'vertical';
  options: {
    value: any;
    label: React.ReactNode;
  }[];
  value: any;
  onChange: (value: any) => void;
}

export const Radio: React.FC<Props> = ({ type = 'horizontal', value, options, onChange }) => {
  const onChangeHandler = React.useCallback(
    (newValue: string): void => {
      if (value !== newValue) {
        onChange(newValue);
      }
    },
    [onChange, value],
  );

  return (
    <div className={`radio-wrapper radio-type-${type}`}>
      {options.map((option) => (
        <label className="radio-label" key={option.value} onClick={() => onChangeHandler(option.value)}>
          <input type="radio" checked={value === option.value} onChange={() => {}} />

          <div className="radio-check" />

          <span className="radio-label-text">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
