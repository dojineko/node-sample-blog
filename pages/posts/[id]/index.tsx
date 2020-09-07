import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getPost, GetPostApiResponse } from '~/api-client/post'
import { CircularProgress } from '@material-ui/core'
import { PostDetail } from '~/components/post-detail'
import { fetchUser, FetchUserApiResponse } from '~/api-client/auth'

export const PostIndexPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const postId = typeof router.query.id === 'string' ? router.query.id : null
  const [user, setUser] = useState(null as FetchUserApiResponse | null)
  const [post, setPost] = useState(null as GetPostApiResponse | null)

  useEffect(() => {
    if (!postId) {
      return
    }
    void (async () => {
      setLoading(true)
      try {
        setUser(await fetchUser())
        setPost(await getPost(postId))
      } finally {
        setLoading(false)
      }
    })()
  }, [postId])

  return <>{!loading && post ? <PostDetail post={post} userId={user ? user.id : ''} /> : <CircularProgress />}</>
}

export default PostIndexPage
