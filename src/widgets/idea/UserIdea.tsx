import { useQueryAuthUser } from '../../shared/lib/reactquery';
import { GLoading } from '../../shared/ui';
import { MyIdeaList } from '../../features/ideas/ui';
import { UserEntity } from '../../entities/user';

const UserIdea = ()=>{
    const {isLoading,data,isError,error} = useQueryAuthUser();
    if(isLoading){
        return <GLoading/>
    }
    if(!data){
        return <>no data</>
    }
    if(isError){
        return <>{error}</>
    }
    return (
        <>
            <MyIdeaList userId={parseInt((data as UserEntity).id)}/>
        </>
    )
}
export default UserIdea;