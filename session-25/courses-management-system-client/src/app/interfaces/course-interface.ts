export interface CourseInterface {
  _id: string;
  title: string;
  instructor: string;
  description?: string;
  price: number;
  duration: string;
  rating?: number;
  students?: number;
  imageUrl?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'frontend' | 'backend' | 'database' | 'programming' | 'devops' | 'mobile';
}
