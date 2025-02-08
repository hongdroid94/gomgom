import useInput from "../../../shared/hook";
import {authApi} from "../api";
import {useCallback} from "react";
import GButton from "../../../shared/ui/GButton.tsx";

const EmailLoginForm = () => {
    const [email, onChangeEmail] = useInput({initialValue: ""});

    const onClickGoogleLogin = useCallback(async () => {
        const user = await authApi.registerOrSignInWithGoogle();
        console.log(user);
    }, [email]);
    const onClickEamilLogin = useCallback(async () => {
        const user = await authApi.registerEmailWithOtp(email!);
        console.log(user)
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
                onClick={onClickEamilLogin}
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
        </div>
    )
}
export default EmailLoginForm;