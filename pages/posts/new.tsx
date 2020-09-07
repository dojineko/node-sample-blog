import { createPost } from '~/api-client/post'
import { useRouter } from 'next/router'
import { PostEditor } from '~/components/post-editor'
import { useInput } from '~/hooks/use-input'

export const PostNewPage: React.FC = () => {
  const router = useRouter()
  const title = useInput('')
  const body = useInput('')
  const tags = useInput('')

  const onSubmit = async () => {
    const v = await createPost({ title: title.value, body: body.value, tags: tags.value.split(',') })
    router.push('/posts/[id]', `/posts/${v.id}`)
  }

  return <PostEditor onSubmit={onSubmit} title={title} body={body} tags={tags} mode="new"></PostEditor>
}

export default PostNewPage
