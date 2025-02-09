import { ReactNode } from 'react';
import { GIcon } from '../../shared/ui';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div className={'w-full h-screen flex flex-col'}>
                <nav className={'flex justify-between items-center p-2  '}>
                    <GIcon />
                    <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
                </nav>
                <div className={'flex-1'}>{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
