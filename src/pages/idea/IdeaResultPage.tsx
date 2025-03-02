import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../widgets/layout/MainLayout';
import { GeneratedIdea } from '../../entities/idea/model/types';

const IdeaResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { idea, formData } = location.state as { idea: GeneratedIdea, formData: any };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-8">
                {/* 뒤로가기 버튼과 제목 */}
                <div className="space-y-4 mb-8">
                    <button 
                        onClick={handleGoBack}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors w-fit"
                    >
                        <img src="/icons/arrow_back.svg" alt="뒤로가기" className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold">{idea.subject || '아이디어 제목'}</h1>
                    <p className="text-gray-600">
                        {idea.introduction || '아이디어 소개 내용이 표시됩니다.'}
                    </p>
                </div>

                {/* 선택된 옵션들 */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {formData?.country && (
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">{formData.country}</span>
                    )}
                    {formData?.purpose && (
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">{formData.purpose}</span>
                    )}
                    {formData?.scale && (
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">{formData.scale}</span>
                    )}
                </div>

                {/* 시장 */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-lg font-medium mb-2">시장</h2>
                        <p className="text-gray-600">{idea.marketTrend || '시장 동향 정보가 표시됩니다.'}</p>
                    </section>

                    {/* 주요 타깃 */}
                    <section>
                        <h2 className="text-lg font-medium mb-2">주요 타깃</h2>
                        <p className="text-gray-600">{idea.mainTarget || '주요 타깃 정보가 표시됩니다.'}</p>
                    </section>

                    {/* 사업 모델 */}
                    <section>
                        <h2 className="text-lg font-medium mb-2">사업 모델</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium mb-1">B2B 모델</h3>
                                <p className="text-gray-600">{idea.businessModel?.b2b || 'B2B 모델 정보가 표시됩니다.'}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">B2C 모델</h3>
                                <p className="text-gray-600">{idea.businessModel?.b2c || 'B2C 모델 정보가 표시됩니다.'}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">추가 서비스</h3>
                                <p className="text-gray-600">{idea.businessModel?.additionalService || '추가 서비스 정보가 표시됩니다.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* 예상 투자 및 운영 비용 */}
                    <section>
                        <h2 className="text-lg font-medium mb-2">예상 투자 및 운영 비용</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium mb-1">초기 투자금</h3>
                                <p className="text-gray-600">{idea.investment?.initial || '초기 투자금 정보가 표시됩니다.'}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">수익 예상</h3>
                                <p className="text-gray-600">{idea.investment?.expected || '수익 예상 정보가 표시됩니다.'}</p>
                            </div>
                        </div>
                    </section>

                    {/* 도움이 될 만한 자료와 사이트 */}
                    <section>
                        <h2 className="text-lg font-medium mb-2">도움이 될 만한 자료와 사이트</h2>
                        {idea.helpfulResources && idea.helpfulResources.length > 0 ? (
                            <ul className="space-y-2">
                                {idea.helpfulResources.map((resource, index) => (
                                    <li key={index} className="text-gray-600">
                                        • {resource}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">도움이 될 만한 자료 정보가 표시됩니다.</p>
                        )}
                    </section>
                </div>

                {/* 하단 버튼 */}
                <div className="flex gap-4 mt-12">
                    <button 
                        className="flex-1 py-4 bg-black text-white rounded-lg font-medium"
                        onClick={() => navigate('/idea/create')}
                    >
                        아이디어 다시 만들기
                    </button>
                    <button 
                        className="flex-1 py-4 bg-white border-2 border-black text-black rounded-lg font-medium"
                        onClick={() => navigate('/explore')}
                    >
                        트렌드 탐색하기
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default IdeaResultPage; 