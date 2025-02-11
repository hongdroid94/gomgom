import { useQueryUser } from '../../shared/lib/reactquery';
import { Skeleton } from 'primereact/skeleton';
import ProfileSettingForm from '../../features/auth/ui/ProfileSettingForm.tsx';

const ProfileSetting = () => {
    const { isLoading, data, isError, error } = useQueryUser();
    if (isLoading) {
        return <Skeleton />;
    }
    if (!data || !data.data || !data.data.user) {
        return <>no data</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    return <ProfileSettingForm user={data.data.user}></ProfileSettingForm>;
};
export default ProfileSetting;
