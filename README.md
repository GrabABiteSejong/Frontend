# AI 기반 진로-교과목 로드맵 추천 시스템

React + TypeScript + Vite 기반의 AI 맞춤형 진로 및 교과목 학습 로드맵 추천 서비스입니다.

## 기술 스택

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v7
- **Visualization**: React Flow (로드맵 그래프)
- **HTTP Client**: Axios

## 프로젝트 구조

```
src/
├── app/                 # 앱 설정 (라우터, providers)
├── components/          # 공통 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   └── ui/             # UI 컴포넌트
├── features/           # 기능별 모듈
│   └── roadmap/        # 로드맵 기능
├── pages/              # 페이지 컴포넌트
├── services/           # API 서비스
├── types/              # 타입 정의
├── config/             # 환경 설정
└── styles/             # 전역 스타일
```

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

```bash
cp .env.example .env
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 주요 기능

- AI 기반 맞춤형 교과목 로드맵 생성
- React Flow를 활용한 시각적 로드맵 표현
- 선수과목 관계 및 학습 경로 시각화
- 진로 목표에 따른 추천 시스템

## License

MIT
