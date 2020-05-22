import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './color-box.css'

export default function ColorBox ({ name, background }) {
  return (
    <CopyToClipboard text={background}>
      <div style={{ background }} className='color-box'>
        <div className='copy-container'>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-button'>Copy</button>
        </div>
        <span className='see-more'>More</span>
      </div>
    </CopyToClipboard>
  )
}
