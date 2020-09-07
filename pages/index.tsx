import { PostList } from '~/components/post-list'
import { UserInformation } from '~/components/user-information'

export const IndexPage: React.FC = () => {
  return (
    <>
      <UserInformation />
      <PostList />
    </>
  )
}

export default IndexPage
