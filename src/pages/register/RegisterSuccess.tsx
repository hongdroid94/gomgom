import { GuestLayout, RegisterLayout } from '../../widgets/layout';
import { GIcon } from '../../shared/ui';
import { useQueryAuthUser } from '../../shared/lib/reactquery';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const RegisterSuccess = () => {
    const [time, setTime] = useState(3);
    const { isLoading, data } = useQueryAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        const countdown = setTimeout(() => {
            navigate('/', { replace: true });
        }, 3000);

        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            clearTimeout(countdown);
            clearInterval(interval);
        };
    }, [navigate]);

    if (isLoading) return <>loading</>;
    if (!data || typeof data === 'boolean') return <>nodata</>;

    return (
        <GuestLayout className="bg-brandsub2">
            <RegisterLayout>
                <div className="flex flex-col items-center justify-center">
                    <GIcon />
                    <div className="my-8 text-3xl text-center">
                        <span className="font-bold">{data.nickname}님</span>
                        <br />곰곰에 오신 것을 환영합니다.
                    </div>
                    <Avatar shape="circle" className="w-24 h-24" image={data.profileImageUrl} />
                    <div className="text-lg text-gray-400 mt-4">{data.email}</div>
                    <Divider />
                    <div>{time}초 후 메인 홈으로 이동합니다.</div>
                </div>
            </RegisterLayout>
        </GuestLayout>
    );
};
export default RegisterSuccess;
