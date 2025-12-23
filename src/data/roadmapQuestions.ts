export interface QuestionOption {
    label: string;
    value: string;
    college?: string; // Q05 전공 필터링용
}

export interface Question {
    id: string;
    text: string;
    type: 'single' | 'multi';
    max?: number; // multi 타입에서 최대 선택 개수
    options: QuestionOption[];
    visibleWhen?: { [key: string]: string[] }; // 조건부 표시
    filterBy?: { field: string; fromQuestion: string }; // 옵션 필터링
    appliesTo?: string[]; // 특정 단과대에만 표시
}

// API 전송용 답변 데이터 타입
export interface AnswersData {
    answers: { [key: string]: string[] };
    completedCourses: string[];
    includeFeedback: boolean;
}

export const roadmapQuestions: Question[] = [
    {
        id: "Q01",
        text: "재학 상태를 선택해주세요",
        type: "single",
        options: [
            { label: "재학 중", value: "ENROLLED" },
            { label: "예비 대학생", value: "PRE_UNI" }
        ]
    },
    {
        id: "Q02",
        text: "현재 학년을 선택해주세요",
        type: "single",
        options: [
            { label: "1학년", value: "Y1" },
            { label: "2학년", value: "Y2" },
            { label: "3학년", value: "Y3" },
            { label: "4학년", value: "Y4" }
        ],
        visibleWhen: { "Q01": ["ENROLLED"] }
    },
    {
        id: "Q03",
        text: "현재 학기(재학 기준)를 선택해주세요",
        type: "single",
        options: [
            { label: "1학기", value: "S1" },
            { label: "2학기", value: "S2" }
        ],
        visibleWhen: { "Q01": ["ENROLLED"] }
    },
    {
        id: "Q04",
        text: "희망 단과대를 선택해주세요",
        type: "single",
        options: [
            { label: "생명과학대학", value: "COL_LIFE" },
            { label: "자연과학대학", value: "COL_NATSCI" },
            { label: "인공지능융합대학", value: "COL_AIC" },
            { label: "인문과학대학", value: "COL_HUM" },
            { label: "사회과학대학", value: "COL_SOC" },
            { label: "공과대학", value: "COL_ENG" },
            { label: "호텔관광대학", value: "COL_HTM" },
            { label: "경영경제대학", value: "COL_BIZ" },
            { label: "아직 모르겠음", value: "COL_UNKNOWN" }
        ]
    },
    {
        id: "Q05",
        text: "희망 학과(전공)를 선택해주세요",
        type: "single",
        options: [
            { label: "식품생명공학과", value: "식품생명공학과", college: "COL_LIFE" },
            { label: "물리천문학과", value: "물리천문학과", college: "COL_NATSCI" },
            { label: "수학통계학과", value: "수학통계학과", college: "COL_NATSCI" },
            { label: "화학과", value: "화학과", college: "COL_NATSCI" },
            { label: "인공지능데이터사이언스학과", value: "인공지능데이터사이언스학과", college: "COL_AIC" },
            { label: "AI로봇학과", value: "AI로봇학과", college: "COL_AIC" },
            { label: "디자인이노베이션전공", value: "디자인이노베이션전공", college: "COL_AIC" },
            { label: "반도체시스템공학과", value: "반도체시스템공학과", college: "COL_AIC" },
            { label: "정보보호학과", value: "정보보호학과", college: "COL_AIC" },
            { label: "지능정보융합학과", value: "지능정보융합학과", college: "COL_AIC" },
            { label: "컴퓨터공학과", value: "컴퓨터공학과", college: "COL_AIC" },
            { label: "콘텐츠소프트웨어학과", value: "콘텐츠소프트웨어학과", college: "COL_AIC" },
            { label: "AI융합전자공학과", value: "AI융합전자공학과", college: "COL_AIC" },
            { label: "국어국문학과", value: "국어국문학과", college: "COL_HUM" },
            { label: "영어데이터융합전공", value: "영어데이터융합전공", college: "COL_HUM" },
            { label: "일어일문학전공", value: "일어일문학전공", college: "COL_HUM" },
            { label: "중국통상학과", value: "중국통상학과", college: "COL_HUM" },
            { label: "교육학과", value: "교육학과", college: "COL_HUM" },
            { label: "법학과", value: "법학과", college: "COL_SOC" },
            { label: "미디어커뮤니케이션학과", value: "미디어커뮤니케이션학과", college: "COL_SOC" },
            { label: "건설환경공학과", value: "건설환경공학과", college: "COL_ENG" },
            { label: "건축공학과", value: "건축공학과", college: "COL_ENG" },
            { label: "건축학과", value: "건축학과", college: "COL_ENG" },
            { label: "기계공학과", value: "기계공학과", college: "COL_ENG" },
            { label: "나노신소재공학과", value: "나노신소재공학과", college: "COL_ENG" },
            { label: "양자원자력공학과", value: "양자원자력공학과", college: "COL_ENG" },
            { label: "우주항공공학전공", value: "우주항공공학전공", college: "COL_ENG" },
            { label: "지구자원시스템공학과", value: "지구자원시스템공학과", college: "COL_ENG" },
            { label: "지능형드론융합전공", value: "지능형드론융합전공", college: "COL_ENG" },
            { label: "환경융합공학과", value: "환경융합공학과", college: "COL_ENG" },
            { label: "호텔외식관광프랜차이즈경영학과", value: "호텔외식관광프랜차이즈경영학과", college: "COL_HTM" },
            { label: "호텔외식비즈니스학과", value: "호텔외식비즈니스학과", college: "COL_HTM" },
            { label: "글로벌조리학과", value: "글로벌조리학과", college: "COL_HTM" },
            { label: "경영학부", value: "경영학부", college: "COL_BIZ" },
            { label: "경제학과", value: "경제학과", college: "COL_BIZ" }
        ],
        filterBy: { field: "college", fromQuestion: "Q04" }
    },
    {
        id: "Q06",
        text: "관심 분야를 선택해주세요 (최대 2개)",
        type: "multi",
        max: 2,
        options: [
            { label: "AI/데이터", value: "AI_DATA" },
            { label: "웹/앱 개발", value: "SW_DEV" },
            { label: "보안", value: "SECURITY" },
            { label: "로봇/임베디드", value: "ROBOT_EMB" },
            { label: "반도체/하드웨어", value: "HW_SEMI" },
            { label: "디자인/콘텐츠", value: "DESIGN_CONTENT" },
            { label: "바이오/생명", value: "BIO_LIFE" },
            { label: "식품/영양", value: "FOOD_NUT" },
            { label: "정책/법/공공", value: "PUBLIC_LAW" },
            { label: "경영/전략", value: "BIZ_STRAT" },
            { label: "마케팅/브랜딩", value: "MKT_BRAND" },
            { label: "관광/서비스", value: "TOUR_SERVICE" },
            { label: "기초과학(물리/화학)", value: "BASIC_SCI" },
            { label: "수학/통계", value: "MATH_STAT" }
        ]
    },
    {
        id: "Q07",
        text: "졸업 후 목표에 가까운 건 무엇인가요?",
        type: "single",
        options: [
            { label: "취업(기업)", value: "JOB_CORP" },
            { label: "취업(공공/공기업)", value: "JOB_PUBLIC" },
            { label: "대학원/연구", value: "GRAD_RESEARCH" },
            { label: "창업/프리랜서", value: "STARTUP" },
            { label: "아직 고민", value: "UNSURE" }
        ]
    },
    {
        id: "Q08",
        text: "선호하는 학습 방식은?",
        type: "single",
        options: [
            { label: "이론→실습", value: "THEORY_FIRST" },
            { label: "실습하면서", value: "PRACTICE_FIRST" },
            { label: "균형", value: "BALANCED" }
        ]
    },
    {
        id: "Q09",
        text: "선호하는 과제 스타일(최대 2개)",
        type: "multi",
        max: 2,
        options: [
            { label: "정답형(수학/문제풀이)", value: "TASK_CLOSED" },
            { label: "프로젝트형(서비스/작품)", value: "TASK_PROJECT" },
            { label: "분석/리포트형", value: "TASK_REPORT" },
            { label: "발표/토론형", value: "TASK_DISCUSS" },
            { label: "실험/실습형", value: "TASK_LAB" }
        ]
    },
    {
        id: "Q10",
        text: "협업 선호는 어떤가요?",
        type: "single",
        options: [
            { label: "팀플 선호", value: "TEAM" },
            { label: "혼자 선호", value: "SOLO" },
            { label: "상관없음", value: "ANY" }
        ]
    },
    {
        id: "Q11",
        text: "주당 추가 투자 가능 시간은?",
        type: "single",
        options: [
            { label: "3시간 이하", value: "T_LOW" },
            { label: "4~7시간", value: "T_MID" },
            { label: "8~12시간", value: "T_HIGH" },
            { label: "13시간 이상", value: "T_VERY_HIGH" }
        ]
    },
    {
        id: "Q12",
        text: "한 학기 감당 가능한 난이도는?",
        type: "single",
        options: [
            { label: "쉬움 위주", value: "DIFF_EASY" },
            { label: "보통", value: "DIFF_MED" },
            { label: "도전 가능", value: "DIFF_HARD" }
        ]
    },
    {
        id: "Q13",
        text: "수학/통계 자신감은?",
        type: "single",
        options: [
            { label: "자신 있음", value: "MATH_STRONG" },
            { label: "보통", value: "MATH_AVG" },
            { label: "부담됨", value: "MATH_WEAK" }
        ]
    },
    {
        id: "Q14",
        text: "코딩 자신감은?",
        type: "single",
        options: [
            { label: "자신 있음", value: "CODE_STRONG" },
            { label: "보통", value: "CODE_AVG" },
            { label: "부담됨", value: "CODE_WEAK" }
        ]
    },
    {
        id: "Q15",
        text: "데이터/통계 분석 경험은?",
        type: "single",
        options: [
            { label: "많음", value: "STAT_HIGH" },
            { label: "조금", value: "STAT_MID" },
            { label: "거의 없음", value: "STAT_LOW" }
        ]
    },
    {
        id: "Q16",
        text: "AI/ML 경험은?",
        type: "single",
        options: [
            { label: "프로젝트/모델 경험", value: "AI_HIGH" },
            { label: "강의/튜토리얼 정도", value: "AI_MID" },
            { label: "거의 없음", value: "AI_LOW" }
        ]
    },
    {
        id: "Q17",
        text: "강점이라고 느끼는 역량(최대 2개)",
        type: "multi",
        max: 2,
        options: [
            { label: "글쓰기", value: "SK_WRITE" },
            { label: "발표/설득", value: "SK_SPEAK" },
            { label: "논리/분석", value: "SK_LOGIC" },
            { label: "기획/정리", value: "SK_PLAN" },
            { label: "대인관계/서비스", value: "SK_SERVICE" },
            { label: "창작/디자인", value: "SK_DESIGN" },
            { label: "실험/실습", value: "SK_LAB" }
        ]
    },
    {
        id: "Q18",
        text: "가장 스트레스 받는 요소는?",
        type: "single",
        options: [
            { label: "시험", value: "STRESS_EXAM" },
            { label: "팀플", value: "STRESS_TEAM" },
            { label: "발표", value: "STRESS_SPEAK" },
            { label: "리포트/글쓰기", value: "STRESS_WRITE" },
            { label: "수학/통계", value: "STRESS_MATH" },
            { label: "코딩", value: "STRESS_CODE" }
        ]
    },
    {
        id: "Q19",
        text: "추천에서 가장 중요한 기준(최대 2개)",
        type: "multi",
        max: 2,
        options: [
            { label: "흥미/적성", value: "PRIOR_INTEREST" },
            { label: "취업 안정성", value: "PRIOR_JOB" },
            { label: "연봉/시장성", value: "PRIOR_PAY" },
            { label: "전문성/연구", value: "PRIOR_RESEARCH" },
            { label: "워라밸", value: "PRIOR_WLB" }
        ]
    },
    {
        id: "Q20",
        text: "원하는 추천 스타일은?",
        type: "single",
        options: [
            { label: "안전하게(기초/필수 우선)", value: "REC_SAFE" },
            { label: "도전적으로(성장 우선)", value: "REC_CHALLENGE" },
            { label: "균형", value: "REC_BALANCE" }
        ]
    },
    {
        id: "Q21",
        text: "원하는 결과물 형태는?",
        type: "single",
        options: [
            { label: "서비스/앱", value: "OUT_SERVICE" },
            { label: "데이터/대시보드", value: "OUT_DATA" },
            { label: "보고서/글", value: "OUT_WRITE" },
            { label: "발표/기획서", value: "OUT_PRESENT" },
            { label: "실험/작품", value: "OUT_WORK" }
        ]
    },
    {
        id: "Q22",
        text: "영어/자격 준비 의향은?",
        type: "single",
        options: [
            { label: "꼭 하고 싶음", value: "CERT_YES" },
            { label: "상황되면", value: "CERT_MAYBE" },
            { label: "별로", value: "CERT_NO" }
        ]
    },
    {
        id: "Q23",
        text: "선호하는 진로 방향(한 가지)",
        type: "single",
        options: [
            { label: "연구/학문", value: "PATH_RESEARCH" },
            { label: "실무/현장", value: "PATH_FIELD" },
            { label: "기획/전략", value: "PATH_PLAN" },
            { label: "제작/개발", value: "PATH_BUILD" },
            { label: "상담/교육/커뮤니케이션", value: "PATH_PEOPLE" }
        ]
    },
    {
        id: "Q24_AIC",
        text: "인공지능융합대학 기준: 더 끌리는 트랙은?",
        type: "single",
        appliesTo: ["COL_AIC"],
        options: [
            { label: "AI 모델/데이터", value: "AIC_ML" },
            { label: "소프트웨어 개발", value: "AIC_DEV" },
            { label: "보안", value: "AIC_SEC" },
            { label: "로봇", value: "AIC_ROBOT" },
            { label: "반도체/하드웨어", value: "AIC_SEMI" },
            { label: "콘텐츠/디자인", value: "AIC_CONTENT" }
        ]
    },
    {
        id: "Q24_BIZ",
        text: "경영경제대학 기준: 더 끌리는 영역은?",
        type: "single",
        appliesTo: ["COL_BIZ"],
        options: [
            { label: "전략/기획", value: "BIZ_STRAT" },
            { label: "마케팅", value: "BIZ_MKT" },
            { label: "재무/회계", value: "BIZ_FIN" },
            { label: "경제/정책", value: "BIZ_ECON" },
            { label: "데이터 기반 의사결정", value: "BIZ_ANALYTICS" }
        ]
    },
    {
        id: "Q24_HTM",
        text: "호텔관광대학 기준: 더 끌리는 분야는?",
        type: "single",
        appliesTo: ["COL_HTM"],
        options: [
            { label: "호텔/운영", value: "HTM_HOTEL" },
            { label: "관광/기획", value: "HTM_TOUR" },
            { label: "외식/비즈니스", value: "HTM_FNB" },
            { label: "조리/푸드", value: "HTM_COOK" },
            { label: "서비스/CS", value: "HTM_SERVICE" }
        ]
    },
    {
        id: "Q24_SOC",
        text: "사회과학대학 기준: 선호하는 접근 방식은?",
        type: "single",
        appliesTo: ["COL_SOC"],
        options: [
            { label: "정책/제도", value: "SOC_POLICY" },
            { label: "커뮤니케이션/미디어", value: "SOC_MEDIA" },
            { label: "사례/현장 중심", value: "SOC_FIELD" },
            { label: "데이터/조사 분석", value: "SOC_DATA" }
        ]
    },
    {
        id: "Q24_HUM",
        text: "인문과학대학 기준: 더 끌리는 활동은?",
        type: "single",
        appliesTo: ["COL_HUM"],
        options: [
            { label: "읽기/해석", value: "HUM_READ" },
            { label: "글쓰기/창작", value: "HUM_WRITE" },
            { label: "토론/비평", value: "HUM_DEBATE" },
            { label: "교육/지도", value: "HUM_EDU" },
            { label: "데이터/디지털 활용", value: "HUM_DIGITAL" }
        ]
    },
    {
        id: "Q24_NATSCI",
        text: "자연과학대학 기준: 더 편한 스타일은?",
        type: "single",
        appliesTo: ["COL_NATSCI"],
        options: [
            { label: "이론/증명", value: "SCI_THEORY" },
            { label: "실험/실습", value: "SCI_LAB" },
            { label: "문제풀이/계산", value: "SCI_PROBLEM" },
            { label: "데이터/모델링", value: "SCI_DATA" }
        ]
    },
    {
        id: "Q24_ENG",
        text: "공과대학 기준: 더 끌리는 방식은?",
        type: "single",
        appliesTo: ["COL_ENG"],
        options: [
            { label: "설계/제작", value: "ENG_BUILD" },
            { label: "해석/계산", value: "ENG_ANALYSIS" },
            { label: "실험/현장", value: "ENG_FIELD" },
            { label: "시스템/소프트웨어 활용", value: "ENG_SW" }
        ]
    },
    {
        id: "Q24_LIFE",
        text: "생명과학대학 기준: 더 끌리는 방향은?",
        type: "single",
        appliesTo: ["COL_LIFE"],
        options: [
            { label: "실험/연구", value: "LIFE_LAB" },
            { label: "식품/제품/공정", value: "LIFE_PROCESS" },
            { label: "데이터/바이오정보", value: "LIFE_DATA" },
            { label: "품질/분석", value: "LIFE_QA" }
        ]
    }
];
