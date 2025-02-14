import { Fieldset } from 'primereact/fieldset';
import { GBackButton } from '../../shared/ui';
import { ProfileSetting } from '../../widgets/auth';
import { GuestLayout } from '../../widgets/layout';
import UnAuthBoundary from '../../widgets/auth/UnAuthBoundary.tsx';

const RegisterProfile = () => {
    return (
        <GuestLayout>
            <UnAuthBoundary>
                <Fieldset className={'p-4 w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%]'}>
                    <GBackButton url={'/register'} className={"mb-8"} />
                    <h1 className={'text-2xl font-semibold'}>프로필을 완성하세요</h1>
                    <div>이름을 입력하고 프로필 사진을 업로드 해보세요</div>
                    <ProfileSetting />
                </Fieldset>
            </UnAuthBoundary>
        </GuestLayout>
    );
};
export default RegisterProfile;
