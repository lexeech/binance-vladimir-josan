import { http } from 'libs/http';
import { Product } from 'features/products/organisms/ProductsTable/ProductsTable';

interface RawProduct {
  s: string;
  st: string;
  b: string;
  q: string;
  ba: string;
  qa: string;
  i: number;
  ts: number;
  an: string;
  qn: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  qv: number;
  y: number;
  as: number;
  pm: string;
  pn: string;
  cs: number;
}

const getChange = (openPrice: number, lastPrice: number): [number, string] => {
  const percentage = ((openPrice - lastPrice) / lastPrice) * 100;

  return [percentage, percentage.toFixed(2)];
};

export const products = {
  get: () =>
    http.get<Product[]>('asset-service/product/get-products').then((res) => {
      const data: RawProduct[] = res.data as any;

      return {
        ...res,
        data: data.map((item, key) => {
          const [percentage, formattedPercentage] = getChange(item.o, item.c);

          return {
            key,
            baseAsset: item.b,
            quoteAsset: item.q,
            openPrice: item.o,
            highPrice: item.h,
            lowPrice: item.l,
            latestPrice: item.c,
            parentMarket: item.pm,
            parentMarketCategory: item.pn,
            percentage,
            formattedPercentage,
          };
        }),
      };
    }),
};
