export interface Task {
  globalId: number;
  id: number;
  contentId: number;
  status: string;
  title?: string;
  description?: string;
  body?: string;
  creator: string;
  assignee?: string;
  completeUser?: string;
  createDate: number;
  dueDate?: number;
  updateDate?: number;
  completeDate?: number;
}
