import UserDto from '../../entities/user';
import React, { FC, useCallback, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import useInput from '../../shared/hook';
import { InputText } from 'primereact/inputtext';
import { GButton, GIcon } from '../../shared/ui';
import { useMutateProfileUpdate } from '../../features/profile/lib/useMutateProfileUpdate.ts';
import { useToast } from '../../shared/hook/useToast.ts';
import { toastError } from '../../shared/lib/toastUtils.ts';
import { useMutateDeleteAccount } from '../../features/profile/lib';
import { useNavigate } from 'react-router';
import { Dialog } from 'primereact/dialog';

type Props = {
    user: UserDto
};

const UserSettingSlider: FC<Props> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userName, onChangeUserName, setUserName] = useInput({ initialValue: user.nickname });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user.profileImageUrl);
    const [file, setFile] = useState<File | null>(null);
    const { mutateAsync, isPending } = useMutateProfileUpdate();
    const { mutateAsync: deleteMutateAsync } = useMutateDeleteAccount();
    const { toastRef } = useToast();
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // 수정 버튼 토글
    const onEditToggle = () => {
        if (isEditing) {
            setUserName(user.nickname);
            setAvatarPreview(user.profileImageUrl);
            setFile(null);
        }
        setIsEditing((prev) => !prev);
    };

    // 파일 업로드 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target?.files[0]) {
            const selectedFile = e.target?.files[0];
            setFile(selectedFile);
            setAvatarPreview(URL.createObjectURL(selectedFile));
        }
    };

    // 프로필 업데이트
    const onClickProfileUpdate = useCallback(async () => {
        try {
            if (!userName) return;
            await mutateAsync({ userId: parseInt(user.id), nickname: userName, file: file });
            setIsEditing(false);
        } catch (e: Error) {
            console.log(e);
            toastError(toastRef, e.message);
        }
    }, [userName, file, user.id]);

    // 계정 삭제 핸들러
    const onDeleteAccount = async () => {
        await deleteMutateAsync(parseInt(user.id));
        navigate('/register');
    };

    return (
        <div className={'pl-8 pr-16'}>
            <div className={'text-3xl font-bold'}>프로필</div>
            <div className={'mt-4 flex'}>
                <div className="relative inline-block">
                    <label htmlFor="avatar-upload" className={`cursor-pointer ${!isEditing && 'pointer-events-none'}`}>
                        <Avatar image={avatarPreview || ''} className={'w-24 h-24'} shape={'circle'}>
                            {!avatarPreview && <i className={'pi pi-image'} />}
                        </Avatar>
                    </label>
                    {isEditing && (
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    )}
                </div>
                <div className={'ml-8 w-full'}>
                    <div className={'text-xl mb-1'}>이름</div>
                    <InputText
                        value={userName}
                        onChange={onChangeUserName}
                        className={'w-full'}
                        disabled={!isEditing}
                    />
                </div>
            </div>

            <div className={'mt-8'}>
                <div className={'font-bold text-xl'}>이메일</div>
                <InputText value={user.email} className={'w-full'} disabled />
            </div>

            {/* 버튼 UI 변경 */}
            <div className="flex w-full mt-4 gap-2">
                {isEditing ? (
                    <>
                        <GButton onClick={onEditToggle} className="w-full flex-1 bg-white text-black border-black">
                            취소
                        </GButton>
                        <GButton loading={isPending} onClick={onClickProfileUpdate} className="w-full flex-1 bg-black">
                            수정 완료
                        </GButton>
                    </>
                ) : (
                    <GButton onClick={onEditToggle} className={'w-full bg-black'}>
                        수정
                    </GButton>
                )}
            </div>

            <div className={'font-bold text-xl mt-16'}>계정 삭제</div>
            <div className={'my-1'}>
                곰곰을 더 이상 사용하지 않으려면 계정을 영구적으로 삭제할 수 있습니다.
            </div>
            <GButton className={'w-full bg-black'} icon={'pi pi-exclamation-triangle'} onClick={() => setIsDeleteDialogOpen(true)}>
                내 계정 삭제
            </GButton>

            {/* 계정 삭제 다이얼로그 */}
            <Dialog
                visible={isDeleteDialogOpen}
                onHide={() => setIsDeleteDialogOpen(false)}
                modal
            >
                <div className={'flex-col items-center justify-center px-32'}>
                    <div className={'text-center w-full flex justify-center'}>
                        <GIcon/>
                    </div>
                    <div className="text-2xl font-bold  text-center mb-2 my-8">회원 탈퇴</div>
                    <div className="text-sm text-gray-600 text-center my-2">
                        회원 탈퇴 시 계정 정보 및 보유중인 테이프가 <br/>
                        삭제되어 복구가 불가해요. 정말로 탈퇴 하시겠어요?
                    </div>
                    <div className="flex gap-4 mt-6 w-full ">
                        <GButton className="flex-1 bg-white text-black border-black w-full px-4" onClick={() => setIsDeleteDialogOpen(false)}>
                            더 써볼래요
                        </GButton>
                        <GButton className="flex-1 bg-white text-black border-black w-full px-4" onClick={onDeleteAccount}>
                            떠날래요
                        </GButton>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default UserSettingSlider;
