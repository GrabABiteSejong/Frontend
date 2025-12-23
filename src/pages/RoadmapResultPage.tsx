import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadmapQuestions, type Question, type AnswersData } from '../data/roadmapQuestions';
import './RoadmapResultPage.css';

export function RoadmapResultPage() {
    const navigate = useNavigate();
    const [showInitial, setShowInitial] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
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

    // 표시할 질문 목록 필터링
    const visibleQuestions = useMemo(() => {
        return roadmapQuestions.filter(q => {
            // visibleWhen 조건 체크
            if (q.visibleWhen) {
                const conditions = Object.entries(q.visibleWhen);
                const allMet = conditions.every(([questionId, requiredValues]) => {
                    const userAnswer = answers[questionId];
                    if (!userAnswer || userAnswer.length === 0) return false;
                    return requiredValues.some(val => userAnswer.includes(val));
                });
                if (!allMet) return false;
            }

            // appliesTo 조건 체크 (Q24_* 질문들)
            if (q.appliesTo) {
                const selectedCollege = answers["Q04"];
                if (!selectedCollege || selectedCollege.length === 0) return false;
                if (!q.appliesTo.includes(selectedCollege[0])) return false;
            }

            return true;
        });
    }, [answers]);

    // 현재 질문
    const currentQuestion = visibleQuestions[currentQuestionIndex];

    // 현재 질문의 옵션 (필터링 적용)
    const currentOptions = useMemo(() => {
        if (!currentQuestion) return [];

        let options = currentQuestion.options;

        // filterBy 조건 적용 (Q05 전공 필터링)
        if (currentQuestion.filterBy) {
            const { field, fromQuestion } = currentQuestion.filterBy;
            const filterValue = answers[fromQuestion]?.[0];

            if (filterValue) {
                options = options.filter(opt => {
                    const optField = (opt as any)[field];
                    return optField === filterValue;
                });
            }
        }

        return options;
    }, [currentQuestion, answers]);

    const handleOptionClick = (optionValue: string) => {
        if (isTransitioning || !currentQuestion) return;

        const questionId = currentQuestion.id;
        const questionType = currentQuestion.type;

        let newAnswer: string[];

        if (questionType === 'multi') {
            // 다중 선택
            const currentSelections = answers[questionId] || [];
            const maxSelections = currentQuestion.max || Infinity;

            if (currentSelections.includes(optionValue)) {
                // 이미 선택된 경우 제거
                newAnswer = currentSelections.filter(v => v !== optionValue);
                setAnswers({ ...answers, [questionId]: newAnswer });
                return; // 다음 질문으로 넘어가지 않음
            } else {
                // 새로 선택
                if (currentSelections.length >= maxSelections) {
                    // 최대 개수 도달 - 아무것도 하지 않음
                    return;
                }
                newAnswer = [...currentSelections, optionValue];
                setAnswers({ ...answers, [questionId]: newAnswer });
                return; // 다음 질문으로 넘어가지 않음
            }
        } else {
            // 단일 선택
            newAnswer = [optionValue];
            setAnswers({ ...answers, [questionId]: newAnswer });
        }

        // 다음 질문으로 이동
        if (currentQuestionIndex < visibleQuestions.length - 1) {
            setIsTransitioning(true);

            // 백그라운드 이미지 아래로 이동
            setBackgroundPosition(backgroundPosition - 380);

            // 전환 완료 후 다음 질문 표시
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setIsTransitioning(false);
            }, 800);
        } else {
            // 마지막 질문 완료
            const finalAnswers: AnswersData = {
                answers: { ...answers, [questionId]: newAnswer },
                completedCourses: [],
                includeFeedback: true
            };
            console.log('모든 질문 완료! 최종 답변:', finalAnswers);

            setIsTransitioning(true);

            // 완료 화면으로 전환
            setTimeout(() => {
                setShowFinalScreen(true);
                setBackgroundPosition(0); // 배경 위치 리셋
                setIsTransitioning(false);
            }, 800);
        }
    };

    // multi 타입에서 다음 버튼 클릭
    const handleMultiNext = () => {
        if (isTransitioning || !currentQuestion) return;

        const questionId = currentQuestion.id;
        const currentSelections = answers[questionId] || [];

        // 최소 1개는 선택해야 함
        if (currentSelections.length === 0) {
            alert('최소 1개 이상 선택해주세요.');
            return;
        }

        // 다음 질문으로 이동
        if (currentQuestionIndex < visibleQuestions.length - 1) {
            setIsTransitioning(true);
            setBackgroundPosition(backgroundPosition - 380);

            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setIsTransitioning(false);
            }, 800);
        } else {
            // 마지막 질문 완료
            const finalAnswers: AnswersData = {
                answers: answers,
                completedCourses: [],
                includeFeedback: true
            };
            console.log('모든 질문 완료! 최종 답변:', finalAnswers);

            setIsTransitioning(true);

            setTimeout(() => {
                setShowFinalScreen(true);
                setBackgroundPosition(0);
                setIsTransitioning(false);
            }, 800);
        }
    };

    if (!currentQuestion && !showFinalScreen) {
        return <div>Loading...</div>;
    }

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
            {!showInitial && !showFinalScreen && currentQuestion && (
                <div className={`question-content ${isTransitioning ? 'transitioning' : ''}`}>
                    {/* 질문 텍스트 */}
                    <div className="question-text">
                        {currentQuestion.text}
                    </div>

                    {/* 선택지 버튼들 */}
                    <div className="options-container">
                        {currentOptions.map((option) => {
                            const isSelected = answers[currentQuestion.id]?.includes(option.value);
                            return (
                                <button
                                    key={option.value}
                                    className={`option-button ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(option.value)}
                                    disabled={isTransitioning}
                                >
                                    <div className="option-text">{option.label}</div>
                                </button>
                            );
                        })}
                    </div>

                    {/* multi 타입인 경우 다음 버튼 표시 */}
                    {currentQuestion.type === 'multi' && (
                        <button
                            className="multi-next-button"
                            onClick={handleMultiNext}
                            disabled={isTransitioning || !answers[currentQuestion.id] || answers[currentQuestion.id].length === 0}
                        >
                            다음 ({answers[currentQuestion.id]?.length || 0}/{currentQuestion.max || '∞'} 선택)
                        </button>
                    )}

                    {/* 진행 상황 표시 */}
                    <div className="progress-indicator">
                        {currentQuestionIndex + 1} / {visibleQuestions.length}
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
                            onClick={() => {
                                // 최종 답변 데이터를 localStorage에 저장
                                const finalData: AnswersData = {
                                    answers: answers,
                                    completedCourses: [],
                                    includeFeedback: true
                                };
                                localStorage.setItem('roadmapAnswers', JSON.stringify(finalData));
                                navigate('/roadmap-final');
                            }}
                        >
                            결과 보러가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
