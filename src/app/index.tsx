// 앱의 진입점(entry point) 파일입니다.
import { createRoot } from 'react-dom/client';
import './index.css';
import 'primeicons/primeicons.css';
import { createClient } from '@supabase/supabase-js';
import AppProvider from './provider';
import AppRouter from './route.tsx';

// Supabase 클라이언트 초기화
// Supabase는 백엔드 서비스로, 인증/데이터베이스 등의 기능을 제공합니다
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// React 앱을 DOM에 마운트합니다
// AppProvider로 전역 상태와 설정을 제공하고, AppRouter로 라우팅을 처리합니다
createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <AppRouter />
    </AppProvider>,
);
