import EmailLoginForm from '../../features/auth/ui';
import { Fieldset } from 'primereact/fieldset';
import { GuestLayout } from '../../widgets/layout';
import UnAuthBoundary from '../../widgets/auth/UnAuthBoundary.tsx';

function Register() {
    return (
        <GuestLayout>
            <UnAuthBoundary>
                <Fieldset className={'p-4 w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%]'}>
                    <i className="pi pi-microchip-ai" style={{ fontSize: '2.5rem' }}></i>
                    <h2 className="text-2xl font-semibold mt-2 ">곰곰에 오신 걸 환영합니다.</h2>
                    <div className={'text-sm mt-1 mb-2'}>아래에 로그인 또는 가입하세요.</div>
                    <EmailLoginForm />
                </Fieldset>
            </UnAuthBoundary>
        </GuestLayout>
    );
}

export default Register;
