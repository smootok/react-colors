import React from 'react'

import './color-box.css'

export default function ColorBox ({ name, background }) {
  return (
    <div style={{ background }} className='color-box'>
      <span>{name}</span>
      <span>More</span>
    </div>
  )
}
