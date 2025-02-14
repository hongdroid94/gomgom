import { useSessionUser } from '../../shared/lib/reactquery';
import { Skeleton } from 'primereact/skeleton';
import ProfileSettingForm from '../../features/auth/ui/ProfileSettingForm.tsx';

const ProfileSetting = () => {
    const { isLoading, data, isError, error } = useSessionUser();
    if (isLoading) {
        return (
            <div className={'flex mt-2'}>
                <Skeleton  width={'60px'} height={'60px'} shape={'circle'} />
                <div className={'w-4'}/>
                <div className={'flex  flex-col justify-center'}>
                    <Skeleton  width={'200px'} className={'mb-2'} />
                    <Skeleton width={'300px'} />
                </div>
            </div>

        );
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
