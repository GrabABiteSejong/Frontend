export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  department: string;
  description?: string;
}

export interface RoadmapNode {
  id: string;
  type: 'course' | 'milestone' | 'career';
  data: {
    label: string;
    course?: Course;
    description?: string;
    semester?: number;
    year?: number;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
  type?: 'default' | 'prerequisite' | 'recommended';
  animated?: boolean;
}

export interface Roadmap {
  id: string;
  userId?: string;
  title: string;
  description?: string;
  career: string;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapGenerateRequest {
  career: string;
  interests?: string[];
  currentLevel?: 'beginner' | 'intermediate' | 'advanced';
  targetSemester?: number;
}

export interface RoadmapGenerateResponse {
  roadmap: Roadmap;
  aiAnalysis?: {
    reasoning: string;
    suggestions: string[];
  };
}
