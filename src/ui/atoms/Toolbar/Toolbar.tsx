import * as React from 'react';

import './_Toolbar.scss';

interface Props {
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
}

export const Toolbar: React.FC<Props> = ({ leftSide, rightSide }) => {
  if (!leftSide && !rightSide) {
    return null;
  }

  return (
    <div className="toolbar">
      {leftSide && <div className="left-side">{leftSide}</div>}

      {rightSide && <div className="right-side">{rightSide}</div>}
    </div>
  );
};
