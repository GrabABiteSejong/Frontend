import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadmapQuestions } from '../data/roadmapQuestions';
import './RoadmapResultPage.css';

export function RoadmapResultPage() {
    const navigate = useNavigate();
    const [showInitial, setShowInitial] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [backgroundPosition, setBackgroundPosition] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [showResultButton, setShowResultButton] = useState(false);

    // 2초 후 초기 화면 사라지기
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInitial(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // 완료 화면 표시 2초 후 결과 버튼 표시
    useEffect(() => {
        if (showFinalScreen) {
            const timer = setTimeout(() => {
                setShowResultButton(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showFinalScreen]);

    const handleOptionClick = (optionId: number) => {
        if (isTransitioning) return; // 전환 중이면 클릭 무시

        // 답변 저장
        setAnswers([...answers, optionId]);

        // 다음 질문으로 이동
        if (currentQuestionIndex < roadmapQuestions.length - 1) {
            setIsTransitioning(true);

            // 백그라운드 이미지 아래로 이동 (1080px씩)
            setBackgroundPosition(backgroundPosition - 380);

            // 전환 완료 후 다음 질문 표시
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setIsTransitioning(false);
            }, 800);
        } else {
            // 마지막 질문 완료
            console.log('모든 질문 완료! 답변:', [...answers, optionId]);
            setIsTransitioning(true);

            // 완료 화면으로 전환
            setTimeout(() => {
                setShowFinalScreen(true);
                setBackgroundPosition(0); // 배경 위치 리셋
                setIsTransitioning(false);
            }, 800);
        }
    };

    const currentQuestion = roadmapQuestions[currentQuestionIndex];

    return (
        <div className="roadmap-result-screen">
            {/* 배경 이미지 (스크롤되는 부분) */}
            <div
                className="result-background-container"
                style={{
                    transform: `translateY(${backgroundPosition}px)`,
                    transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none'
                }}
            >
                <img
                    className="result-background-img"
                    alt="Background"
                    src={showFinalScreen ? "/images/roadmap_result_end.png" : "/images/roadmapbackground_ai.png"}
                />
            </div>

            {/* 초기 화면 (2초 후 사라짐) - 고정 위치 */}
            <div className={`initial-content ${!showInitial ? 'fade-out' : ''}`}>
                {/* 메인 텍스트 */}
                <div className="result-main-text">
                    이제 두기와 함께 진로 로드맵을 그려봐요!
                </div>

                {/* 캐릭터 이미지 */}
                <img
                    className="result-character"
                    alt="Character"
                    src="/images/1.png"
                />

                {/* 장식 벡터 */}
                <img
                    className="result-vector"
                    alt="Vector"
                    src="/images/vector_roadmap.png"
                />
            </div>

            {/* 질문 화면 (2초 후 나타남) - 고정 위치, 화면 중앙 */}
            {!showInitial && !showFinalScreen && (
                <div className={`question-content ${isTransitioning ? 'transitioning' : ''}`}>
                    {/* 질문 텍스트 */}
                    <div className="question-text">
                        {currentQuestion.question}
                    </div>

                    {/* 선택지 버튼들 */}
                    <div className="options-container">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.id}
                                className="option-button"
                                onClick={() => handleOptionClick(option.id)}
                                disabled={isTransitioning}
                            >
                                <div className="option-text">{option.text}</div>
                            </button>
                        ))}
                    </div>

                    {/* 진행 상황 표시 */}
                    <div className="progress-indicator">
                        {currentQuestionIndex + 1} / {roadmapQuestions.length}
                    </div>
                </div>
            )}

            {/* 완료 화면 */}
            {showFinalScreen && (
                <div className="final-content">
                    <div className={`final-text ${showResultButton ? 'fade-change' : ''}`}>
                        {showResultButton ? '탐험가님의 결과를 알아볼까요?' : '드디어 하늘을 볼 수 있게 되었어요!'}
                    </div>

                    {showResultButton && (
                        <button
                            className="result-button"
                            onClick={() => navigate('/roadmap-final')}
                        >
                            결과 보러가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
