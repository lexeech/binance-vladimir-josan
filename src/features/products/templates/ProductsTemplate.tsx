import * as React from 'react';
import { useRequest } from 'estafette';
import { useSocket } from 'libs/socket';
import { products } from 'libs/http/api';
import { compareValues } from 'libs/array';
import { Icons, Toolbar, Divider, Input, Radio } from 'ui/atoms';

import { SortItem } from '../atoms';
import { ProductsTable, ProductsTracker } from '../organisms';
import { Product } from '../organisms/ProductsTable/ProductsTable';

export interface SocketData {
  data: {
    E: number;
    c: string;
    e: string;
    h: string;
    l: string;
    o: string;
    q: string;
    s: string;
    v: string;
  }[];
}

const initialState = {
  search: '',
  type: 'change',
  sortKey: '',
  sort: '',
  tab: '',
};

type ActionType = {
  type: 'SET_SEARCH' | 'SET_TYPE' | 'SET_SORT_KEY' | 'SET_SORT' | 'SET_TAB';
  value: string;
};

const filterReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_SEARCH': {
      return { ...state, search: action.value };
    }
    case 'SET_TYPE': {
      return { ...state, type: action.value };
    }
    case 'SET_SORT_KEY': {
      return { ...state, sortKey: action.value };
    }
    case 'SET_SORT': {
      return { ...state, sort: action.value };
    }
    case 'SET_TAB': {
      return { ...state, tab: action.value };
    }
    default:
      return state;
  }
};

export const ProductsTemplate: React.FC = () => {
  const { connect, disconnect, status, data: socketData } = useSocket<SocketData | null>();
  const { request, data, loading } = useRequest<Product[]>({ loading: true, data: [] });
  const [filteredData, setFilteredData] = React.useState<Product[]>([]);
  const [filtered, setFiltered] = React.useState<boolean>(false);
  const [filter, dispatch] = React.useReducer(filterReducer, initialState);
  const timer = React.useRef({} as NodeJS.Timeout);

  React.useEffect(() => {
    const onFetch = () => {
      request(products.get());
    };

    onFetch();

    // connect to socket
    connect();

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    // check if there's something to filter
    const onFilter = () => {
      clearTimeout(timer.current);

      const isFiltered = JSON.stringify(initialState) !== JSON.stringify(filter);

      timer.current = setTimeout(() => {
        if (isFiltered) {
          let $data = [...data];

          if (filter.search) {
            const search = filter.search.toLowerCase();

            $data = $data.filter(({ baseAsset, parentMarket }) =>
              (filter.type === 'change' ? baseAsset : parentMarket).toLowerCase().match(search),
            );
          }

          if (filter.sort && (filter.sort === 'desc' || filter.sort === 'asc')) {
            $data = $data.sort(compareValues(filter.sortKey, filter.sort));
          }

          if (filter.tab) {
            $data = $data.filter(({ baseAsset }) => baseAsset.toLowerCase() === filter.tab);
          }

          setFilteredData($data);
        }

        setFiltered(isFiltered);
      }, 150);
    };

    onFilter();
  }, [data, filter]);

  const onChangeSearch = (value: string) => dispatch({ type: 'SET_SEARCH', value });
  const onChangeType = (value: string) => dispatch({ type: 'SET_TYPE', value });
  const onChangeTab = React.useCallback((value: string) => dispatch({ type: 'SET_TAB', value }), []);

  const onSort = (key: string, sort: string) => {
    dispatch({ type: 'SET_SORT_KEY', value: key || '' });
    dispatch({ type: 'SET_SORT', value: sort });
  };

  return (
    <>
      <ProductsTracker status={status} data={socketData} disconnect={disconnect} />

      <div className="container">
        <h1>Market</h1>

        <Divider />

        <Toolbar
          leftSide={
            <>
              <Icons type="star" />

              <SortItem label="Margin" active={filter.tab === ''} value="" onChange={onChangeTab} />

              <SortItem label="BNB" active={filter.tab === 'bnb'} value="bnb" onChange={onChangeTab} />

              <SortItem label="BTC" active={filter.tab === 'btc'} value="btc" onChange={onChangeTab} />

              <SortItem label="NULS" active={filter.tab === 'nuls'} value="nuls" onChange={onChangeTab} />
            </>
          }
          rightSide={
            <>
              <Input
                prefix={<Icons size="large" type="search" />}
                placeholder="Search"
                value={filter.search}
                onChange={onChangeSearch}
              />

              <Radio
                options={[
                  {
                    label: 'Change',
                    value: 'change',
                  },
                  {
                    label: 'Volume',
                    value: 'volume',
                  },
                ]}
                value={filter.type}
                onChange={onChangeType}
              />
            </>
          }
        />

        <ProductsTable loading={loading} data={filtered ? filteredData : data} onSort={onSort} />
      </div>
    </>
  );
};
