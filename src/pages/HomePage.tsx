import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { useRoadmapGenerate } from '@features/roadmap/hooks/useRoadmapQuery';
import type {RoadmapGenerateRequest} from '@features/roadmap/types/roadmap';
import { env } from '@config/env';

export function HomePage() {
  const navigate = useNavigate();
  const generateMutation = useRoadmapGenerate();
  const [formData, setFormData] = useState<RoadmapGenerateRequest>({
    career: '',
    interests: [],
    currentLevel: 'beginner',
    targetSemester: 8,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await generateMutation.mutateAsync(formData);
      if (result.success && result.data.roadmap) {
        navigate(`/roadmap?id=${result.data.roadmap.id}`);
      }
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{env.appTitle}</h1>
        <p className="text-lg text-gray-600">{env.appDescription}</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="career" className="block text-sm font-medium text-gray-700 mb-2">
              희망 진로
            </label>
            <input
              id="career"
              type="text"
              value={formData.career}
              onChange={(e) => setFormData({ ...formData, career: e.target.value })}
              placeholder="예: 백엔드 개발자, 데이터 사이언티스트"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
              관심 분야 (쉼표로 구분)
            </label>
            <input
              id="interests"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, interests: e.target.value.split(',').map((s) => s.trim()) })
              }
              placeholder="예: 웹 개발, 인공지능, 데이터베이스"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              현재 수준
            </label>
            <select
              id="level"
              value={formData.currentLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">초급</option>
              <option value="intermediate">중급</option>
              <option value="advanced">고급</option>
            </select>
          </div>

          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
              목표 학기
            </label>
            <input
              id="semester"
              type="number"
              min="1"
              max="12"
              value={formData.targetSemester}
              onChange={(e) =>
                setFormData({ ...formData, targetSemester: Number(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <Button type="submit" className="w-full" isLoading={generateMutation.isPending}>
            AI 로드맵 생성
          </Button>
        </form>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card title="AI 기반 추천">
          <p className="text-gray-600">
            인공지능이 당신의 진로 목표와 관심사를 분석하여 최적의 학습 경로를 추천합니다.
          </p>
        </Card>
        <Card title="시각적 로드맵">
          <p className="text-gray-600">
            교과목 간의 선수과목 관계와 학습 흐름을 시각적 그래프로 명확하게 확인할 수 있습니다.
          </p>
        </Card>
        <Card title="맞춤형 학습">
          <p className="text-gray-600">
            현재 수준과 목표에 맞춘 개인화된 교과목 로드맵으로 효율적인 학습이 가능합니다.
          </p>
        </Card>
      </div>
    </div>
  );
}
