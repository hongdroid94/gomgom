import {BrowserRouter, Route, Routes} from "react-router";
import Register from "../pages/register/Register.tsx";
import CheckOtp from "../pages/register/ui/CheckOtp.tsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Register/>}/>
                <Route path={"/check"} element={<CheckOtp/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;
