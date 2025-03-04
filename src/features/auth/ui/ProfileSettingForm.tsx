import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { GButton2 } from '../../../shared/ui';
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
    const { toastRef } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        setValid(value.length >= 2);
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
            if (name.length < 2) {
                toastError(toastRef, '닉네임은 2글자 이상으로 설정해주세요');
                return;
            }
            let requestUserDto = mapperUserToRequestUserDto(user);

            if (file) {
                const imageUrl = await authApi.uploadImageFileAtSupabase(user.id, file);
                requestUserDto = {
                    ...requestUserDto,
                    profile_image_url:
                        'https://crbqmjtejobqcahbwnyy.supabase.co/storage/v1/object/public/' + imageUrl,
                };
            }
            requestUserDto = {
                ...requestUserDto,
                nickname: name,
            };
            console.log(requestUserDto);
            await authApi.insertUserData(requestUserDto);
            navigate('/register/success');
        } catch (e) {
            console.error('가입 에러', e);
        }
    }, [name, user, file, navigate, toastRef]);

    return (
        <div className={'flex flex-col items-center justify-center w-full'}>
            <div className="relative inline-block my-4">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Avatar shape="circle" className="w-16 h-16" image={avatarPreview || ''}>
                        {!avatarPreview && <i className={'pi pi-image'} />}
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
                    value={<i className="pi pi-camera text-white" />}
                    className="absolute bottom-0 right-0 bg-blue-500 text-xs w-5 h-5 flex items-center justify-center rounded-full cursor-pointer"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                />
            </div>
            <div className={'text-gray-400 mt-2'}>{user.email}</div>
            <div className="flex my-2 w-full">
                <InputText
                    maxLength={16}
                    placeholder="닉네임을 입력해주세요"
                    className={`border-0 border-b-2 w-full bg-transparent rounded-none focus:ring-0 
                        ${isValid ? 'border-green-500 focus:border-green-500' : ''}
                        ${name.length > 0 && !isValid ? 'border-red-500 focus:border-red-500' : ''}
                    `}
                    value={name}
                    onChange={handleChange}
                    aria-describedby="nickname-help"
                />
            </div>
            <div
                id="nickname-help"
                className={`block  text-sm w-full text-left ${name.length === 0 && 'invisible'}
                    ${isValid ? 'text-green-500' : ''}
                    ${name.length > 0 && !isValid ? 'text-red-500' : ''}
                `}
            >
                {name.length === 0
                    ? '.'
                    : isValid
                        ? '멋진 닉네임이네요!'
                        : '닉네임은 2글자 이상 입력해주세요!'}
            </div>
            <GButton2
                label={'시작하기'}
                className="w-full bg-brandsub1 text-white mt-4"
                onClick={onClickStart}
                disabled={!isValid}
            />
        </div>
    );
};

export default ProfileSettingForm;
