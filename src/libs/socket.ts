import * as React from 'react';

export type Statuses = 'connected' | 'disconnected' | 'pending';

let socket: { [key: string]: any } = {};

export function useSocket<T>(): {
  data: T | null;
  status: Statuses;
  connect: () => void;
  disconnect: () => void;
} {
  const [data, setData] = React.useState<T | null>(null);
  const [status, setStatus] = React.useState<Statuses>('disconnected');
  const $status = React.useRef('disconnected');

  React.useEffect(() => {
    return (): void => {
      if (socket.close) {
        socket.close();
      }
    };
  }, []);

  const connect = (): void => {
    setStatus('pending');
    $status.current = 'pending';

    socket = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');

    socket.onmessage = ({ data: $data }: { data: string }): void => {
      if ($data) {
        const socketData: T = JSON.parse($data);

        setData(socketData);
      }
    };

    socket.onopen = (): void => {
      setStatus('connected');
      $status.current = 'connected';

      console.log('Socket has been connected');
    };

    socket.onerror = (err: any): void => {
      setStatus('disconnected');
      $status.current = 'disconnected';

      console.error(err);
    };

    socket.onclose = (err: any): void => {
      console.log(`Socket has been disconnected (${err.code || 'N/A'})`);

      setStatus('disconnected');
      $status.current = 'disconnected';
    };
  };

  const disconnect = () => socket.close();

  return {
    data,
    status,
    connect,
    disconnect,
  };
}
