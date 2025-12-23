interface EnvConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  appTitle: string;
  appDescription: string;
  enableDebug: boolean;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || defaultValue || '';
};

export const env: EnvConfig = {
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000/api'),
  apiTimeout: Number(getEnvVar('VITE_API_TIMEOUT', '30000')),
  appTitle: getEnvVar('VITE_APP_TITLE', 'AI 진로-교과목 로드맵 추천 시스템'),
  appDescription: getEnvVar(
    'VITE_APP_DESCRIPTION',
    'AI 기반 맞춤형 진로 및 교과목 학습 로드맵 추천 서비스'
  ),
  enableDebug: getEnvVar('VITE_ENABLE_DEBUG', 'false') === 'true',
};
