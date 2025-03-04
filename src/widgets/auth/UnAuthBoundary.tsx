import React, { FC } from 'react';
import { useQueryAuthUser } from '../../shared/lib/reactquery';
import { GLoading } from '../../shared/ui';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

// 로그인을 안한 유저만 접근할수 있는 바운더리
// ex) 로그인,회원가입 페이지 등에서 사용
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
