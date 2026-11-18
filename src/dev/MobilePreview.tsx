/* DEV-ONLY: ?view=mobile shows the site in a 390 × 844 frame (an iPhone 14-sized
   screen), so the phone layout can be checked from a desktop browser. The frame
   loads the same page without ?view, keeping any ?data choice. */

import DataToggle from './DataToggle'

export const isMobilePreview = () =>
  window.self === window.top && new URLSearchParams(window.location.search).get('view') === 'mobile'

export default function MobilePreview() {
  const params = new URLSearchParams(window.location.search)
  params.delete('view')
  const query = params.toString()
  const src = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`

  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px 72px',
        background: '#1f1f1f',
      }}
    >
      <iframe
        title="Phone preview"
        src={src}
        style={{
          // 390 px of screen plus the 10 px frame on each side (the page uses border-box sizing)
          width: 410,
          // Fits shorter laptop screens; the width stays phone-sized either way
          height: 'min(864px, calc(100svh - 96px))',
          border: '10px solid #0a0a0a',
          borderRadius: 44,
          background: '#0b2545',
          boxShadow: '0 20px 60px rgb(0 0 0 / 0.5)',
        }}
      />
      <DataToggle />
    </div>
  )
}
