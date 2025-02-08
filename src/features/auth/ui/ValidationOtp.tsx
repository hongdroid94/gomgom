import {useCallback, useState} from "react";
import { InputOtp } from "primereact/inputotp";
import {authApi} from "../api";
import {useAuthStore} from "../../../entities/user/model";
import {useNavigate} from "react-router";

const ValidationOtp = () => {
    const {emailLogin} = useAuthStore();
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const onChangeOtp = (e) => {
        setOtp(e.value);
    };
    const onClickOtpVerify = useCallback(async ()=>{
        console.log(emailLogin)
        const user = await authApi.validateEmailOtp(emailLogin,otp)
        console.log(user.user)
        navigate("/");

    },[otp,emailLogin]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center p-8 border-2 border-gray-300 rounded-lg shadow-lg bg-white gap-5">
                <h2 className="text-lg font-semibold">코드 입력</h2>
                <InputOtp length={6} value={otp} onChange={onChangeOtp} />
                <button
                    onClick={onClickOtpVerify}
                    className="px-4 py-2 w-32 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                >
                    인증하기
                </button>
            </div>
        </div>
    );
};

export default ValidationOtp;
