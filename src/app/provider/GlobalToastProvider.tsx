import React, { createContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

export const GlobalRefContext = createContext<{ toastRef: React.RefObject<Toast> | null }>({
    toastRef: null,
});

export const GlobalToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<Toast | null>(null);

    return (
        <GlobalRefContext.Provider value={{ toastRef }}>
            {children}
            <Toast ref={toastRef} group={'global'} />
        </GlobalRefContext.Provider>
    );
};
