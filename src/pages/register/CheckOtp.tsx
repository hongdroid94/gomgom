import ValidationOtp from '../../features/auth/ui/ValidationOtp.tsx';
import { UnAuthLayout } from '../../widgets/layout';

const CheckOtp = () => {
    return (
        <UnAuthLayout>
            <ValidationOtp />
        </UnAuthLayout>
    );
};

export default CheckOtp;
