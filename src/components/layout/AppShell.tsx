import type {ReactNode} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {FloatingChatButton} from "@features/floating-chat/FloatingChatButton.tsx";
import './AppShell.css';

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const isRoadmapPage = location.pathname === '/roadmap' || location.pathname === '/roadmap-result';

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleRoadmapClick = () => {
        navigate('/roadmap');
    };

    const handleMajorClick = () => {
        navigate('/major-intro');
    };

    return (
        <div className="app-shell">
            {/* 공통 헤더 */}
            <div className="common-header-container">
                <div className="common-header-wrapper">
                    {/* 상단 바 */}
                    <div className="common-top-bar" />

                    {/* 로고 */}
                    <div
                        className="common-logo-text"
                        onClick={handleLogoClick}
                    >
                        두기
                    </div>

                    {/* 네비게이션 버튼 */}
                    <button
                        className={`common-nav-button common-nav-roadmap ${isRoadmapPage ? 'active' : ''}`}
                        onClick={handleRoadmapClick}
                    >
                        진로 로드맵
                    </button>

                    <button
                        className="common-nav-button common-nav-major"
                        onClick={handleMajorClick}
                    >
                        전공 소개
                    </button>
                </div>
            </div>

            {/* 페이지 콘텐츠 */}
            <div className="app-content">
                {children}
            </div>

            {/* 플로팅 채팅 버튼 */}
            <FloatingChatButton />
        </div>
    );
}
