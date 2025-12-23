import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useNavigate 추가
import { FloatingChatButton } from "@features/floating-chat/FloatingChatButton.tsx";
import './AppShell.css'; // 새로 추가된 CSS

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 페이지 경로 확인
  const isHomePage = location.pathname === '/';
  // 로드맵 관련 페이지인지 확인 (결과 페이지 포함)
  const isRoadmapPage = location.pathname === '/roadmap' || location.pathname === '/roadmap-result';


  // HomePage에는 이미 자체 상단바가 있으므로, 여기서는 숨김 처리 (HEAD 버전의 로직 유지)
  const hideHeader = isHomePage;




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
        {/* 홈페이지가 아닐 때만 공통 헤더 표시 */}
        {!hideHeader && (
            <div className="common-header-container">
              <div className="common-header-wrapper">
                {/* 상단 바 */}
                <div className="common-top-bar" />

                {/* 로고 (두기) */}
                <div
                    className="common-logo-text"
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                >
                  두기
                </div>

                {/* 네비게이션 버튼들 */}
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
        )}

        {/* 페이지 콘텐츠 */}
        <div className="app-content">
          {children}
        </div>

        {/* 플로팅 채팅 버튼 (항상 표시) */}
        <FloatingChatButton />
      </div>
  );
}