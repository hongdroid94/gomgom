import { FC, ReactNode } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalToastProvider } from './GlobalToastProvider.tsx';

type Props = {
    children: ReactNode;
};
const queryClient = new QueryClient();

const AppProvider: FC<Props> = ({ children }) => {
    return (
        <GlobalToastProvider>
            <QueryClientProvider client={queryClient}>
                <PrimeReactProvider>{children}</PrimeReactProvider>
            </QueryClientProvider>
        </GlobalToastProvider>
    );
};
export default AppProvider;
