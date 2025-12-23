import { http } from '@services/http';
import { ApiResponse } from '@types/api';
import {
  Roadmap,
  RoadmapGenerateRequest,
  RoadmapGenerateResponse,
} from '../types/roadmap';

export const roadmapApi = {
  generate: async (
    request: RoadmapGenerateRequest
  ): Promise<ApiResponse<RoadmapGenerateResponse>> => {
    return http.post('/roadmap/generate', request);
  },

  getById: async (id: string): Promise<ApiResponse<Roadmap>> => {
    return http.get(`/roadmap/${id}`);
  },

  getMyRoadmaps: async (): Promise<ApiResponse<Roadmap[]>> => {
    return http.get('/roadmap/my');
  },

  update: async (id: string, roadmap: Partial<Roadmap>): Promise<ApiResponse<Roadmap>> => {
    return http.put(`/roadmap/${id}`, roadmap);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return http.delete(`/roadmap/${id}`);
  },
};
