import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { roadmapApi } from '../api/roadmap.api';
import { RoadmapGenerateRequest, Roadmap } from '../types/roadmap';

const QUERY_KEYS = {
  roadmaps: ['roadmaps'] as const,
  roadmap: (id: string) => ['roadmap', id] as const,
  myRoadmaps: ['roadmaps', 'my'] as const,
};

export function useRoadmapGenerate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RoadmapGenerateRequest) => roadmapApi.generate(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myRoadmaps });
    },
  });
}

export function useRoadmap(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.roadmap(id),
    queryFn: () => roadmapApi.getById(id),
    enabled: !!id,
  });
}

export function useMyRoadmaps() {
  return useQuery({
    queryKey: QUERY_KEYS.myRoadmaps,
    queryFn: () => roadmapApi.getMyRoadmaps(),
  });
}

export function useRoadmapUpdate(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roadmap: Partial<Roadmap>) => roadmapApi.update(id, roadmap),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roadmap(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myRoadmaps });
    },
  });
}

export function useRoadmapDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roadmapApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myRoadmaps });
    },
  });
}
