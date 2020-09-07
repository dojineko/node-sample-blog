import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const PostIndexPage: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    void (async () => {
      router.push('/')
    })()
  }, [])
  return <></>
}

export default PostIndexPage
