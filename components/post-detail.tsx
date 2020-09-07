import { GetPostApiResponse } from '~/api-client/post'
import { BackToTopButton } from '~/components/back-to-top-button'
import Link from 'next/link'
import { Button } from '@material-ui/core'

export const PostDetail: React.FC<{ post: GetPostApiResponse; userId: string }> = (props) => (
  <>
    <div>Title: {props.post.title}</div>
    <div>
      Body: <pre>{props.post.body}</pre>
    </div>
    <div>Date: {props.post.createdAt}</div>
    {props.post.userId === props.userId ? (
      <Link href="/posts/[id]/edit" as={`/posts/${props.post.id}/edit`}>
        <Button variant="outlined" color="secondary">
          投稿を編集する
        </Button>
      </Link>
    ) : undefined}
    <BackToTopButton />
  </>
)
