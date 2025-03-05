import { FC } from 'react';

import { Toaster } from 'react-hot-toast';

type Props = {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  reverseOrder?: boolean;
  duration?: number;
};

export const ToasterConfig: FC<Props> = ({
  position = 'top-right',
  reverseOrder = false,
  duration = 3000,
}) => {
  return (
    <Toaster
      position={position}
      reverseOrder={reverseOrder}
      toastOptions={{
        duration,
      }}
    />
  );
};
