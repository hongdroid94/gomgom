import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { GlobalRefContext } from './GlobalRefContext.ts';

export const GlobalToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<Toast | null>(null);

    return (
        <GlobalRefContext.Provider value={{ toastRef }}>
            {children}
            <Toast ref={toastRef}  />
        </GlobalRefContext.Provider>
    );
};
