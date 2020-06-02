import chroma from 'chroma-js'
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const getRange = hexColor => {
  const end = '#fff'
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ]
}

const getScale = (hexColor, numberOfColors) => {
  return chroma
    .scale(getRange(hexColor))
    .mode('lab')
    .colors(numberOfColors)
}

export const generatePalette = starterPalette => {
  const newPalette = { ...starterPalette, colors: {} }

  for (const level of levels) {
    newPalette.colors[level] = []
  }

  for (const color of starterPalette.colors) {
    const scale = getScale(color.color, 10).reverse()
    for (const i in scale) {
      newPalette.colors[levels[i]].push({
        id: color.name.toLowerCase().replace(/ /g, '-'),
        name: `${color.name} ${levels[i]}`,
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)')
      })
    }
  }
  return newPalette
}
