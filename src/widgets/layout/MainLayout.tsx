import { ReactNode } from 'react';
import { GIcon } from '../../shared/ui';

// 앱의 기본 레이아웃을 정의하는 컴포넌트
const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div className={'w-full h-screen flex flex-col'}>
                {/* 상단 네비게이션 바 */}
                <nav className={'flex justify-between items-center p-2'}>
                    <GIcon />
                    <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
                </nav>
                {/* 메인 콘텐츠 영역 */}
                <div className={'flex-1'}>{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
