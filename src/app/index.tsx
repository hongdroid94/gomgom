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
    'https://crbqmjtejobqcahbwnyy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyYnFtanRlam9icWNhaGJ3bnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NDgyNjAsImV4cCI6MjA1NDMyNDI2MH0.FSPUyNoFl6FTOpTcDD4nlZnByvOlAbC2MXvNF6LJKT4'
);

// React 앱을 DOM에 마운트합니다
// AppProvider로 전역 상태와 설정을 제공하고, AppRouter로 라우팅을 처리합니다
createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <AppRouter />
    </AppProvider>
);
