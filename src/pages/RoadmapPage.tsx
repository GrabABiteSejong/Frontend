import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoadmapPage.css';

type StudentStatus = '재학' | '입학예정' | null;

export function RoadmapPage() {
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<StudentStatus>(null);

    // 4초 후 버튼 표시
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButtons(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const handleMajorIntroClick = () => {
        console.log('전공 소개 클릭');
        // navigate('/major-intro'); // 페이지 준비되면 활성화
    };

    const handleCharacterClick = () => {
        console.log('캐릭터 클릭');
    };

    const handleStatusSelect = (status: StudentStatus) => {
        setSelectedStatus(status);
    };

    const handleNextClick = () => {
        if (selectedStatus) {
            console.log('선택된 상태:', selectedStatus);
            // 다음 단계로 이동
            // navigate('/next-step');
        } else {
            alert('학생 상태를 선택해주세요.');
        }
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

            {/* 메인 텍스트 - 4초 후 변경 */}
            <div className={`roadmap-main-text ${showButtons ? 'fade-out' : ''}`}>
                안녕하세요 탐험가님,
            </div>
            <div className={`roadmap-main-text-new ${showButtons ? 'fade-in' : ''}`}>
                탐험가님의 현재 상태를 선택해주세요.
            </div>

            {/* 캐릭터 이미지 - 4초 후 사라짐 */}
            <img
                className={`roadmap-character ${showButtons ? 'fade-out' : ''}`}
                alt="Character"
                src="/images/1.png"
            />

            {/* 장식 벡터 - 4초 후 사라짐 */}
            <img
                className={`roadmap-vector ${showButtons ? 'fade-out' : ''}`}
                alt="Vector"
                src="/images/vector_roadmap.png"
            />

            {/* 선택 버튼들 - 4초 후 표시 */}
            {showButtons && (
                <div className="status-buttons-container fade-in">
                    {/* 대학교 재학 중 버튼 */}
                    <button
                        className={`status-button ${selectedStatus === '재학' ? 'selected' : ''}`}
                        onClick={() => handleStatusSelect('재학')}
                    >
                        대학교 재학 중
                    </button>

                    {/* 대학교 입학 예정 버튼 */}
                    <button
                        className={`status-button ${selectedStatus === '입학예정' ? 'selected' : ''}`}
                        onClick={() => handleStatusSelect('입학예정')}
                    >
                        대학교 입학 예정
                    </button>

                    {/* 다음으로 버튼 */}
                    <button
                        className={`next-button ${selectedStatus ? 'enabled' : 'disabled'}`}
                        onClick={handleNextClick}
                        disabled={!selectedStatus}
                    >
                        다음으로
                    </button>
                </div>
            )}

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