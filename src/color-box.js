import React from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import chroma from 'chroma-js'

import './color-box.css'

export default function ColorBox ({
  id,
  name,
  background,
  paletteId,
  showLink
}) {
  const [copied, setCopied] = React.useState(false)

  const isDarkColor = chroma(background).luminance() <= 0.08
  const isLightColor = chroma(background).luminance() >= 0.7

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
          <p className={isLightColor && 'dark-text'}>{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={isDarkColor && 'light-text'}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && 'dark-text'}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={e => e.stopPropagation()}
          >
            <span className={`see-more ${isLightColor && 'dark-text'}`}>
              More
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  )
}
