import { createClient } from '@/lib/supabase/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Database } from '@/types/supabase';

export type UseSupabaseQueryProps = {
  table: keyof Database['public']['Tables'];
  select: string;
  pageSize?: number;
};

export const useSupabaseQuery = <T extends object>({
  table,
  select,
}: UseSupabaseQueryProps) => {
  const supabase = createClient();

  const [data, setData] = useState<Array<T> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    const { data, count, error } = await supabase.from(table).select(select);
    if (error) {
      setIsError(true);
    } else {
      setData(data as unknown as Array<T>);
    }
    setIsLoading(false);
  }, [supabase, table, select]);

  useEffect(() => {
    fetchData();
  }, []);

  return useMemo(
    () => ({
      data,
      isError,
      isLoading,
      refetch: fetchData,
    }),
    [data, isLoading, isError, fetchData],
  );
};
