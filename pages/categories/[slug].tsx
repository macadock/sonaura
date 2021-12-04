import type { NextPage } from 'next'
import { useRouter } from 'next/router'


const Category: NextPage = () => {

  const router = useRouter()
  const { slug } = router.query

  return (
    <div>{slug}</div>
  )
}

export default Category