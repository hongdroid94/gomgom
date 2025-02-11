import { ReactNode } from 'react';
import Header from './Header';

// 앱의 기본 레이아웃을 정의하는 컴포넌트
const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-12">{children}</main>
        </div>
    );
};

export default MainLayout;
