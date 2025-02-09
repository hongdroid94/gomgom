import * as React from 'react';
import { FC } from 'react';
import { Button } from 'primereact/button';

type ButtonProps = {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
};

// 공통 위젯
// TODO : 디자인 확정 나면 컴포넌트 스타일 적용
const GButton: FC<ButtonProps> = ({ className, children, onClick }) => {
    return (
        <Button className={className} onClick={onClick}>
            {children}
        </Button>
    );
};
export default GButton;
