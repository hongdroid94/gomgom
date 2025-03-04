import { InputText } from 'primereact/inputtext';
import React, { forwardRef } from 'react';

type InputEmailProps = {
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    labelClassName?: string,
    onClear: () => void;
    placeholder?: string;
};

// forwardRef 사용
const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
    ({ value, onChange, onClear, labelClassName, placeholder }, ref) => {
        return (
            <div className="w-full">
                <label htmlFor="email-login" className={labelClassName}>이메일</label>
                <div className="relative">
                    <InputText
                        ref={ref} // ✅ ref를 전달할 수 있도록 수정
                        id="email-login"
                        type="email"
                        aria-label="Email"
                        placeholder={placeholder ?? '이메일 주소 입력'}
                        value={value}
                        onChange={onChange}
                        className="mt-1 pr-10 w-full"
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
    },
);

export default InputEmail;
