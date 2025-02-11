import { useState } from 'react';

interface UseInputProps {
    initialValue?: string;
}

// 입력 필드를 쉽게 관리할 수 있는 커스텀 훅
const useInput = ({ initialValue = '' }: UseInputProps) => {
    // 입력값을 상태로 관리
    const [value, setValue] = useState(initialValue);

    // 입력 변경 이벤트 핸들러
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // [현재값, 변경 핸들러, 값 설정 함수] 반환
    return [value, onChange, setValue];
};

export default useInput;
