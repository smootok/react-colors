import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'

import DraggableColorBox from './draggable-color-box'

function DraggableColorList ({ colors, handleRemoveColor }) {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleRemoveColor={handleRemoveColor}
        />
      ))}
    </div>
  )
}

export default SortableContainer(DraggableColorList)
