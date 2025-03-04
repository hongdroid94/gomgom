import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import clsx from 'clsx';

type Props = {
    children: React.ReactNode;
    className?: string
};

const GuestLayout: FC<Props> = ({ children, className }) => {
    return (
        <div className={clsx('w-full h-screen flex flex-col', className)}>
            <nav className="flex justify-start items-center h-16">
            </nav>
            <div className={'flex-1'}>
                <div className="flex flex-col items-center justify-center h-full">{children}</div>
            </div>
        </div>
    );
};
export default GuestLayout;
