import MainLayout from '../../widgets/layout/MainLayout.tsx';
import AuthBoundary from '../../widgets/auth/AuthBoundary.tsx';
import { GButton } from '../../shared/ui';
import { authApi } from '../../features/auth';
import { IdeaCreationCard } from '../../features/ideas/ui';
import { useNavigate } from 'react-router';

const MainPage = () => {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <AuthBoundary>
                {/*임시 로그아웃 버튼*/}
                <GButton
                    onClick={async () => {
                        await authApi.logout();
                        navigate('/register');
                    }}
                    className={'bg-copink'}
                >
                    로그아웃
                </GButton>
            </AuthBoundary>
            <div className="pt-4 space-y-16">
                {/* 아이디어 생성 카드 */}
                <IdeaCreationCard />

                {/* 하단 섹션 */}
                <section className="grid grid-cols-3 gap-0">
                    {/* 왼쪽 타이틀 영역 */}
                    <div className="border border-gray-200 p-8 h-[280px]">
                        <div className="space-y-4">
                            <h2 className="text-[32px] font-bold leading-tight">
                                Expanded ideas,
                                <br />
                                pondering ideas!
                            </h2>
                            <p className="text-lg text-gray-600">곰곰에 대해 더 알아보기</p>
                        </div>
                    </div>

                    {/* 중앙 설명 영역 */}
                    <div className="border border-gray-200 p-8 h-[280px]">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We enjoy this process of contemplating.
                            <br />
                            The new senses we can feel in the
                            <br />
                            unexpected always excites us.
                        </p>
                    </div>

                    {/* 오른쪽 이미지 영역 */}
                    <div className="border border-gray-200 h-[280px]">
                        <div className="w-full h-full">
                            <img
                                src="/images/placeholder.png"
                                alt="About GomGom"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};
export default MainPage;
