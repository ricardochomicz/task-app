export interface ITask {
    id?: number;
    title: string;
    description: string;
    color?: string;
    favorite?: boolean;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
}