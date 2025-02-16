import { FC } from 'react';
import { Button } from 'primereact/button';
import clsx from 'clsx';

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'outline';
}

// 공통 위젯
// TODO : 디자인 확정 나면 컴포넌트 스타일 적용
const GButton: FC<ButtonProps> = ({ className, children, onClick, variant = 'primary' }) => {
    const buttonClass = clsx(
        className,
        variant === 'primary' && 'bg-black text-white hover:bg-gray-900',
        variant === 'outline' && 'bg-white border-2 border-black text-black hover:bg-gray-50'
    );

    return (
        <Button
            label={children?.toString()}
            className={buttonClass}
            onClick={onClick}
        />
    );
};

export default GButton;
