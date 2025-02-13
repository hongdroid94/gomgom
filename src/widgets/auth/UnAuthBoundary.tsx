import React, { FC } from 'react';
import { useQueryAuthUser } from '../../shared/lib/reactquery/useQueryAuthUser.ts';
import { useToast } from '../../shared/hook/useToast.ts';
import { GLoading } from '../../shared/ui';
import { AuthApiError, AuthSessionMissingError } from '@supabase/supabase-js';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
}

const UnAuthBoundary: FC<Props> = ({ children }) => {
    const { isLoading, isError, data } = useQueryAuthUser();
    if (isLoading) {
        return <GLoading />;
    }
    if (isError) {
        return <>
            {children}
        </>;
    }
    if (!data) {
        return <>
            {children}
        </>;
    }
    return <Navigate replace to={"/"}/>
};
export default UnAuthBoundary;