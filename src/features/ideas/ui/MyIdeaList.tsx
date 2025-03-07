import { useQueryGetIdeaForUser } from '../lib';
import React, { FC } from 'react';

type Props = {
    userId: number
}
const MyIdeaList: FC<Props> = ({ userId }) => {
    const { isLoading, data, isError, error } = useQueryGetIdeaForUser(userId);
    if (isLoading) {
        return <></>;
    }
    if (isError) {
        return <>{error}</>;
    }
    if (!data) {
        return <>nodata</>;
    }
    return (
        <>{data.map((item)=>{
            return (
                <div key={item.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">
                        {item.description}
                    </p>
                    <div className="flex gap-2">
                        {item.tags.split(',').map((tag,idx)=> {
                            return <span className="px-3 py-1 bg-gray-100 rounded-full text-sm" key={idx}>{tag}</span>;
                        })}
                    </div>
                </div>
            )
        })}</>
    );
};
export default MyIdeaList;