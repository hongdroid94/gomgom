import MainLayout from '../../widgets/layout/MainLayout';

const ExplorePage = () => {
    return (
        <MainLayout>
            <div className="space-y-8">
                {/* 트렌드 탐색 섹션 */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">트렌드 탐색</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 추후 실제 트렌드 목록으로 대체 */}
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="h-40 bg-gray-100 rounded-md mb-3"></div>
                            <h3 className="font-semibold">트렌드 예시</h3>
                            <p className="text-sm text-gray-600 mt-1">트렌드 설명이 들어갑니다.</p>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default ExplorePage; 