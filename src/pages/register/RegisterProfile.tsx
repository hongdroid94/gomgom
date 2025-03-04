import { GBackButton } from '../../shared/ui';
import { ProfileSetting } from '../../widgets/auth';
import { GuestLayout, RegisterLayout } from '../../widgets/layout';
import UnAuthBoundary from '../../widgets/auth/UnAuthBoundary.tsx';
import ValidationGoogleLoginBoundary from '../../features/auth/ui/ValidationGoogleLoginBoundary.tsx';

const RegisterProfile = () => {
    return (
        <GuestLayout className={'bg-brandsub2'}>
            <ValidationGoogleLoginBoundary>
                <UnAuthBoundary>
                    <RegisterLayout>
                        <div className="relative flex items-center w-full justify-center">
                            {/* 왼쪽 끝에 고정된 백 버튼 */}
                            <GBackButton url={'/register'} className="absolute left-0" />
                            {/* 프로필 입력 텍스트 */}
                            <h1 className="text-4xl font-semibold text-center">
                                프로필 입력
                            </h1>
                        </div>
                        <div className={'mt-2 text-gray-500'}>닉네임과 프로필 사진을 등록해보세요!</div>
                        <ProfileSetting />
                    </RegisterLayout>
                </UnAuthBoundary>
            </ValidationGoogleLoginBoundary>
        </GuestLayout>
    );
};
export default RegisterProfile;
