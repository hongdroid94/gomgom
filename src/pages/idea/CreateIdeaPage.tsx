import MainLayout from '../../widgets/layout/MainLayout';
import { AuthBoundary } from '../../widgets/auth';
import { GButton } from '../../shared/ui';
import { useNavigate } from 'react-router-dom';
import { useIdeaStore } from '../../entities/idea/model/ideaStore';
import { useEffect, useState } from 'react';

const CreateIdeaPage = () => {
    const navigate = useNavigate();
    const { ideaSubject, clearIdeaSubject } = useIdeaStore();
    const [subject, setSubject] = useState('');

    useEffect(() => {
        // 초기값 설정
        if (ideaSubject) {
            setSubject(ideaSubject);
            // 사용 후 초기화
            clearIdeaSubject();
        }
    }, [ideaSubject]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleExploreTrend = () => {
        navigate('/explore');
    };

    return (
        <MainLayout>
            <AuthBoundary>
                <div className="max-w-4xl mx-auto py-8">
                    <div className="space-y-4 mb-8">
                        <button 
                            onClick={handleGoBack}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors w-fit"
                        >
                            <img src="/icons/arrow_back.svg" alt="뒤로가기" className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold">아이디어 상자 만들기</h1>
                    </div>
                    
                    <div className="space-y-8">
                        {/* 드롭다운 그룹을 flex로 변경 */}
                        <div className="flex gap-4">
                            {/* 국가 선택 */}
                            <div className="flex-1 space-y-2">
                                <label className="block text-lg font-medium">국가</label>
                                <select className="w-full p-3 border border-gray-200 rounded-lg">
                                    <option value="">국가를 선택해주세요</option>
                                    <option value="korea">대한민국</option>
                                </select>
                            </div>

                            {/* 규모 선택 */}
                            <div className="flex-1 space-y-2">
                                <label className="block text-lg font-medium">규모</label>
                                <select className="w-full p-3 border border-gray-200 rounded-lg">
                                    <option value="">규모를 선택해주세요</option>
                                    <option value="small">1인 사업자</option>
                                    <option value="medium">30인 사업자</option>
                                    <option value="large">대기업</option>
                                </select>
                            </div>

                            {/* 목적 선택 */}
                            <div className="flex-1 space-y-2">
                                <label className="block text-lg font-medium">목적</label>
                                <select className="w-full p-3 border border-gray-200 rounded-lg">
                                    <option value="">목적을 선택해주세요</option>
                                    <option value="profit">수익성</option>
                                    <option value="social">사회적 가치</option>
                                </select>
                            </div>
                        </div>

                        {/* 아이디어 주제 입력 */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium">아이디어 주제</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="어떤 주제로 아이디어를 구상하고 있나요?"
                                className="w-full p-3 border border-gray-200 rounded-lg"
                            />
                            <p className="text-sm text-gray-500">
                                명료하게 작성해보세요.
                            </p>
                        </div>

                        {/* 아이디어 설명 입력 */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium">내가 원하는 아이디어 구체적으로 설명하기</label>
                            <textarea
                                placeholder="원하는 아이디어를 구체적으로 설명해주세요"
                                className="w-full p-3 border border-gray-200 rounded-lg h-32"
                            />
                            <p className="text-sm text-gray-500">
                                ex. 아이들을 대상으로한 친환경 관련 사업을 만들고 싶어. 자본금은 1억으로 시작할 예정이야.
                            </p>
                        </div>

                        {/* 버튼 영역 */}
                        <div className="pt-4">
                            <GButton
                                variant="primary"
                                className="w-full py-4 font-medium rounded-lg"
                            >
                                아이디어 만들기
                            </GButton>
                        </div>
                    </div>
                </div>
            </AuthBoundary>
        </MainLayout>
    );
};

export default CreateIdeaPage; 