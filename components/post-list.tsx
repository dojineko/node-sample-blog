import { useEffect, useState } from 'react'
import { ListPostApiResponse, listPost } from '~/api-client/post'
import { CircularProgress } from '@material-ui/core'
import { PostListItem } from './post-list-item'

export const PostList: React.FC = () => {
  const [result, setResult] = useState([] as ListPostApiResponse[])
  useEffect(() => {
    void (async () => {
      setResult(await listPost())
    })()
  }, [])

  if (!result) {
    return <CircularProgress />
  }

  return (
    <>
      {result.map((v) => (
        <PostListItem key={v.id} id={v.id} title={v.title} createdAt={v.createdAt} />
      ))}
    </>
  )
}
