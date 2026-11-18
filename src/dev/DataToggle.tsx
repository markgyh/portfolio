/* DEV-ONLY: switches the page between its real content and the stress-test
   fixtures, and between the desktop page and a phone-sized preview.
   Rendered only under `pnpm dev`; plain chrome, not part of the design. */

const GROUPS = [
  {
    param: 'view',
    label: 'Screen size',
    options: [
      { value: '', label: 'Desktop' },
      { value: 'mobile', label: 'Mobile' },
    ],
  },
  {
    param: 'data',
    label: 'Test data',
    options: [
      { value: '', label: 'Demo data' },
      { value: 'worst', label: 'Worst case' },
      { value: 'empty', label: 'Empty' },
      { value: 'one', label: 'One' },
    ],
  },
]

function hrefWith(param: string, value: string) {
  const params = new URLSearchParams(window.location.search)
  if (value) params.set(param, value)
  else params.delete(param)
  const query = params.toString()
  return `${window.location.pathname}${query ? `?${query}` : ''}`
}

export default function DataToggle() {
  // Inside the phone preview's frame the outer page already shows the switch.
  if (window.self !== window.top) return null
  const params = new URLSearchParams(window.location.search)
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: 3,
        borderRadius: 999,
        background: '#d4d4d4',
        font: '500 12px/1 system-ui, sans-serif',
        boxShadow: '0 2px 8px rgb(0 0 0 / 0.3)',
        maxWidth: 'calc(100vw - 16px)',
        overflowX: 'auto',
      }}
    >
      {GROUPS.map(({ param, label, options }, g) => (
        <nav key={param} aria-label={label} style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {g > 0 && <span aria-hidden="true" style={{ width: 1, height: 18, background: '#a3a3a3', marginRight: 4 }} />}
          {options.map(({ value, label: optionLabel }) => {
            const current = (params.get(param) ?? '') === value
            return (
              <a
                key={optionLabel}
                href={hrefWith(param, value)}
                aria-current={current ? 'true' : undefined}
                style={{
                  padding: '7px 11px',
                  whiteSpace: 'nowrap',
                  borderRadius: 999,
                  color: '#171717',
                  textDecoration: 'none',
                  background: current ? '#fff' : 'transparent',
                }}
              >
                {optionLabel}
              </a>
            )
          })}
        </nav>
      ))}
    </div>
  )
}
