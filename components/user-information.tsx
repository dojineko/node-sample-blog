import Link from 'next/link'
import { Button, CircularProgress } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { fetchUser, FetchUserApiResponse } from '~/api-client/auth'

export const UserInformation: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null as FetchUserApiResponse | null)
  useEffect(() => {
    void (async () => {
      await fetchUser()
        .then((v) => setResult(v))
        .finally(() => setLoading(false))
    })()
  }, [])

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : result ? (
        <>
          <aside>{result.email} さん こんにちは！</aside>
          <Link href="/posts/new">
            <Button variant="contained" color="primary">
              新規投稿
            </Button>
          </Link>
          <Link href="/logout">
            <Button variant="outlined" color="primary">
              ログアウト
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/signup">
            <Button variant="outlined" color="primary">
              サインアップ
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="contained" color="primary">
              ログイン
            </Button>
          </Link>
        </>
      )}
    </>
  )
}
