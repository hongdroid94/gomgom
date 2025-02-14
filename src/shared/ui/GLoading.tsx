import { ProgressSpinner } from 'primereact/progressspinner';

// TODO : 추후 로딩 프로그래스 디자인 확정나면 적용 예정
const GLoading = () => {
    return (
        <div className={'w-full h-full flex flex-col items-center justify-center text-center'}>
            <ProgressSpinner />
        </div>
    );
};
export default GLoading;
