import Container from '@material-ui/core/Container'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import Loader from './Loader.jsx'
import Bearer from './Bearer.jsx'
import { Status } from './Status.jsx'

export function Frame(props) {
  const theme = createMuiTheme({
    palette: {
      background: {
        default: '#FFFFFF',
      },
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Container className="redpill-frame">
        {function () {
          // if (loading) return <Loader />
          // if (error) return <Error error={error} />
          // if (!user) return <Signin {...props} />
          return <Status {...props} />
        }()}
      </Container>
    </MuiThemeProvider>
  )
}
