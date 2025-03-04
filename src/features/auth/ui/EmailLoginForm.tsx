import useInput from '../../../shared/hook';
import { authApi } from '../api';
import { useCallback, useRef, useState } from 'react';
import GButton from '../../../shared/ui/GButton.tsx';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../../entities/user/model';
import { InputEmail } from '../../../widgets/auth';
import { useToast } from '../../../shared/hook/useToast.ts';
import { emailRegex } from '../../../shared/lib';
import { LoginType } from '../../../entities/user';
import { toastError } from '../../../shared/lib/toastUtils.ts';
import { Divider } from 'primereact/divider';
import { GButton2 } from '../../../shared/ui';

const EmailLoginForm = () => {
    const [email, onChangeEmail, setEmail] = useInput({ initialValue: '' });
    const [isLoadingOtp, setLoadingOtp] = useState(false);
    const inputRef = useRef<HTMLInputElement>();
    const { setEmailLogin } = useAuthStore();
    const { toastRef } = useToast();
    const navigate = useNavigate();

    const onClickGoogleLogin = useCallback(async () => {
        const user = await authApi.registerOrSignInWithGoogle();
        console.log(user);
    }, []);

    const onClickEmailLogin = useCallback(async () => {
        try {
            setLoadingOtp(true);
            console.log(inputRef.current);
            if (email === '' || !email) {
                setLoadingOtp(false);
                toastRef?.current?.show({ summary: '이메일을 입력해주세요', severity: 'error' });
                inputRef?.current?.focus();
                return;
            }
            if (!emailRegex.test(email as string)) {
                setLoadingOtp(false);
                toastRef?.current?.show({
                    summary: '유효한 이메일을 입력해주세요',
                    severity: 'error',
                });
                inputRef.current.focus();
                return;
            }
            if (!await authApi.validationEmail(email, LoginType.EMAIL)) {
                setLoadingOtp(false);
                toastError(toastRef, '이미 해당 아이디로 가입된 이메일이 존재합니다.');
                return;
            }
            await authApi.registerEmailWithOtp(email as string);
            // 이메일 값 상태 저장
            setEmailLogin(email!);
            setLoadingOtp(false);
            navigate('/register/verify-otp');
        } catch (e) {
            setLoadingOtp(false);
            toastRef?.current?.show({ severity: 'error', summary: e.toString() });
        }
    }, [email, setEmailLogin, navigate, toastRef]);

    return (
        <div className="flex flex-col items-left mt-4 w-full">
            <InputEmail
                ref={inputRef}
                value={email}
                placeholder={'gomgom@gmail.com'}
                onChange={onChangeEmail}
                onClear={() => setEmail('')}
            />
            <GButton
                loading={isLoadingOtp}
                onClick={onClickEmailLogin}
                className={'bg-brandsub1  text-white px-4 mt-2'}>
                이메일로 계속하기
            </GButton>
            <div className={'flex items-center'}>
                <Divider align={'center'} className={''} />
                <div className={'min-w-max text-gray-4  00 mx-2 '}>또는</div>
                <Divider align={'center'} className={''} />
            </div>
            <GButton2
                onClick={onClickGoogleLogin}
                className={'bg-white text-black text-center border-gray-500 border-1 px-4 mt-2'}
            >
                <div className={'text-center w-full flex items-center justify-center'}>
                    <i className={'pi pi-custom-google mr-2'} style={{fontSize:"1.5rem"}}></i>
                    구글 계정으로 로그인
                </div>
            </GButton2>
        </div>
    );
};
export default EmailLoginForm;
