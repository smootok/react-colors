import React from 'react'
import Select from '@material-ui/core/Select'
import { MenuItem, IconButton, Snackbar } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import './navbar.css'

export default function Navbar ({
  level,
  setLevel,
  colorFormat,
  setColorFormat
}) {
  const [open, setOpen] = React.useState(false)

  const handleColorFormatChange = e => {
    setColorFormat(e.target.value)
    setOpen(true)
  }

  return (
    <header className='navbar'>
      <div className='logo'>
        <a href='#'>React Colors</a>
      </div>
      <div className='slider-container'>
        <span className='level'>Level: {level}</span>
        <div className='slider'>
          <Slider
            defaultValue={level}
            step={100}
            min={100}
            max={900}
            onAfterChange={level => setLevel(level)}
          />
        </div>
      </div>
      <div className='select-container'>
        <Select
          value={colorFormat}
          onChange={handleColorFormatChange}
        >
          <MenuItem value='hex'>HEX - #ffffff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={
          <span id='message-id'>
            Format changed to {colorFormat.toUpperCase()}!
          </span>
        }
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      />
    </header>
  )
}
