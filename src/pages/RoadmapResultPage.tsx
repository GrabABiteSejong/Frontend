import './RoadmapResultPage.css';

export function RoadmapResultPage() {

    return (
        <div className="roadmap-result-screen">
            {/* 배경 이미지 */}
            <img className="result-background-img" alt="Background" src="/images/roadmapbackground_ai.png" />

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
    );
}
