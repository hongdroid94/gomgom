import MainLayout from '../../widgets/layout/MainLayout.tsx';
import AuthBoundary from '../../widgets/auth/AuthBoundary.tsx';
import { GButton } from '../../shared/ui';
import { authApi } from '../../features/auth';
import { useNavigate } from 'react-router';

const MainPage = () => {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <AuthBoundary>
                <div className={'text-4xl m-4 text-cogreen'}>메인페이지</div>
                {/*임시 로그아웃 버튼*/}
                <GButton onClick={async ()=>{
                    await authApi.logout();
                    navigate("/register")

                }} className={'bg-copink'}>로그아웃</GButton>
            </AuthBoundary>
        </MainLayout>
    );
};
export default MainPage;
