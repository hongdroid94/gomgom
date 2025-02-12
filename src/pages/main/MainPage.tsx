import MainLayout from '../../widgets/layout/MainLayout.tsx';
import { useQueryAuthUser } from '../../shared/lib/reactquery/useQueryAuthUser.ts';
import { AuthSessionMissingError } from '@supabase/supabase-js';
import AuthBoundary from '../../widgets/auth/AuthBoundary.tsx';

const MainPage = () => {
    return (
        <MainLayout>
            <AuthBoundary>
                <div className={'text-4xl m-4 text-cogreen'}>메인페이지</div>
            </AuthBoundary>
        </MainLayout>
    );
};
export default MainPage;
