import * as React from 'react';
import { Icons } from 'ui/atoms';
import { Table } from 'ui/organisms';
import { Column } from 'ui/organisms/Table/Table';

import { placeholders } from '../../placeholders';

import './_ProductsTable.scss';

export interface Product {
  baseAsset: string;
  quoteAsset: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  latestPrice: number;
  parentMarket: string;
  parentMarketCategory: string;
  percentage: number;
  formattedPercentage: string;
}

interface Props {
  loading: boolean;
  data: Product[];
  onSort?: (key: string, sort: string) => void;
}

export const ProductsTable: React.FC<Props> = ({ loading, data: $data, onSort }) => {
  const skeletonClass = React.useMemo(() => (loading ? 'skeleton skeleton-text' : ''), [loading]);
  const data = React.useMemo(() => (loading && $data.length === 0 ? placeholders : $data), [$data, loading]);

  const columns: Column<Product>[] = [
    {
      key: 'baseAsset',
      title: 'Pair',
      sortable: true,
      render: (item) => (
        <div className={`pair-title ${skeletonClass}`}>
          <Icons size="small" type="star" />
          <span>{item.baseAsset}</span>

          <span> / {item.parentMarket}</span>
        </div>
      ),
    },
    {
      key: 'latestPrice',
      title: 'Last Price',
      sortable: true,
      render: (item) => <span className={skeletonClass}>{item.latestPrice}</span>,
    },
    {
      key: 'percentage',
      title: 'Change',
      sortable: true,
      render: (item) => (
        <div
          className={`change-title ${item.percentage < 0 ? 'negative' : ''} ${
            item.percentage === 0 ? 'neutral' : ''
          } ${skeletonClass}`}
        >
          {item.formattedPercentage}%
        </div>
      ),
    },
  ];

  return <Table loading={loading} className="products-table" columns={columns} data={data} onSort={onSort} />;
};
