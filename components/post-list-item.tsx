import Link from 'next/link'

type Props = {
  id: string
  title: string
  createdAt: string
}

export const PostListItem: React.FC<Props> = (props) => (
  <ul>
    <li>
      Title:{' '}
      <Link href="/posts/[id]" as={`/posts/${props.id}`}>
        <a>{props.title}</a>
      </Link>
    </li>
    <li>CreatedAt: {props.createdAt}</li>
  </ul>
)
