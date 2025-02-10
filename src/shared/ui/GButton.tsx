import * as React from 'react';
import { FC } from 'react';
import { Button } from 'primereact/button';
import clsx from 'clsx';

type ButtonProps = {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
};

// 공통 위젯
// TODO : 디자인 확정 나면 컴포넌트 스타일 적용
const GButton: FC<ButtonProps> = ({ 
    className, 
    children, 
    onClick,
    variant = 'primary',
    size = 'md' 
}) => {
    const baseStyles = "rounded-md font-medium transition-colors";
    
    const variantStyles = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
    };
    
    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };

    return (
        <Button 
            className={clsx(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )} 
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default GButton;
