import MainLayout from '../../widgets/layout/MainLayout';

const IdeaPage = () => {
    return (
        <MainLayout>
            <div className="pt-4 space-y-8">
                {/* 헤더 영역 */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">아이디어 상자</h1>
                    <button className="px-4 py-2 border border-black rounded flex items-center gap-2">
                        <i className="pi pi-pencil"></i>
                        편집하기
                    </button>
                </div>

                {/* 오늘 날짜 */}
                <h2 className="text-xl font-semibold">오늘</h2>

                {/* 아이디어 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 아이디어 카드 반복 */}
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
                            <h3 className="text-xl font-semibold">친환경 패키징 솔루션</h3>
                            <p className="text-gray-600">
                                플라스틱 및 일회용 포장재 사용을 줄이고 기업과 개인이 친환경 포장재를 쉽게 도입할 수 있...
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">친환경</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">30인 사업자</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 날짜 구분선 */}
                <h2 className="text-xl font-semibold mt-12">2024.07.28</h2>

                {/* 이전 아이디어 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 동일한 카드 구조 반복 */}
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
                            <h3 className="text-xl font-semibold">친환경 패키징 솔루션</h3>
                            <p className="text-gray-600">
                                플라스틱 및 일회용 포장재 사용을 줄이고 기업과 개인이 친환경 포장재를 쉽게 도입할 수 있...
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">친환경</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">30인 사업자</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default IdeaPage;
