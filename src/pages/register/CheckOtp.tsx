import ValidationOtp from '../../features/auth/ui/ValidationOtp.tsx';
import { GuestLayout } from '../../widgets/layout';
import UnAuthBoundary from '../../widgets/auth/UnAuthBoundary.tsx';

const CheckOtp = () => {
    return (
        <GuestLayout>
            <UnAuthBoundary>
                <ValidationOtp />
            </UnAuthBoundary>
        </GuestLayout>
    );
};

export default CheckOtp;
