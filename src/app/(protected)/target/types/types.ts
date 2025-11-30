export interface Target {
  id: number;
  user_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string | null;
  created_at: string | null;
}

export interface TargetTypes {
  data: Target[];
}
