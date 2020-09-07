import { TextField, Button, Grid, Paper } from '@material-ui/core'
import styled from 'styled-components'
import { loginUser } from '~/api-client/auth'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`
const StyledPaper = styled(Paper)`
  padding: 1rem;
`

export const LoginPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkError = () => {
    const errors: string[] = []
    if (!email) {
      errors.push('メールアドレスが入力されていません')
    }
    if (!password) {
      errors.push('パスワードが入力されていません')
    }
    return errors
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = checkError()
    if (errs.length > 0) {
      alert(errs.join('\n'))
      return
    }
    setLoading(true)
    try {
      await loginUser({ email, password })
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <StyledPaper>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    id="email"
                    type="email"
                    label="メールアドレス"
                    variant="outlined"
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <StyledTextField
                    fullWidth
                    id="password"
                    type="password"
                    label="パスワード"
                    variant="outlined"
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                    ログイン
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </form>
    </>
  )
}
export default LoginPage
