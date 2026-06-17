import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { ReBitStudioDarkTheme, ReBitStudioTheme } from '@/theme/theme'

// Barry/Vuetify ergonomics with the refreshed ReBit Studio visual system.
export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'ReBitStudioTheme',
    themes: {
      ReBitStudioTheme,
      ReBitStudioDarkTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'flat',
      rounded: 'md',
      style: 'text-transform: none; letter-spacing: normal;',
    },
    VCard: {
      rounded: 'md',
    },
    VTooltip: {
      location: 'top',
    },
  },
})
