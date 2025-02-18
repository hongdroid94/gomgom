import * as React from 'react';
import { FC } from 'react';
import { Button } from 'primereact/button';
import clsx from 'clsx';

type ButtonProps = {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    loading?: boolean;
};

// 공통 위젯
// TODO : 디자인 확정 나면 컴포넌트 스타일 적용
const GButton: FC<ButtonProps> = ({ className, children, onClick,loading }) => {
    return (
        <Button
            loading={loading}
            style={{ borderRadius: 0 }}
            label={children?.toString()}
            className={clsx(className)}
            onClick={onClick}
        ></Button>
    );
};
export default GButton;
