import React from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './color-box.css'

export default function ColorBox ({ id, name, background, paletteId }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }, [copied])

  return (
    <CopyToClipboard text={background} onCopy={() => setCopied(true)}>
      <div style={{ background }} className='color-box'>
        <div
          style={{ background }}
          className={`copy-overlay ${copied ? 'show' : ''}`}
        />
        <div className={`copy-msg ${copied ? 'show' : ''}`}>
          <h1>Copied!</h1>
          <p>{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span>{name}</span>
          </div>
          <button className='copy-button'>Copy</button>
        </div>
        <Link
          to={`/palette/${paletteId}/${id}`}
          onClick={e => e.stopPropagation()}
        >
          <span className='see-more'>More</span>
        </Link>
      </div>
    </CopyToClipboard>
  )
}
