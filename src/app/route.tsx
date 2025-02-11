import { BrowserRouter, Route, Routes } from 'react-router';
import { CheckOtp, Register, RegisterProfile } from '../pages/register';
import MainPage from '../pages/main/MainPage.tsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/register/profile'} element={<RegisterProfile />} />
                <Route path={'/register/verify-otp'} element={<CheckOtp />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
