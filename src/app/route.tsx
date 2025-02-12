import { BrowserRouter, Route, Routes } from 'react-router';
import { CheckOtp, Register, RegisterProfile } from '../pages/register';
import MainPage from '../pages/main/MainPage.tsx';
import IdeaPage from '../pages/idea/IdeaPage.tsx';
import ExplorePage from '../pages/explore/ExplorePage.tsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/register/profile'} element={<RegisterProfile />} />
                <Route path={'/register/verify-otp'} element={<CheckOtp />} />
                <Route path={'/idea'} element={<IdeaPage/>} />
                <Route path={"/explore"} element={<ExplorePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
