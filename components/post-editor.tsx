import { FormEvent, ChangeEvent } from 'react'
import { TextField, Grid, Button } from '@material-ui/core'
import styled from 'styled-components'
import Link from 'next/link'

const MyGrid = styled(Grid)`
  & > * {
    margin: 0.5rem 0;
  }
`

export const PostEditor: React.FC<{
  onSubmit: (e: FormEvent) => void
  title: { value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }
  body: { value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }
  tags: { value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }
  mode: 'new' | 'edit'
}> = (props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit(e)
      }}
    >
      <Grid container>
        <MyGrid item xs={12}>
          <TextField
            required
            fullWidth
            label="タイトル"
            placeholder="名称未設定"
            value={props.title.value}
            onChange={props.title.onChange}
          ></TextField>
        </MyGrid>
        <MyGrid item xs={12}>
          <TextField
            required
            fullWidth
            label="本文"
            multiline
            placeholder="イーハトーヴォのあの透き通った風"
            variant="outlined"
            value={props.body.value}
            onChange={props.body.onChange}
          ></TextField>
        </MyGrid>
        <MyGrid item xs={12}>
          <TextField
            required
            fullWidth
            label="タグ (カンマ区切り)"
            placeholder="タグ1,タグ2,タグ3"
            value={props.tags.value}
            onChange={props.tags.onChange}
          ></TextField>
        </MyGrid>

        <MyGrid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {props.mode === 'new' ? '投稿する' : '更新する'}
          </Button>
        </MyGrid>
        <MyGrid item xs={12}>
          <Link href="/">
            <Button fullWidth variant="outlined" color="primary">
              トップに戻る
            </Button>
          </Link>
        </MyGrid>
      </Grid>
    </form>
  )
}
