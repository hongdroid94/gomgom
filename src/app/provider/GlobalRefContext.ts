import React, { createContext } from 'react';
import { Toast } from 'primereact/toast';

export const GlobalRefContext = createContext<{ toastRef: React.RefObject<Toast> | null }>({
    toastRef: null,
});

