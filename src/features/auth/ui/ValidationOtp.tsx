import { useCallback, useEffect, useState } from 'react';
import { InputOtp, InputOtpChangeEvent } from 'primereact/inputotp';
import { authApi } from '../api';
import { useAuthStore } from '../../../entities/user/model';
import { useNavigate } from 'react-router';
import { Fieldset } from 'primereact/fieldset';
import { GBackButton, GButton2 } from '../../../shared/ui';
import { useToast } from '../../../shared/hook/useToast.ts';
import { toastError } from '../../../shared/lib/toastUtils.ts';
import { Chip } from 'primereact/chip';

const ValidationOtp = () => {
    const { emailLogin } = useAuthStore();
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const { toastRef } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        startTimer(); // 처음 컴포넌트가 렌더링될 때 타이머 시작
    }, []);

    const startTimer = () => {
        setTimer(60);
        setCanResend(false);

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const onChangeOtp = (e: InputOtpChangeEvent) => {
        setOtp(e.value as string);
    };

    const verifyOtp = useCallback(async () => {
        try {
            console.log(emailLogin);
            const user = await authApi.validateEmailOtp(emailLogin, otp);
            if (!user.user || !user.user.email) {
                return;
            }
            if (await authApi.checkRegisteredEmail(user.user.email)) {
                navigate('/');
            } else {
                navigate('/register/profile');
            }
        } catch (e: Error) {
            toastError(toastRef, e.toString());
            setOtp('');
        }
    }, [navigate, toastRef, otp, emailLogin]);

    const onResendOtp = async () => {
        try {
            await authApi.registerEmailWithOtp(emailLogin);
            startTimer();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={'flex flex-col items-center '}>
            <div className={'flex items-center w-full'}>
                <GBackButton />
                <h2 className="flex-1 text-center text-4xl font-semibold mb-2 mt-2">코드 입력</h2>
            </div>
            <div className={'mt-4 text-gray-500'}>메일에서 코드 확인후 입력해주세요</div>
            <Chip className={'mt-3 mb-8 bg-transparent border-gray-300 border-2 rounded-full'} label={emailLogin}></Chip>
            <InputOtp integerOnly style={{ gap: 20 }} length={6} value={otp} onChange={onChangeOtp} />
            <div className="flex justify-between my-2">
                {canResend ? (
                    <button onClick={onResendOtp} className="text-black underline">
                        코드 재전송
                    </button>
                ) : (
                    <span className="text-gray-500 underline">{timer}초 후 재전송이 가능해요</span>
                )}
            </div>
            {/* 기존: OTP 6자리 입력 시 자동 인증 */}
            {/* useEffect(() => {
                if (otp.length === 6) {
                    verifyOtp().then();
                }
            }, [otp.length]); */}

            {/* 변경: 입력하기 버튼을 눌러야 전송 */}
            <GButton2 label={"입력하기"} className={'w-full bg-brandsub1 border-brandsub1'} onClick={verifyOtp} />
        </div>
    );
};

export default ValidationOtp;
