import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { GButton } from '../../../shared/ui';
import React, { FC, useCallback, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { authApi } from '../api';
import { mapperUserToRequestUserDto } from '../../../shared/lib/mapper';
import { useNavigate } from 'react-router';
import { useToast } from '../../../shared/hook/useToast.ts';
import { toastError } from '../../../shared/lib/toastUtils.ts';

type Props = {
    user: User;
};

const ProfileSettingForm: FC<Props> = ({ user }) => {
    const [name, setName] = useState('');
    const [isValid, setValid] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const {toastRef} = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        setValid(value.length > 0);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target?.files[0]) {
            const selectedFile = e.target?.files[0];
            setFile(selectedFile);
            setAvatarPreview(URL.createObjectURL(selectedFile));
        }
    };
    const onClickStart = useCallback(async () => {
        try {
            if(name.length<1){
                toastError(toastRef,"닉네임은 1글자 이상으로 설정해주세요")
                return;
            }
            let requestUserDto = mapperUserToRequestUserDto(user);

            if (file) {
                const imageUrl = await authApi.uploadImageFileAtSupabase(user.id, file);
                requestUserDto = {
                    ...requestUserDto,
                    profile_image_url:
                        'https://crbqmjtejobqcahbwnyy.supabase.co/storage/v1/object/public/' +
                        imageUrl,
                };
            }
            requestUserDto = {
                ...requestUserDto,
                nickname: name,
            };
            console.log(requestUserDto);
            await authApi.insertUserData(requestUserDto);
            navigate('/');
        } catch (e) {
            console.log('가입 에러러');
            console.error(e);
            console.info(e);
        }
    }, [name, file]);

    return (
        <div>
            <div className="flex my-2">
                <div className="relative inline-block mr-1">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Avatar shape="circle" className="w-16 h-16" image={avatarPreview || ''} >
                            {!avatarPreview &&<i className={'pi pi-image'}/>}
                        </Avatar>
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Badge
                        value={<i className="pi pi-upload text-white" />}
                        className="absolute bottom-0 right-0 bg-blue-500 text-xs w-5 h-5 flex items-center justify-center rounded-full cursor-pointer"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                    />
                </div>
                <div className="ml-6 w-full">
                    <div className={`text-${isValid ? 'green-500' : 'red-500'}`}>이름</div>
                    <InputText
                        placeholder="귀하의 이름"
                        className={`w-full mt-1 ${isValid ? 'border-green-500' : 'border-red-500'}`}
                        value={name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <GButton className="w-full bg-black text-white mt-4" onClick={onClickStart}>
                시작하기
            </GButton>
        </div>
    );
};

export default ProfileSettingForm;
