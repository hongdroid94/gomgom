import { useQueryAuthUser } from '../../shared/lib/reactquery/useQueryAuthUser.ts';
import { AuthApiError, AuthSessionMissingError } from '@supabase/supabase-js';
import { GLoading } from '../../shared/ui';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '../../shared/hook/useToast.ts';

type Props = {
    children: React.ReactNode;
}

// 인증된 유저 (로그인된 유저) 인지 체크 로그인되있지 않은경우 회원가입 페이지로 이동
const AuthBoundary: FC<Props> = ({ children }) => {
    const { isLoading, isError, error, data } = useQueryAuthUser();
    const { toastRef } = useToast();
    if (isLoading) {
        return <GLoading />;
    }
    // 수파베이스에 로그인은 했지만 곰곰 로그인은 안된상태일경우
    if(typeof data ==="boolean" && !data){
        return <Navigate to={"/register"}/>
    }
    if (isError) {
        // 세션이 없는경우 (즉 최초 사이트 진입 상태)
        if (error instanceof AuthSessionMissingError) {
            toastRef?.current?.show({ severity: 'error', summary: '로그인후 이용가능합니다.' });
            return <Navigate to={'/register'} replace />;
        }
        if (
            (error instanceof AuthApiError && error.status === 401)) {
            toastRef?.current?.show({ severity: 'error', summary: '세션이 만료되었습니다. 로그인후 이용해주세요.' });
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
        </>
    );
};
export default AuthBoundary;