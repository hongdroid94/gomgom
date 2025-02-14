import { InputText } from "primereact/inputtext";
import React, { forwardRef } from "react";

type InputEmailProps = {
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
};

// forwardRef 사용
const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
    ({ value, onChange, onClear }, ref) => {
        return (
            <div className="w-full">
                <label htmlFor="email-login">이메일</label>
                <div className="relative">
                    <InputText
                        ref={ref} // ✅ ref를 전달할 수 있도록 수정
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
    }
);

export default InputEmail;
