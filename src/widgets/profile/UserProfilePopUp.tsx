import { useQueryAuthUser } from '../../shared/lib/reactquery';
import { FC, useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '../../shared/hook/useToast.ts';
import { toastError } from '../../shared/lib/toastUtils.ts';
import { Skeleton } from 'primereact/skeleton';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import UserDto from '../../entities/user';
import { GButton, GIcon } from '../../shared/ui';
import { authApi } from '../../features/auth';
import { useQueryClient } from '@tanstack/react-query';
import { Sidebar } from 'primereact/sidebar';
import UserSettingSlider from './UserSettingSlider.tsx';

type Props = {
    closePopup: () => void;
};

const UserProfilePopUp: FC<Props> = ({ closePopup }) => {
    const { toastRef } = useToast();
    const { isLoading, isError, data, error } = useQueryAuthUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isUserSetting, setUserSetting] = useState(false);
    const [isLogoutDialog, setLogoutDialog] = useState(false);

    const handleLogin = useCallback(async () => {
        setLogoutDialog(false);
        closePopup();
        await queryClient.removeQueries({ queryKey: ['getAuthUser'] });
        await authApi.logout();
        navigate('/register');
    }, [closePopup, navigate, queryClient]);

    const handleSetting = useCallback(() => {
        setUserSetting(true);
    }, []);

    if (isLoading) {
        return (
            <div className="absolute right-0 w-96 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-10">
                <div className={'flex p-2'}>
                    <Skeleton shape={'circle'} width={'50px'} height={'50px'} />
                    <div className={'ml-4'}>
                        <Skeleton width={'200px'} className={'mb-2'} />
                        <Skeleton width={'230px'} />
                    </div>
                </div>
            </div>
        );
    }
    if (isError) {
        toastError(toastRef, error?.toString() ?? '유저 정보 조회 오류 ');
        return <Navigate to={'/register'} replace />;
    }
    if (typeof data === 'boolean' && !data) {
        toastError(toastRef, '로그인후 이용해주세요');
        return <Navigate to={'/register'} replace />;
    }

    return (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
            <div className={'flex mb-4'}>
                <Avatar image={(data as UserDto).profileImageUrl} shape={'circle'} className={'w-16 h-16'} />
                <div className={'ml-4 flex flex-col justify-center'}>
                    <div>{(data as UserDto).nickname}</div>
                    <div className={'text-sm'}>{(data as UserDto).email}</div>
                </div>
            </div>
            <GButton
                className="w-full px-4 py-2 border-blue-500 text-blue-500 bg-white text-sm hover:text-white hover:bg-blue-500 my-1"
                icon={'pi pi-cog'}
                onClick={handleSetting}
            >
                설정
            </GButton>
            <GButton
                icon="pi pi-sign-in"
                className="w-full px-4 py-2 border-red-500 text-red-500 bg-white text-sm hover:bg-red-500 hover:border-white hover:text-white my-1"
                onClick={() => setLogoutDialog(true)}
            >
                로그아웃
            </GButton>

            {/* 로그아웃 확인 다이얼로그 */}
            <Dialog
                visible={isLogoutDialog}
                onHide={() => setLogoutDialog(false)}


            >
                <div className={'flex flex-col items-center px-32'}>
                    <div>
                        <GIcon />
                    </div>
                    <div className={'text-2xl font-bold my-8'}>
                        로그아웃 하시겠습니까?
                    </div>
                    <div className={'flex w-full gap-4'}>
                        <GButton className="w-full flex-1 bg-white text-black border-black px-12 py-2"
                                 onClick={() => setLogoutDialog(false)}>
                            취소
                        </GButton>
                        <GButton className="w-full flex-1 bg-white text-black border-black px-12 py-2"
                                 onClick={handleLogin}>
                            확인
                        </GButton>
                    </div>
                </div>
            </Dialog>

            <Sidebar
                className={'w-[70%]'}
                onHide={() => {
                    setUserSetting(false);
                    closePopup();
                }}
                visible={isUserSetting}
                position={'right'}
                closeIcon={<div className="absolute left-0 pl-2">
                    <i className="pi pi-angle-double-right"></i>
                </div>}
            >
                <UserSettingSlider user={data as UserDto} />
            </Sidebar>
        </div>
    );
};
export default UserProfilePopUp;
