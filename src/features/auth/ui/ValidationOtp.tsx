import { useCallback, useEffect, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { authApi } from '../api';
import { useAuthStore } from '../../../entities/user/model';
import { useNavigate } from 'react-router';
import { Fieldset } from 'primereact/fieldset';
import { GBackButton } from '../../../shared/ui';

const ValidationOtp = () => {
    const { emailLogin } = useAuthStore();
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // OTP 6자리 입력 시 자동 인증
        if (otp.length === 6) {
            onClickOtpVerify().then();
        }
    }, [otp]);

    useEffect(() => {
        // 타이머 시작
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

        return () => clearInterval(countdown);
    }, []);

    const onChangeOtp = (e) => {
        setOtp(e.value);
    };

    const onClickOtpVerify = useCallback(async () => {
        try {
            console.log(emailLogin);
            const user = await authApi.validateEmailOtp(emailLogin, otp);
            if (!user.user || !user.user.email) {
                return;
            }
            // 가입된 이메일의 경우 홈화면 이동
            if (await authApi.checkRegisteredEmail(user.user.email)) {
                navigate('/');
            } else {
                navigate('/register/profile');
            }
            console.log(user.user);
        } catch (e) {
            console.log(e);
        }
    }, [otp, emailLogin]);

    const onResendOtp = async () => {
        try {
            await authApi.registerEmailWithOtp(emailLogin);
            setTimer(60);
            setCanResend(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <Fieldset className={'p-4 w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%]'}>
                <GBackButton />
                <h2 className="text-lg font-semibold mb-2 mt-2">코드 입력</h2>
                <div className={'my-2'}>{emailLogin}로 보낸 6자리 코드를 입력하세요</div>
                <InputOtp
                    type={'number'}
                    className={'text-center'}
                    length={6}
                    value={otp}
                    onChange={onChangeOtp}
                />
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
        </div>
    );
};

export default ValidationOtp;
