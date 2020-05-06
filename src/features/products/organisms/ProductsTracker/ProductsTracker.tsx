import * as React from 'react';
import { Statuses } from 'libs/socket';

import { SocketData } from '../../templates/ProductsTemplate';

import './_ProductsTracker.scss';

interface Props {
  status: Statuses;
  data: SocketData | null;
  disconnect: () => void;
}

export const ProductsTracker: React.FC<Props> = ({ data, status, disconnect }) => (
  <div className="products-tracker">
    <div className="container">
      <div className="products-tracker-status">{status.toUpperCase()}</div>

      <ul className="products-tracker-list">
        {data ? (
          <>
            {data.data
              .filter((_, key) => key <= 5)
              .map((item) => (
                <li key={item.s}>
                  {item.s}

                  <span>{item.E}</span>
                </li>
              ))}

            {data.data.length > 5 ? <li className="products-tracker-more">... +{data.data.length - 5}</li> : null}
          </>
        ) : null}
      </ul>

      <div className="products-tracker-closer" onClick={disconnect}>
        &times;
      </div>
    </div>
  </div>
);
