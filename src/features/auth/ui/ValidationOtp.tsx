import { useCallback, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { authApi } from '../api';
import { useAuthStore } from '../../../entities/user/model';
import { useNavigate } from 'react-router';

// OTP 인증 컴포넌트
// Feature Sliced Design 패턴에 따라 auth 기능의 UI 부분을 담당
const ValidationOtp = () => {
    // Zustand store에서 이메일 상태 가져오기
    const { emailLogin } = useAuthStore();
    // OTP 입력값 상태 관리
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const onChangeOtp = (e) => {
        setOtp(e.value);
    };

    // OTP 검증 처리
    // useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
    const onClickOtpVerify = useCallback(async () => {
        const user = await authApi.validateEmailOtp(emailLogin, otp);
        navigate('/');
    }, [otp, emailLogin]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center p-8 border-2 border-gray-300 rounded-lg shadow-lg bg-white gap-5">
                <h2 className="text-lg font-semibold">코드 입력</h2>
                {/* PrimeReact의 OTP 입력 컴포넌트 사용 */}
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
