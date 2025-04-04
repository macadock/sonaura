import { Database } from 'types/supabase';

export type CategoryType = Database['public']['Tables']['categories']['Row'];
