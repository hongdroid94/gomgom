import { BrowserRouter, Route, Routes } from 'react-router';
import { CheckOtp, Register } from '../pages/register';
import MainPage from '../pages/main/MainPage.tsx';

const AppRouter = () => {
    return (
        // BrowserRouter: 브라우저의 URL을 사용하여 라우팅을 처리합니다
        <BrowserRouter>
            <Routes>
                {/* 각 경로에 해당하는 컴포넌트를 매핑합니다 */}
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/register/verify-otp'} element={<CheckOtp />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
