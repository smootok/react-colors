import React from 'react'
import { useHistory } from 'react-router-dom'
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
import { arrayMove } from 'react-sortable-hoc'

import DraggableColorList from './draggable-color-list'

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

export default function NewPalette ({ palettes, savePalette }) {
  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = React.useState(true)
  const [currentColor, setCurrentColor] = React.useState('teal')
  const [colorName, setColorName] = React.useState('')
  const [colors, setColors] = React.useState(palettes[0].colors)
  const [colorError, setColorError] = React.useState('')
  const [paletteName, setPaletteName] = React.useState('')
  const [paletteNameError, setPaletteNameError] = React.useState('')

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

  const handlePaletteNameChange = e => {
    const { value } = e.target
    setPaletteName(value)
  }

  const handleSavePalette = () => {
    if (!paletteName) {
      setPaletteNameError('This field is required')
    } else if (
      !palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== paletteName.toLowerCase()
      )
    ) {
      setPaletteNameError('Palette name must be unique')
    } else {
      const newPalette = {
        id: paletteName.toLowerCase().replace(/ /g, '-'),
        paletteName,
        colors
      }
      savePalette(newPalette)
      history.push('/')
    }
  }

  const addRandomColor = () => {
    const allColors = palettes.map(p => p.colors).flat()
    const randomColorIndex = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[randomColorIndex]
    setColors(colors => [...colors, randomColor])
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(colors => arrayMove(colors, oldIndex, newIndex))
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        color='default'
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
          <TextField
            label='Palette Name'
            value={paletteName}
            onChange={handlePaletteNameChange}
            error={paletteNameError !== ''}
            helperText={paletteNameError}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSavePalette}
          >
            Save Palette
          </Button>
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
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setColors([])}
          >
            Clear Palette
          </Button>
          <Button variant='contained' color='primary' onClick={addRandomColor}>
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
        <DraggableColorList
          colors={colors}
          handleRemoveColor={handleRemoveColor}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  )
}
