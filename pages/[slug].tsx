import type { NextPage, NextPageContext } from 'next'
import CategoryView from 'views/CategoryView'

const Category: NextPage<{slug: string}> = ({ slug }) => {

  return (<CategoryView slug={slug} />)

}

export const getServerSideProps = async (context: NextPageContext) => {
  
  const slug = context.query.slug
  
  return {
    props: {
      slug
    }
  }
}

export default Category;
