
import type { NextPage } from 'next'
import { Categories } from '../../gql/__generated__/categories'
import CategoriesCarrousel from '../../src/core/CategoriesCarrousel'

const Categories: NextPage = () => {
  
  return (
    <CategoriesCarrousel />
  )
};

export default Categories
