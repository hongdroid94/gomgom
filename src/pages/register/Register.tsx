import EmailLoginForm from '../../features/auth/ui';
import { Fieldset } from 'primereact/fieldset';
import { UnAuthLayout } from '../../widgets/layout';

function Register() {
    return (
        <UnAuthLayout>
            <div className="flex flex-col items-center justify-center h-full">
                <Fieldset className={'p-4 w-full max-w-[40%]'}>
                    <i className="pi pi-microchip-ai" style={{ fontSize: '2.0rem' }}></i>
                    <h2 className="text-xl font-semibold mt-2 ">곰곰에 오신 걸 환영합니다.</h2>
                    <div className={'text-sm mt-2'}>아래에 로그인 또는 가입하세요.</div>
                    <EmailLoginForm />
                </Fieldset>
            </div>
        </UnAuthLayout>
    );
}

export default Register;
