import User from "../../entities/user";
import {FC} from "react";

type Props = {
    data:User
}
const UserProfileCard: FC<Props> = ({ data }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white flex items-center space-x-4">
            {data.profileImageUrl && (
                <img
                    src={data.profileImageUrl}
                    alt={data.nickname}
                    className="w-16 h-16 rounded-full object-cover"
                />
            )}
            <div>
                <h2 className="text-xl font-semibold">{data.nickname}</h2>
                <p className="text-gray-500">{data.email}</p>
                <span className="text-sm text-gray-400">가입일: {data.createdAt.toDateString()}</span>
            </div>
        </div>
    );
};

export default UserProfileCard