import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import clsx from 'clsx';

type BackButtonProps = {
    className?: string;
    url?: string;
};
const GBackButton: FC<BackButtonProps> = ({ className, url }) => {
    const navigate = useNavigate();
    const onClick = useCallback(() => {
        // 뒤로가기시 url 을 파리미터로 넘기면 해당 주소로 이동 파리머터를 안주면 바로 이전 페이지
        if (url) {
            navigate(url);
        } else {
            navigate(-1);
        }
    }, []);
    return <i onClick={onClick} className={clsx('pi pi-arrow-left', className)}></i>;
};
export default GBackButton;
