import localFont from 'next/font/local'

export const segoe_ui = localFont({
  src: [
    {
      path: './local/Segoe-UI-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './local/Segoe-UI.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  weight: '',
  variable: '--font-segoe-ui',
})
