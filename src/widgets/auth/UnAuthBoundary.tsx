import React, { FC } from 'react';
import { useQueryAuthUser } from '../../shared/lib/reactquery';
import { GLoading } from '../../shared/ui';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

const UnAuthBoundary: FC<Props> = ({ children }) => {
    const { isLoading, isError, data } = useQueryAuthUser();
    if (isLoading) {
        return <GLoading />;
    }
    if (isError) {
        return <>{children}</>;
    }
    if (!data) {
        return <>{children}</>;
    }
    return <Navigate replace to={'/'} />;
};
export default UnAuthBoundary;
