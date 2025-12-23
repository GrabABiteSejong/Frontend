import type {ReactNode} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AppShell.css';

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRoadmapClick = () => {
        navigate('/roadmap');
    };

    const handleMajorIntroClick = () => {
        console.log('전공 소개 클릭');
        // navigate('/major-intro'); // 페이지 준비되면 활성화
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const isRoadmapPage = location.pathname === '/roadmap' || location.pathname === '/roadmap-result';

    return (
        <div className="app-shell">
            {/* 공통 헤더 컨테이너 */}
            <div className="common-header-container">
                <div className="common-header-wrapper">
                    {/* 상단 바 */}
                    <div className="common-top-bar" />

                    {/* 로고 텍스트 */}
                    <div className="common-logo-text" onClick={handleLogoClick}>
                        Please My Major
                    </div>

                    {/* 진로 로드맵 버튼 */}
                    <button
                        className={`common-nav-button common-nav-roadmap ${isRoadmapPage ? 'active' : ''}`}
                        onClick={handleRoadmapClick}
                    >
                        진로 로드맵
                    </button>

                    {/* 전공 소개 버튼 */}
                    <button
                        className="common-nav-button common-nav-major"
                        onClick={handleMajorIntroClick}
                    >
                        전공 소개
                    </button>
                </div>
            </div>

            {/* 페이지 콘텐츠 */}
            <main className="app-content">
                {children}
            </main>
        </div>
    );
}
