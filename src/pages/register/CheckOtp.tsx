import ValidationOtp from '../../features/auth/ui/ValidationOtp.tsx';
import { GuestLayout, RegisterLayout } from '../../widgets/layout';
import UnAuthBoundary from '../../widgets/auth/UnAuthBoundary.tsx';

const CheckOtp = () => {
    return (
        <GuestLayout className={'bg-brandsub2'}>
            <UnAuthBoundary>
                <RegisterLayout>
                    <ValidationOtp />
                </RegisterLayout>
            </UnAuthBoundary>
        </GuestLayout>
    );
};

export default CheckOtp;
