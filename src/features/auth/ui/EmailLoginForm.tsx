import useInput from '../../../shared/hook';
import { authApi } from '../api';
import { useCallback, useRef } from 'react';
import GButton from '../../../shared/ui/GButton.tsx';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../../entities/user/model';
import { InputEmail } from '../../../widgets/auth';
import { useToast } from '../../../shared/hook/useToast.ts';
import { emailRegex } from '../../../shared/lib';

const EmailLoginForm = () => {
    const [email, onChangeEmail, setEmail] = useInput({ initialValue: '' });
    const inputRef = useRef<HTMLInputElement>(null);
    const { setEmailLogin } = useAuthStore();
    const { toastRef } = useToast();
    const navigate = useNavigate();

    const onClickGoogleLogin = useCallback(async () => {
        const user = await authApi.registerOrSignInWithGoogle();
        console.log(user);
    }, []);

    const onClickEmailLogin = useCallback(async () => {
        try {
            console.log(inputRef.current);
            if (email === '' || !email) {
                toastRef?.current?.show({ summary: '이메일을 입력해주세요', severity: 'error' });
                inputRef?.current?.focus();
                return;
            }
            if (!emailRegex.test(email)) {
                toastRef?.current?.show({
                    summary: '유효한 이메일을 입력해주세요',
                    severity: 'error',
                });
                inputRef.current.focus();
                return;
            }
            await authApi.registerEmailWithOtp(email as string);
            // 이메일 값 상태 저장
            setEmailLogin(email!);
            navigate('/register/verify-otp');
        } catch (e) {
            toastRef?.current?.show({ severity: 'error', summary: e.toString() });
        }
    }, [email, toastRef]);

    return (
        <div className="flex flex-col items-left mt-4 w-full">
            <InputEmail
                ref={inputRef}
                value={email}
                onChange={onChangeEmail}
                onClear={() => setEmail('')}
            />
            <GButton onClick={onClickEmailLogin} className={'bg-white text-black px-4 mt-2'}>
                이메일로 계속하기
            </GButton>
            <GButton
                onClick={onClickGoogleLogin}
                className={'bg-black text-center rounded-none px-4 mt-2'}
            >
                구글 로그인
            </GButton>
        </div>
    );
};
export default EmailLoginForm;
