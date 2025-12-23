import { useSearchParams } from 'react-router-dom';
import { Card } from '@components/ui/Card';
import { Loading } from '@components/ui/Loading';
import { RoadmapCanvas } from '@features/roadmap/components/RoadmapCanvas';
import { useRoadmap } from '@features/roadmap/hooks/useRoadmapQuery';

export function RoadmapPage() {
  const [searchParams] = useSearchParams();
  const roadmapId = searchParams.get('id');

  const { data, isLoading, error } = useRoadmap(roadmapId || '');

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (error || !data?.success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold mb-2">오류 발생</h2>
          <p>로드맵을 불러오는데 실패했습니다.</p>
        </div>
      </Card>
    );
  }

  const roadmap = data.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.title}</h1>
        {roadmap.description && <p className="text-gray-600">{roadmap.description}</p>}
        <div className="mt-2 text-sm text-gray-500">
          진로: <span className="font-medium text-gray-700">{roadmap.career}</span>
        </div>
      </div>

      <Card>
        <RoadmapCanvas nodes={roadmap.nodes} edges={roadmap.edges} readOnly />
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="총 교과목 수">
          <p className="text-3xl font-bold text-blue-600">
            {roadmap.nodes.filter((n) => n.type === 'course').length}개
          </p>
        </Card>
        <Card title="마일스톤">
          <p className="text-3xl font-bold text-yellow-600">
            {roadmap.nodes.filter((n) => n.type === 'milestone').length}개
          </p>
        </Card>
      </div>

      <Card title="생성 정보">
        <div className="space-y-2 text-sm text-gray-600">
          <p>생성일: {new Date(roadmap.createdAt).toLocaleDateString('ko-KR')}</p>
          <p>수정일: {new Date(roadmap.updatedAt).toLocaleDateString('ko-KR')}</p>
        </div>
      </Card>
    </div>
  );
}
