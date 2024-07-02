import { getComponentsList } from '@/features/page-editor/components/ComponentsSelector';
import { ContentEditor } from '@/features/page-editor';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

const PageEditor = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('pages')
    .select('*')
    .eq('id', params.id)
    .single();
  const componentsList = getComponentsList();
  if (!data) {
    return <div>Page not found</div>;
  }
  return <ContentEditor componentsList={componentsList} pageData={data} />;
};

export default PageEditor;
