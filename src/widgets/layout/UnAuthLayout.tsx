import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import UnAuthBoundary from '../auth/UnAuthBoundary.tsx';

type Props = {
    children: React.ReactNode;
}

const UnAuthLayout:FC<Props> = ({children}) => {
    return (
        <UnAuthBoundary>
            <div>
                <div className={'w-full h-screen flex flex-col'}>
                    <nav className="flex justify-start items-center h-16">
                        <Link to="/" className="flex items-center ml-2">
                            <img src="/images/gomgom_logo.svg" alt="GomGom" className="h-8 w-auto" />
                        </Link>
                    </nav>
                    <div className={'flex-1'}>{children}</div>
                </div>
            </div>
        </UnAuthBoundary>
    );
};
export default UnAuthLayout;