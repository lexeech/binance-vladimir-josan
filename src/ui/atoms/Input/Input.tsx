import * as React from 'react';

import './_Input.scss';

interface Props {
  prefix?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<Props> = ({ prefix, placeholder, value, onChange }) => {
  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => onChange(target.value);

  return (
    <div className={`input-wrapper ${prefix ? 'input-wrapper-prefixed' : ''}`}>
      {prefix}

      <input type="text" placeholder={placeholder} onChange={onChangeHandler} value={value} />

      <div className="input-divider" />
    </div>
  );
};
