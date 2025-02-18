import { ProgressSpinner } from 'primereact/progressspinner';
import { useValidateGmail } from '../lib';
import React, { FC } from 'react';
import { useToast } from '../../../shared/hook/useToast.ts';
import { toastError } from '../../../shared/lib/toastUtils.ts';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
}
const ValidationGoogleLoginBoundary: FC<Props> = ({ children }) => {
    const { isLoading, isError, error } = useValidateGmail();
    const { toastRef } = useToast();
    if (isLoading) {
        return (
            <div className={'w-full h-full flex justify-center items-center'}>
                <ProgressSpinner />
            </div>
        );
    }
    if (isError) {
        toastError(toastRef, error?.toString() ?? '');
        return <Navigate to={'/register'} />;
    }
    return (
        <>
            {children}
        </>
    );
};
export default ValidationGoogleLoginBoundary;