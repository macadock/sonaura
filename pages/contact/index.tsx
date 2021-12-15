import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { GET_SHOPS } from '../../gql/get-shops'
import { Shops } from '../../gql/__generated__/shops'

const Contact: NextPage = () => {

  const { data, error } = useQuery<Shops>(GET_SHOPS)
  console.log(data?.shops[0])

  return (
    <div>Contact</div>
  )
}

export default Contact
