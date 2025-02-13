import { useContext } from 'react';
import { GlobalRefContext } from '../../app/provider/GlobalToastProvider.tsx';

export const useToast = () => {
    const context = useContext(GlobalRefContext);
    if (!context || !context.toastRef) {
        throw new Error('useToast must be used within a GlobalToastProvider');
    }
    return context;
};

