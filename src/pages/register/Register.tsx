import EmailLoginForm from '../../features/auth/ui';
import { Fieldset } from 'primereact/fieldset';
import { Footer, GuestLayout, RegisterLayout } from '../../widgets/layout';
import UnAuthBoundary from '../../widgets/auth/UnAuthBoundary.tsx';
import { GIcon } from '../../shared/ui';

function Register() {
    return (
        <GuestLayout className={'bg-brandsub2'}>
            <UnAuthBoundary>
                <RegisterLayout>
                    <GIcon />
                    <h2 className="text-4xl font-semibold mt-2 text-center ">AI로 아이디어를<br />곰곰히 떠올려보세요!</h2>
                    <div className={'text-lg mt-2 mb-2 text-gray-500'}>아래에 로그인 또는 가입하세요.</div>
                    <EmailLoginForm />
                </RegisterLayout>
            </UnAuthBoundary>
        </GuestLayout>
    );
}

export default Register;
