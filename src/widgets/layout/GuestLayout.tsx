import { Link } from 'react-router-dom';
import React, { FC } from 'react';

type Props = {
    children: React.ReactNode;
};

const GuestLayout: FC<Props> = ({ children }) => {
    return (
        <div className={'w-full h-screen flex flex-col'}>
            <nav className="flex justify-start items-center h-16">
                <Link to="/" className="flex items-center ml-2">
                    <img src="/images/gomgom_logo.svg" alt="GomGom" className="h-8 w-auto" />
                </Link>
            </nav>
            <div className={'flex-1'}>
                <div className="flex flex-col items-center justify-center h-full">{children}</div>
            </div>
        </div>
    );
};
export default GuestLayout;
