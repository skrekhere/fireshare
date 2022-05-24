import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Grid, Paper, Typography } from '@mui/material'
import { AuthService, VideoService } from '../services'
import { getUrl } from '../common/utils'
import Navbar from '../components/nav/Navbar'
import { Box } from '@mui/system'

const URL = getUrl()

const Watch = () => {
  const { id } = useParams()
  const [details, setDetails] = React.useState(null)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetch() {
      const resp = (await VideoService.getDetails(id)).data
      setDetails(resp)
    }
    if (details == null) fetch()
  }, [details, id])

  React.useEffect(() => {
    try {
      async function isLoggedIn() {
        setLoggedIn((await AuthService.isLoggedIn()).data)
      }
      isLoggedIn()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }
  const handleLogin = async () => {
    try {
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  const options = [{ name: loggedIn ? 'Logout' : 'Login', handler: loggedIn ? handleLogout : handleLogin }]

  return (
    <Navbar options={options}>
      <Grid container>
        <Grid item xs={12}>
          <ReactPlayer url={`${URL}/api/video?id=${id}`} width="100%" height="auto" controls />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} width="100%" square sx={{ p: 1, mt: -1 }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}>
              <Grid container>
                <Grid item xs sx={{ ml: 2 }}>
                  <Typography variant="overline" noWrap sx={{ fontWeight: 600, fontSize: 16 }}>
                    {details?.info.title}
                  </Typography>
                </Grid>
                <Grid item sx={{ mr: 2 }}>
                  <Typography variant="overline" color="primary" sx={{ fontWeight: 600, fontSize: 16 }}>
                    Views: {details?.info.views || '9,439,998'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <Grid container>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography variant="overline" noWrap align="center" sx={{ fontWeight: 600, fontSize: 16 }}>
                    {details?.info.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography variant="overline" color="primary" sx={{ fontWeight: 600, fontSize: 16 }}>
                    Views: {details?.info.views || '9,439,998'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Navbar>
  )
}

export default Watch
