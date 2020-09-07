import Link from 'next/link'
import { Button } from '@material-ui/core'

export const BackToTopButton: React.FC = () => (
  <Link href="/">
    <Button color="primary" variant="outlined">
      トップへ戻る
    </Button>
  </Link>
)
