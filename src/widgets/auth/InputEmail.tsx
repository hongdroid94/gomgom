import { InputText } from 'primereact/inputtext';
import React from 'react';

type InputEmailProps = {
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
};

const InputEmail = ({ value, onChange, onClear }: InputEmailProps) => {
    return (
        <div className="w-full">
            <label htmlFor="email-login">이메일</label>
            <div className="relative">
                <InputText
                    id="email-login"
                    type="email"
                    aria-label="Email"
                    placeholder="이메일 주소 입력"
                    value={value}
                    onChange={onChange}
                    className="rounded-none mt-1 pr-10 w-full"
                />
                {value && (
                    <i
                        className="pi pi-times absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black"
                        onClick={onClear}
                    />
                )}
            </div>
        </div>
    );
};
export default InputEmail;
