import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { ExitToApp } from '@material-ui/icons'
import React, { useCallback } from 'react'
import './Status.css'

export function Status(props) {
  return (
    <div className="redpill-status">
      <Toolbar disableGutters={true}>
        <Typography variant="h5" className="redpill-header">Welcome!</Typography>
        <IconButton variant="outlined"><ExitToApp /></IconButton>
      </Toolbar>
    </div>
  )
}
