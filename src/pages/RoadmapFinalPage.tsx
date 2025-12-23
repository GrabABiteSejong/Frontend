import { useEffect, useState } from 'react';
import type { AnswersData } from '../data/roadmapQuestions';
import './RoadmapFinalPage.css';

export function RoadmapFinalPage() {
    const [answersData, setAnswersData] = useState<AnswersData | null>(null);

    useEffect(() => {
        // localStorage에서 답변 데이터 가져오기
        const savedData = localStorage.getItem('roadmapAnswers');
        if (savedData) {
            const data = JSON.parse(savedData) as AnswersData;
            setAnswersData(data);
            console.log('저장된 답변 데이터:', data);
        }
    }, []);

    return (
        <div className="roadmap-final-page">
            {/* 상단 섹션 - 배경 이미지와 캐릭터 */}
            <div className="final-hero-section">
                {/* 배경 이미지 */}
                <img
                    className="final-background-img"
                    alt="Background"
                    src="/images/roadmap_result_end.png"
                />

                {/* 중앙 캐릭터 이미지 */}
                <img
                    className="final-character-img"
                    alt="Character"
                    src="/images/last_character.png"
                />
            </div>

            {/* 하단 섹션 - 표와 그래프 영역 */}
            <div className="final-content-section">
                <div className="final-content-container">
                    <h2 className="section-title">당신의 진로 분석 결과</h2>

                    {/* 답변 데이터 표시 */}
                    {answersData && (
                        <div className="answers-display">
                            <h3 className="subsection-title">답변 데이터 (개발용)</h3>
                            <pre className="answers-json">
                                {JSON.stringify(answersData, null, 2)}
                            </pre>
                        </div>
                    )}

                    {/* 임시 플레이스홀더 */}
                    <div className="placeholder-chart">
                        <p>여기에 AI 분석 기반 그래프가 표시됩니다</p>
                    </div>

                    <div className="placeholder-table">
                        <p>여기에 추천 로드맵 표가 표시됩니다</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
