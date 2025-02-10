import React from 'react';

interface GIconProps {
    className?: string;
}

const GIcon: React.FC<GIconProps> = ({ className }) => {
    return (
        <div className={className}>
            {/* 임시 로고 텍스트 */}
            <span className="font-bold text-xl">GomGom</span>
        </div>
    );
};

export default GIcon;
