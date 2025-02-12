import { useQueryAuthUser } from '../../shared/lib/reactquery/useQueryAuthUser.ts';
import { AuthApiError, AuthSessionMissingError } from '@supabase/supabase-js';
import { GLoading } from '../../shared/ui';
import React, { FC, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
}
const AuthBoundary: FC<Props> = ({ children }) => {
    const { isLoading, isError, error, data } = useQueryAuthUser();
    const toastRef = useRef<Toast | null>(null);
    if (isLoading) {
        return <GLoading />;
    }
    if (isError) {
        // 세션이 없는경우 (즉 최초 사이트 진입 상태)
        if (error instanceof AuthSessionMissingError) {
            toastRef.current?.show({severity:'error',summary:'로그인후 이용가능합니다.'})
            return <Navigate to={'/register'} replace />;
        }
        if (error instanceof AuthSessionMissingError ||
            (error instanceof AuthApiError && error.status === 401)) {
            toastRef.current?.show({severity:'error',summary:'세션이 만료되었습니다. 로그인후 이용해주세요.'})
            return <Navigate to={'/register'} replace />;
        }
        return <div
            className={'w-full h-full flex flex-col justify-center items-center text-center text-red'}>error</div>;
    }
    if (!data) {
        return <>nodata</>;
    }
    return (
        <>
            {children}
            <Toast ref={toastRef} />
        </>
    );
};
export default AuthBoundary;