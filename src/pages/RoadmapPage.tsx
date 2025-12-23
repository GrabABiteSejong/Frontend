import { useNavigate } from 'react-router-dom';
import './RoadmapPage.css';

export function RoadmapPage() {
    const navigate = useNavigate();

    const handleMajorIntroClick = () => {
        console.log('전공 소개 클릭');
        // navigate('/major-intro'); // 페이지 준비되면 활성화
    };

    const handleCharacterClick = () => {
        console.log('캐릭터 클릭');
    };

    return (
        <div className="roadmap-screen">
            {/* 배경 이미지 */}
            <img className="roadmap-background-img" alt="Background" src="/images/rectangle-7.png" />

            {/* 그라데이션 오버레이 */}
            <div className="roadmap-gradient-overlay" />

            {/* 상단 바 */}
            <div className="roadmap-top-bar" />

            {/* 로고 텍스트 */}
            <div className="roadmap-logo-text">Please My Major</div>

            {/* 진로 로드맵 버튼 (현재 페이지 - 활성화 상태) */}
            <div className="roadmap-nav-button roadmap-nav-active">
                진로 로드맵
            </div>

            {/* 전공 소개 버튼 */}
            <button
                className="roadmap-nav-button roadmap-nav-major"
                onClick={handleMajorIntroClick}
            >
                전공 소개
            </button>

            {/* 메인 텍스트 */}
            <div className="roadmap-main-text">안녕하세요 탐험가님,</div>

            {/* 캐릭터 이미지 */}
            <img className="roadmap-character" alt="Character" src="/images/1.png" />

            {/* 장식 벡터 */}
            <img className="roadmap-vector" alt="Vector" src="/images/vector_roadmap.png" />

            {/* 작은 캐릭터 아이콘 (클릭 가능) */}
            <img
                className="roadmap-character-small clickable"
                alt="Character Icon"
                src="/images/group-20.png"
                onClick={handleCharacterClick}
            />
        </div>
    );
}