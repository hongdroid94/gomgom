import { useCallback, useEffect, useState } from 'react';
import { InputOtp, InputOtpChangeEvent } from 'primereact/inputotp';
import { authApi } from '../api';
import { useAuthStore } from '../../../entities/user/model';
import { useNavigate } from 'react-router';
import { Fieldset } from 'primereact/fieldset';
import { GBackButton } from '../../../shared/ui';
import { useToast } from '../../../shared/hook/useToast.ts';
import { toastError } from '../../../shared/lib/toastUtils.ts';

const ValidationOtp = () => {
    const { emailLogin } = useAuthStore();
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const { toastRef } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        // OTP 6자리 입력 시 자동 인증
        if (otp.length === 6) {
            verifyOtp().then();
        }
    }, [otp.length, ]);

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

    useEffect(() => {
        startTimer(); // 처음 컴포넌트가 렌더링될 때 타이머 시작
    }, []);

    const onChangeOtp = (e:InputOtpChangeEvent) => {
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
        } catch (e:Error) {
            toastError(toastRef, e.toString());
            setOtp('');
        }
    }, [navigate, toastRef,otp, emailLogin]);

    const onResendOtp = async () => {
        try {
            await authApi.registerEmailWithOtp(emailLogin);
            startTimer();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Fieldset className={'p-4 w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%]'}>
            <GBackButton />
            <h2 className="text-lg font-semibold mb-2 mt-2">코드 입력</h2>
            <div className={'my-2'}>{emailLogin}로 보낸 6자리 코드를 입력하세요</div>
            <InputOtp integerOnly style={{ gap: 20 }} length={6} value={otp} onChange={onChangeOtp} />
            <div className="flex justify-between mt-2">
                {canResend ? (
                    <button onClick={onResendOtp} className="text-blue-500">
                        재전송하기
                    </button>
                ) : (
                    <span className="text-gray-500">{timer}초 후 재전송</span>
                )}
            </div>
        </Fieldset>
    );
};

export default ValidationOtp;
