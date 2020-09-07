import { useRouter } from 'next/router'
import { getPost, updatePost } from '~/api-client/post'
import { useEffect, useState, FormEvent } from 'react'
import { PostEditor } from '~/components/post-editor'
import { useInput } from '~/hooks/use-input'

export const PostEditPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const postId = typeof router.query.id === 'string' ? router.query.id : null

  const title = useInput('')
  const body = useInput('')
  const tags = useInput('')

  useEffect(() => {
    if (!postId) {
      return
    }
    void (async () => {
      const res = await getPost(postId)
      title.set(res.title)
      body.set(res.body)
      tags.set(res.tags ? res.tags.join(',') : '')
    })()
  }, [postId])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!postId) {
      return
    }
    setLoading(true)
    try {
      await updatePost(postId, { id: postId, title: title.value, body: body.value, tags: tags.value.split(',') })
      router.push('/posts/[id]', `/posts/${postId}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PostEditor mode="edit" onSubmit={(e) => onSubmit(e)} title={title} body={body} tags={tags} />
    </>
  )
}

export default PostEditPage
