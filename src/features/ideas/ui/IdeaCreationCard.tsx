import { GButton } from '../../../shared/ui';

const IdeaCreationCard = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">아이디어를 구체화해볼까요?</h2>
            <div className="space-y-8">
                {/* 이미지 플레이스홀더 */}
                <div className="aspect-[16/9] bg-white rounded-lg overflow-hidden border border-gray-200">
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">이미지를 업로드해주세요</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="구체화 하고싶은 아이디어 주제를 자유롭게 적어보세요"
                        className="w-full px-6 py-4 border border-gray-200 rounded-lg text-lg focus:outline-none focus:border-gray-400"
                    />
                    <p className="text-gray-500 text-sm px-2">
                        ex. 친환경 관련 비즈니스, 인공지능 서비스
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <GButton
                        variant="primary"
                        className="w-full py-4 text-lg font-medium bg-black hover:bg-gray-900 transition-colors rounded-lg"
                    >
                        아이디어 만들기
                    </GButton>
                    <GButton
                        variant="outline"
                        className="w-full py-4 text-lg font-medium bg-white border-2 border-black text-black hover:bg-gray-50 transition-colors rounded-lg"
                    >
                        트렌드 탐색하기
                    </GButton>
                </div>
            </div>
        </div>
    );
};

export default IdeaCreationCard;
