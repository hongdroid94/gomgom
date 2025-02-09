# 곰곰 (GomGom) - React + TypeScript + Vite

## 프로젝트 소개
곰곰은 React와 TypeScript를 기반으로 한 웹 애플리케이션입니다.

## 기술 스택
- **프레임워크**: React 18.3
- **언어**: TypeScript
- **빌드 도구**: Vite
- **스타일링**: TailwindCSS
- **UI 라이브러리**: PrimeReact
- **상태 관리**: 
  - Zustand (클라이언트 상태)
  - TanStack Query (서버 상태)
- **백엔드 서비스**: Supabase

## 프로젝트 아키텍처

### Feature Sliced Design
프로젝트는 Feature Sliced Design 패턴을 따르고 있습니다:

```
src/
├── app/          # 앱 초기화, 프로바이더, 라우팅
├── pages/        # 페이지 컴포넌트
├── widgets/      # 복잡한 UI 블록
├── features/     # 비즈니스 로직 단위
├── entities/     # 도메인 모델, 상태
└── shared/       # 공유 유틸리티, UI
```

### 주요 디렉토리 설명
- **app/**: 앱의 진입점. 전역 프로바이더와 라우팅 설정
- **pages/**: 각 라우트에 해당하는 페이지 컴포넌트
- **widgets/**: 재사용 가능한 큰 단위의 UI 블록
- **features/**: 특정 기능 구현 (예: 인증, 프로필 관리 등)
- **entities/**: 도메인 모델과 관련 로직
- **shared/**: 공통 유틸리티, UI 컴포넌트, 타입 등

### 상태 관리
- **Zustand**: 간단한 전역 상태 관리 (인증 상태 등)
- **React Query**: 서버 상태 관리 및 데이터 캐싱

### 스타일링
- **TailwindCSS**: 유틸리티 기반 CSS
- **PrimeReact**: UI 컴포넌트 라이브러리

## 시작하기

### 개발 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

### 환경 변수 설정
`.env` 파일을 생성하고 필요한 환경 변수를 설정하세요:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 코드 품질 관리
- **TypeScript**: 정적 타입 검사
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 스타일 통일

## 기여하기
1. 이슈 생성 또는 기존 이슈 확인
2. Feature 브랜치 생성
3. 변경사항 커밋
4. Pull Request 생성

## 라이선스
This project is licensed under the MIT License - see the LICENSE file for details
