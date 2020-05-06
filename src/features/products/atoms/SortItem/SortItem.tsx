import * as React from 'react';

import './_SortItem.scss';

interface Props {
  label: string;
  active: boolean;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const SortItem: React.FC<Props> = ({ label, active, disabled, value, onChange }) => (
  <div className={`sort-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`} onClick={() => onChange(value)}>
    {label}
  </div>
);
