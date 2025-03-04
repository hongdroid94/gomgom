import * as React from 'react';
import { FC } from 'react';
import { Button } from 'primereact/button';
import clsx from 'clsx';

type ButtonProps = {
    className?: string;
    children?: React.ReactNode;
    label?: string;
    onClick?: () => void;
    loading?: boolean;
    icon?: string,
    iconPos?: 'left' | 'bottom' | 'right' | 'top',
    variant?: 'primary' | 'outline';
    disabled?: boolean;
}

// 공통 위젯
// TODO : 디자인 확정 나면 컴포넌트 스타일 적용
const GButton2: FC<ButtonProps> = ({
                                       icon,
                                       iconPos,
                                       className,
                                       children,
                                       onClick,
                                       variant = null,
                                       disabled = false,
                                       label,
                                       loading,
                                   }) => {
    const buttonClass = clsx(
        className,
        variant === 'primary' && 'bg-black text-white hover:bg-gray-900',
        variant === 'outline' && 'bg-white border-2 border-black text-black hover:bg-gray-50',
        disabled && 'opacity-50 cursor-not-allowed',
    );

    return (
        <Button
            loading={loading}
            label={label}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
            icon={icon}
            iconPos={iconPos}
        >{children}</Button>
    );
};

export default GButton2;
