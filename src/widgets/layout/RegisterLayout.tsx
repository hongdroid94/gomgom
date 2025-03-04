import React, { FC } from 'react';
import { Footer } from './index.ts';

type Props = {
    children: React.ReactNode;
}
const RegisterLayout: FC<Props> = ({ children }) => {
    return (
        <div className={'flex flex-col w-full items-center h-full'}>
            <div
                className={'flex-1 p-4 w-full max-w-[100%] sm:max-w-[50%] lg:max-w-[35%] flex flex-col items-center justify-center'}>
                {children}
            </div>
            <Footer />
        </div>
    );
};
export default RegisterLayout;