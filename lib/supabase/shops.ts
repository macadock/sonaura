import { Database } from 'types/supabase';

export type Shop = Database['public']['Tables']['shops']['Row'];
