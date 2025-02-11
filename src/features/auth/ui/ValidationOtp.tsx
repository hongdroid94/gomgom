import { useCallback, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { authApi } from '../api';
import { useAuthStore } from '../../../entities/user/model';
import { useNavigate } from 'react-router';
import { Fieldset } from 'primereact/fieldset';
import { GBackButton, GButton } from '../../../shared/ui';

const ValidationOtp = () => {
    const { emailLogin } = useAuthStore();
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

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

    return (
        <div className="flex items-center justify-center h-full">
            <Fieldset>
                <GBackButton className={'my-2'} />
                <h2 className="text-lg font-semibold mb-2">코드 입력</h2>
                <InputOtp length={6} value={otp} onChange={onChangeOtp} />
                <div className={'flex justify-end'}>
                    <GButton onClick={onClickOtpVerify} className={'mt-2 bg-black text-white p-2'}>
                        인증하기
                    </GButton>
                </div>
            </Fieldset>
        </div>
    );
};

export default ValidationOtp;
