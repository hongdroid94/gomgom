import { UnAuthLayout } from '../../widgets/layout';
import { Fieldset } from 'primereact/fieldset';
import { GIcon } from '../../shared/ui';
import { useQueryAuthUser } from '../../shared/lib/reactquery';

const RegisterSuccess = () => {
    const { isLoading, data } = useQueryAuthUser();
    if (isLoading) {
        return <>loading</>;
    }
    if (!data || typeof data === 'boolean') {
        return <>nodata</>;
    }
    return (
        <UnAuthLayout>
            <Fieldset className={'p-4 w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%]'}>
                <div className={'flex flex-col items-center justify-center'}>
                    <GIcon />
                    <div className={'my-8 text-3xl font-bold'}>곰곰에 오신것을 환영합니다.</div>
                    <div className={'text-lg'}>{data.nickname}</div>
                </div>
            </Fieldset>
        </UnAuthLayout>
    );

};
export default RegisterSuccess;