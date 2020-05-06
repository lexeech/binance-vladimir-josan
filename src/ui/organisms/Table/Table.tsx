import * as React from 'react';
import { Icons } from 'ui/atoms';

import './_Table.scss';

export interface Column<T> {
  key?: string;
  title?: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface Props {
  loading?: boolean;
  rowKey?: string;
  className?: string;
  columns: Column<any>[];
  data: { [key: string]: any }[];
  onSort?: (key: string, sort: string) => void;
}

export const Table: React.FC<Props> = ({ rowKey = 'key', className = '', loading, columns, data, onSort }) => {
  const [sort, setSort] = React.useState<string>('');
  const [sortKey, setSortKey] = React.useState<string>('');

  const onSortChange = React.useCallback(
    (key?: string) => {
      if (key !== undefined && typeof onSort === 'function') {
        let newSort = '';
        let newSortKey = '';

        if (sortKey === key) {
          if (sort === 'asc') {
            newSortKey = sortKey;
            newSort = 'desc';
          } else {
            newSort = '';
          }
        } else {
          newSortKey = key;
          newSort = 'asc';
        }

        setSort(newSort);
        setSortKey(newSortKey);

        onSort(newSortKey, newSort);
      }
    },
    // eslint-disable-next-line
    [sort, sortKey],
  );

  const isSortable = React.useMemo(() => onSort !== undefined, [onSort]);

  return (
    <div className={`table-wrapper ${className} ${loading ? 'table-loading' : ''}`}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key || column.title}
                className={`${isSortable && column.sortable ? 'sortable' : ''} ${
                  column.key === sortKey ? `sort-${sort}` : ''
                }`}
                {...(column.key !== undefined && column.sortable ? { onClick: () => onSortChange(column.key) } : {})}
              >
                <span className="table-title-text">{column.title}</span>

                {isSortable && column.sortable ? <Icons type="sort" /> : null}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item[rowKey]}>
                {columns.map((column) => (
                  <td key={`-${column.key || column.title}`}>
                    {typeof column.render === 'function' ? column.render(item) : column.key ? item[column.key] : null}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="table-empty" colSpan={columns.length}>
                There is no data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
