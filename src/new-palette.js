import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
  IconButton,
  TextField
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons'
import { ChromePicker } from 'react-color'

import DraggableColorBox from './draggable-color-box'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))

export default function NewPalette () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [currentColor, setCurrentColor] = React.useState('teal')
  const [colorName, setColorName] = React.useState('')
  const [colors, setColors] = React.useState([{ color: 'blue', name: 'blue' }])
  const [colorError, setColorError] = React.useState('')

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleColorNameChange = e => {
    const { value } = e.target
    setColorName(value)
  }

  const handleRemoveColor = colorName => {
    setColors(colors => colors.filter(color => color.name !== colorName))
  }

  const addNewColor = () => {
    if (!colorName) {
      setColorError('This field is required')
    } else if (
      !colors.every(
        ({ name }) => name.toLowerCase() !== colorName.toLowerCase()
      )
    ) {
      setColorError('Color name must be unique')
    } else if (
      !colors.every(
        ({ color }) => color.toLowerCase() !== currentColor.toLowerCase()
      )
    ) {
      setColorError('Color already exist')
    } else {
      setColorError('')
      setColors(colors => [...colors, { color: currentColor, name: colorName }])
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant='h4'>Design Your Palette</Typography>
        <div>
          <Button variant='contained' color='secondary'>
            Clear Palette
          </Button>
          <Button variant='contained' color='primary'>
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => setCurrentColor(newColor.hex)}
        />
        <TextField
          value={colorName}
          onChange={handleColorNameChange}
          error={colorError !== ''}
          label='Color Name'
          helperText={colorError}
        />
        <Button
          variant='contained'
          color='primary'
          style={{ background: currentColor }}
          onClick={addNewColor}
        >
          Add Color
        </Button>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {colors.map(color => (
          <DraggableColorBox
            key={color.name}
            color={color.color}
            name={color.name}
            handleRemoveColor={handleRemoveColor}
          />
        ))}
      </main>
    </div>
  )
}
