import {Link, useNavigate} from 'react-router-dom';

import './HomePage.css';

export function HomePage() {
    const navigate = useNavigate();

    const handleRoadmapClick = () => {
        navigate('/roadmap');
    };


    const handleMajorIntroClick = () => {
        // 전공 소개 페이지로 이동 (아직 미구현이면 추후 구현)
        navigate('/major-intro'); // 페이지 준비되면 활성화
    };


    return (
        <div className="home-screen">
            {/* 배경 이미지 */}
            <img className="background-image" alt="Background" src="/images/rectangle-7.png" />

            {/* 그라데이션 오버레이 */}
            <div className="gradient-overlay" />

            {/* 상단 바 */}
            <div className="top-bar" />

            <Link to="/" className="logo-text" style={{ textDecoration: 'none' }}>
                Please My Major
            </Link>



            {/* 메인 타이틀 */}
            <div className="main-title">Please My Major !</div>

            {/* 서브타이틀 */}
            <p className="subtitle">당신의 진로 안내 도우미, Please My Major.</p>


            {/* 진로 로드맵 버튼 (클릭 가능) */}
            <button
                className="nav-button roadmap-button"
                onClick={handleRoadmapClick}
            >
                진로 로드맵
            </button>

            {/* 전공 소개 버튼 (클릭 가능) */}
            <button
                className="nav-button major-button"
                onClick={handleMajorIntroClick}
            >
                전공 소개
            </button>

            {/* 큰 캐릭터 이미지 */}
            <img className="character-large" alt="Character" src="/images/1.png" />

            {/* 장식 벡터 */}
            <img className="decoration-vector" alt="Vector" src="/images/vector-1.png" />

            {/* BACKGROUND 섹션 */}
            <div className="section-title">BACKGROUND</div>

            <p className="section-main-text">
                나의 현재 대학생활에 알맞는 진로를 찾고 싶어요.
            </p>

            <p className="section-description">
                전공과 진로를 스스로 탐색해야 하는 환경 속에서 많은 학생들이 명확한 기준 없이
                <br />
                수강과 선택을 반복하며 막연한 불안을 느끼고 있습니다.
            </p>

            {/* 관련 통계 자료 간단히 (임시 박스) */}
            <div className="placeholder-box statistics-box">
                <div className="placeholder-bg" />
                <div className="placeholder-text">관련 통계 자료 간단히</div>
            </div>

            {/* 웹 소개 (임시 박스) */}
            <div className="placeholder-box intro-box">
                <div className="placeholder-bg" />
                <div className="placeholder-text">웹 소개</div>
            </div>

            {/* 캐릭터 소개 (임시 박스) */}
            <div className="placeholder-box character-intro-box">
                <div className="placeholder-bg" />
                <div className="placeholder-text">캐릭터 소개</div>
            </div>

            {/* 푸터 (임시 박스) */}
            <div className="placeholder-box footer-box">
                <div className="placeholder-bg footer-bg" />
                <div className="placeholder-text footer-text">푸터</div>
            </div>

            {/*/!* 작은 원형 캐릭터 (클릭 가능) *!/*/}
            {/*<img*/}
            {/*    className="character-small clickable"*/}
            {/*    alt="Character Small"*/}
            {/*    src="/images/group-20.png"*/}
            {/*    onClick={handleCharacterClick}*/}
            {/*/>*/}
        </div>
    );
}