import { Fieldset } from 'primereact/fieldset';
import { GBackButton } from '../../shared/ui';
import { ProfileSetting } from '../../widgets/auth';
import { UnAuthLayout } from '../../widgets/layout';

const RegisterProfile = () => {
    return (
        <UnAuthLayout>
            <Fieldset>
                <GBackButton url={'/register'} />
                <h1 className={'text-2xl font-bold'}>프로필을 완성하세요</h1>
                <div>이름을 입력하고 프로필 사진을 업로드 해보세요</div>
                <ProfileSetting />
            </Fieldset>
        </UnAuthLayout>
    );
};
export default RegisterProfile;
