import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoadmapPage.css';

type StudentStatus = '재학' | '입학예정' | null;
type Step = 1 | 2 | 3;

// 계열별 세부 전공 매핑
const majorDetailsMap: Record<string, string[]> = {
    '인문사회': ['언어', '무역', '행정', '법학'],
    '경상호텔': ['경영', '경제', '호텔경영', '조리'],
    'IT계열': ['AI융합', '반도체', '컴공', '정보보호'],
    '공과계열': ['건축', '환경', '기계', '나노신소재'],
};

export function RoadmapPage() {
    const navigate = useNavigate();
    const [showIntermediateText, setShowIntermediateText] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [step, setStep] = useState<Step>(1);
    const [selectedStatus, setSelectedStatus] = useState<StudentStatus>(null);
    const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
    const [selectedDetailMajor, setSelectedDetailMajor] = useState<string | null>(null);
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 단계별 텍스트 전환
    useEffect(() => {
        console.log('RoadmapPage mounted, 타이머 시작');

        // 4초 후 중간 텍스트 표시
        const timer1 = setTimeout(() => {
            console.log('2초 경과 - 중간 텍스트 표시');
            setShowIntermediateText(true);
        }, 2000);

        // 4초 후 버튼 표시
        const timer2 = setTimeout(() => {
            console.log('3초 경과 - 버튼 표시');
            setShowButtons(true);
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
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
        if (step === 1 && selectedStatus) {
            // 1단계 -> 2단계 전환 (애니메이션)
            setIsTransitioning(true);
            setTimeout(() => {
                setStep(2);
                setIsTransitioning(false);
            }, 800);
        } else if (step === 2) {
            if (selectedStatus === '입학예정' && selectedMajor) {
                // 2단계 -> 3단계 전환 (세부 전공 선택)
                setIsTransitioning(true);
                setTimeout(() => {
                    setStep(3);
                    setIsTransitioning(false);
                }, 800);
            } else if (selectedStatus === '재학' && uploadedFile) {
                // 2단계 -> 3단계 전환 (학년 선택)
                setIsTransitioning(true);
                setTimeout(() => {
                    setStep(3);
                    setIsTransitioning(false);
                }, 800);
            } else {
                alert(selectedStatus === '입학예정' ? '계열을 선택해주세요.' : '파일을 업로드해주세요.');
            }
        } else if (step === 3) {
            if (selectedStatus === '입학예정' && selectedDetailMajor) {
                console.log('선택된 계열:', selectedMajor);
                console.log('선택된 세부 전공:', selectedDetailMajor);
                // 다음 단계로 이동
                // navigate('/next-step');
            } else if (selectedStatus === '재학' && selectedGrade) {
                console.log('업로드된 파일:', uploadedFile?.name);
                console.log('선택된 학년:', selectedGrade);
                // 다음 단계로 이동
                // navigate('/next-step');
            }
        }
    };

    const handleMajorSelect = (major: string) => {
        setSelectedMajor(major);
    };

    const handleDetailMajorSelect = (detailMajor: string) => {
        setSelectedDetailMajor(detailMajor);
    };

    const handleGradeSelect = (grade: string) => {
        setSelectedGrade(grade);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.name.endsWith('.xlsx')) {
            setUploadedFile(file);
            console.log('파일 업로드됨:', file.name);
        } else {
            alert('xlsx 파일만 업로드 가능합니다.');
        }
    };

    console.log('현재 showButtons 상태:', showButtons);

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

            {/* 메인 텍스트 - 단계별 변경 */}
            <div className={`roadmap-main-text ${showIntermediateText ? 'fade-out' : ''}`}>
                안녕하세요 탐험가님,
            </div>

            {/* 중간 텍스트 */}
            <div className={`roadmap-main-text-new ${showIntermediateText && !showButtons ? 'fade-in' : ''} ${showButtons ? 'fade-out' : ''}`}>
                로드맵을 그리기에 앞서,<br/>
                먼저 온보딩 설문을 진행해주세요!
            </div>

            {step === 1 && (
                <div className={`roadmap-main-text-new ${showButtons && !isTransitioning ? 'fade-in' : ''} ${isTransitioning ? 'fade-out' : ''}`}>
                    탐험가님의 현재 상태를 선택해주세요.
                </div>
            )}

            {step === 2 && selectedStatus === '입학예정' && (
                <div className={`roadmap-main-text-new ${!isTransitioning ? 'fade-in' : ''} ${isTransitioning ? 'fade-out' : ''}`}>
                    가고 싶은 계열을 선택하세요
                </div>
            )}

            {step === 2 && selectedStatus === '재학' && (
                <div className={`roadmap-main-text-new ${!isTransitioning ? 'fade-in' : ''} ${isTransitioning ? 'fade-out' : ''}`}>
                    학사정보시스템에서 다운받은 정보<br/>
                    엑셀파일을 업로드 해주세요
                </div>
            )}

            {step === 3 && selectedStatus === '입학예정' && (
                <div className={`roadmap-main-text-new ${!isTransitioning ? 'fade-in' : ''}`}>
                    세부 전공을 선택하세요
                </div>
            )}

            {step === 3 && selectedStatus === '재학' && (
                <div className={`roadmap-main-text-new ${!isTransitioning ? 'fade-in' : ''}`}>
                    현재 학년을 선택해주세요.
                </div>
            )}

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

            {/* 1단계: 학생 상태 선택 */}
            {step === 1 && (
                <div className={`status-buttons-container ${showButtons && !isTransitioning ? 'fade-in' : ''} ${isTransitioning ? 'fade-out' : ''}`}>
                    <button
                        className={`status-button ${selectedStatus === '재학' ? 'selected' : ''}`}
                        onClick={() => handleStatusSelect('재학')}
                    >
                        대학교 재학 중
                    </button>

                    <button
                        className={`status-button ${selectedStatus === '입학예정' ? 'selected' : ''}`}
                        onClick={() => handleStatusSelect('입학예정')}
                    >
                        대학교 입학 예정
                    </button>

                    <button
                        className={`next-button ${selectedStatus ? 'enabled' : 'disabled'}`}
                        onClick={handleNextClick}
                        disabled={!selectedStatus}
                    >
                        다음으로
                    </button>
                </div>
            )}

            {/* 2단계: 입학예정 - 계열 선택 */}
            {step === 2 && selectedStatus === '입학예정' && (
                <div className={`status-buttons-container ${!isTransitioning ? 'fade-in' : ''} ${isTransitioning ? 'fade-out' : ''}`}>
                    {['인문사회', '경상호텔', 'IT계열', '공과계열'].map((major) => (
                        <button
                            key={major}
                            className={`status-button ${selectedMajor === major ? 'selected' : ''}`}
                            onClick={() => handleMajorSelect(major)}
                        >
                            {major}
                        </button>
                    ))}

                    <button
                        className={`next-button ${selectedMajor ? 'enabled' : 'disabled'}`}
                        onClick={handleNextClick}
                        disabled={!selectedMajor}
                    >
                        다음으로
                    </button>
                </div>
            )}

            {/* 2단계: 재학중 - 파일 업로드 */}
            {step === 2 && selectedStatus === '재학' && (
                <div className={`file-upload-container ${!isTransitioning ? 'fade-in' : ''} ${isTransitioning ? 'fade-out' : ''}`}>
                    <label htmlFor="file-upload" className="file-upload-box">
                        {uploadedFile ? (
                            <div className="file-uploaded">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#c7ff6b" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="9" y1="15" x2="15" y2="15"></line>
                                </svg>
                                <p className="file-name">{uploadedFile.name}</p>
                                <p className="file-size">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                            </div>
                        ) : (
                            <div className="file-upload-placeholder">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <p>클릭하여 xlsx 파일 업로드</p>
                                <p className="file-hint">또는 파일을 드래그하세요</p>
                            </div>
                        )}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />

                    <button
                        className={`next-button ${uploadedFile ? 'enabled' : 'disabled'}`}
                        onClick={handleNextClick}
                        disabled={!uploadedFile}
                    >
                        다음으로
                    </button>
                </div>
            )}

            {/* 3단계: 입학예정 - 세부 전공 선택 */}
            {step === 3 && selectedStatus === '입학예정' && selectedMajor && (
                <div className={`status-buttons-container ${!isTransitioning ? 'fade-in' : ''}`}>
                    {majorDetailsMap[selectedMajor]?.map((detailMajor) => (
                        <button
                            key={detailMajor}
                            className={`status-button ${selectedDetailMajor === detailMajor ? 'selected' : ''}`}
                            onClick={() => handleDetailMajorSelect(detailMajor)}
                        >
                            {detailMajor}
                        </button>
                    ))}

                    <button
                        className={`next-button ${selectedDetailMajor ? 'enabled' : 'disabled'}`}
                        onClick={handleNextClick}
                        disabled={!selectedDetailMajor}
                    >
                        다음으로
                    </button>
                </div>
            )}

            {/* 3단계: 재학중 - 학년 선택 */}
            {step === 3 && selectedStatus === '재학' && (
                <div className={`status-buttons-container ${!isTransitioning ? 'fade-in' : ''}`}>
                    {['1학년', '2학년', '3학년', '4학년'].map((grade) => (
                        <button
                            key={grade}
                            className={`status-button ${selectedGrade === grade ? 'selected' : ''}`}
                            onClick={() => handleGradeSelect(grade)}
                        >
                            {grade}
                        </button>
                    ))}

                    <button
                        className={`next-button ${selectedGrade ? 'enabled' : 'disabled'}`}
                        onClick={handleNextClick}
                        disabled={!selectedGrade}
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