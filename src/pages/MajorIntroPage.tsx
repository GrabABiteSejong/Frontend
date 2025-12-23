import { useState } from 'react';
import './MajorIntroPage.css';

const colleges = [
    "인문과학대학",
    "사회과학대학",
    "경영경제대학",
    "호텔관광대학",
    "자연과학대학",
    "생명과학대학",
    "인공지능융합대학",
    "공과대학",
    "예체능대학"
];

// 각 단과대학별 학과 목록
const departmentsByCollege: { [key: string]: string[] } = {
    "인문과학대학": ["국어국문학과", "교육학과", "국제학부", "글로벌인재학부", "역사학과"],
    // 나머지 단과대학은 추후 추가 가능
};

export function MajorIntroPage() {
    const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleCollegeClick = (college: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setSelectedCollege(college);
            setIsTransitioning(false);
        }, 500);
        console.log('선택된 단과대학:', college);
    };

    const handleDepartmentClick = (department: string) => {
        console.log('선택된 학과:', department);
        // TODO: 학과 상세 페이지로 이동
    };

    return (
        <div className="major-intro-page">
            {/* 상단 히어로 섹션 */}
            <div className="intro-hero-section">
                {/* 배경 이미지 */}
                <img
                    className="intro-background-img"
                    alt="Background"
                    src="/images/last_introduction_back.png"
                />

                {/* 중앙 캐릭터 이미지 */}
                <img
                    className="intro-character-img"
                    alt="Character"
                    src="/images/last_introduction.png"
                />
            </div>

            {/* 하단 콘텐츠 섹션 */}
            <div className="intro-content-section">
                <div className="intro-content-container">
                    {/* 단과대학 목록 */}
                    {!selectedCollege && (
                        <div className={`college-list-view ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                            {/* 안내 텍스트 */}
                            <h2 className="intro-title">
                                해당 단과대학의 폴더를 클릭하면 학과에 대해 자세히 볼 수 있어요!
                            </h2>
                            <p className="intro-subtitle">
                                해당학과에 특화된 AI 기능을 사용해보실 수 있어요.
                            </p>

                            {/* 단과대학 폴더 그리드 */}
                            <div className="colleges-grid">
                                {colleges.map((college, index) => (
                                    <div
                                        key={index}
                                        className="college-folder"
                                        onClick={() => handleCollegeClick(college)}
                                    >
                                        {/* 폴더 상단 */}
                                        <svg className="folder-top" viewBox="0 0 519 412" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 1H144.993C149.124 1.00005 153.142 2.34587 156.438 4.83398L224.451 56.1641C228.095 58.9142 232.536 60.4023 237.102 60.4023H499C509.493 60.4023 518 68.9089 518 79.4023V392C518 402.493 509.493 411 499 411H20C9.50659 411 1 402.493 1 392V20C1 9.67049 9.24292 1.26588 19.5098 1.00586L20 1Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
                                        </svg>

                                        {/* 폴더 하단 */}
                                        <svg className="folder-bottom" viewBox="0 0 519 285" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 1H499C509.493 1.00002 518 9.5066 518 20V265C518 275.493 509.493 284 499 284H20C9.50659 284 1 275.493 1 265V20C1 9.50659 9.50659 1 20 1Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
                                        </svg>

                                        {/* 폴더 텍스트 */}
                                        <div className="folder-text">
                                            {college}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 학과 목록 */}
                    {selectedCollege && departmentsByCollege[selectedCollege] && (
                        <div className={`department-list-view ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                            {/* 단과대학 이름 */}
                            <h1 className="department-college-title">
                                {selectedCollege}
                            </h1>

                            {/* 안내 텍스트 */}
                            <p className="department-subtitle-green">
                                당신의 진로 안내 도우미, Please My Major.
                            </p>
                            <p className="department-subtitle-white">
                                해당 학과의 폴더를 클릭하면 학과 상세 페이지로 이동해요!
                            </p>

                            {/* 학과 폴더 그리드 */}
                            <div className="departments-grid">
                                {departmentsByCollege[selectedCollege].map((department, index) => (
                                    <div
                                        key={index}
                                        className="department-folder"
                                        onClick={() => handleDepartmentClick(department)}
                                    >
                                        {/* 폴더 상단 */}
                                        <svg className="folder-top" viewBox="0 0 519 412" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 1H144.993C149.124 1.00005 153.142 2.34587 156.438 4.83398L224.451 56.1641C228.095 58.9142 232.536 60.4023 237.102 60.4023H499C509.493 60.4023 518 68.9089 518 79.4023V392C518 402.493 509.493 411 499 411H20C9.50659 411 1 402.493 1 392V20C1 9.67049 9.24292 1.26588 19.5098 1.00586L20 1Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
                                        </svg>

                                        {/* 폴더 하단 */}
                                        <svg className="folder-bottom" viewBox="0 0 519 285" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 1H499C509.493 1.00002 518 9.5066 518 20V265C518 275.493 509.493 284 499 284H20C9.50659 284 1 275.493 1 265V20C1 9.50659 9.50659 1 20 1Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
                                        </svg>

                                        {/* 폴더 텍스트 */}
                                        <div className="folder-text">
                                            {department}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
