import useInput from "../../../shared/hook";
import {authApi} from "../api";
import {useCallback, useRef} from "react";
import GButton from "../../../shared/ui/GButton.tsx";
import {Toast} from "primereact/toast";
import {useNavigate} from "react-router";
import {useAuthStore} from "../../../entities/user/model";

const EmailLoginForm = () => {
    const [email, onChangeEmail] = useInput({initialValue: ""});
    const {setEmailLogin} = useAuthStore();
    const toast = useRef<Toast|null>(null);
    const navigate = useNavigate();

    const onClickGoogleLogin = useCallback(async () => {
        const user = await authApi.registerOrSignInWithGoogle();
        console.log(user);
    }, [email]);
    const onClickEmailLogin = useCallback(async () => {
        try {
            const user = await authApi.registerEmailWithOtp(email!);
            console.log(user);
            console.log(email)
            setEmailLogin(email!);
            navigate("/register/verify-otp")
        } catch (e) {
            toast.current?.show({severity: 'error', summary: e.toString()})

        }
    }, [email])

    return (
        <div
            className="flex flex-col items-left p-8 ">
            <div className={'text-co'}>ss</div>
            <input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={onChangeEmail}
                className="px-4 py-2 w-72 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <GButton
                onClick={onClickEmailLogin}
                className="px-4 py-2 w-80 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition my-2"
            >
                이메일로 계속하기
            </GButton>
            <GButton
                onClick={onClickGoogleLogin}
                className="px-4 py-2 w-80 bg-red-500 text-white rounded-md hover:bg-red-600 transition my-2"
            >
                구글 로그인
            </GButton>
            <Toast ref={toast}/>
        </div>
    )
}
export default EmailLoginForm;