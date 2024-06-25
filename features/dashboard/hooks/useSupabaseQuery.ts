import { createClient } from '@/lib/supabase/client';
import { useCallback, useMemo, useState } from 'react';
import { Database } from '@/types/supabase';

const DEFAULT_PAGE_SIZE = 10;

export type UseSupabaseQueryProps = {
  table: keyof Database['public']['Tables'];
  select: string;
  pageSize?: number;
};

export const useSupabaseQuery = ({
  table,
  select,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseSupabaseQueryProps) => {
  const supabase = createClient();

  const [data, setData] = useState<Array<unknown> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    const { data, count, error } = await supabase
      .from(table)
      .select(select)
      .limit(pageSize);
    if (error) {
      setIsError(true);
    } else {
      setData(data);
      setCount(count);
    }
    setIsLoading(false);
  }, [supabase, table, select]);

  useMemo(() => {
    fetchData();
  }, []);

  return useMemo(
    () => ({
      data,
      isError,
      isLoading,
      count,
    }),
    [data, isLoading, isError, count],
  );
};
