import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { PurpleTheme, DarkPurpleTheme } from '@/theme/theme'

// Дефолты компонентов повторяют Barry: secondary-кнопки, скруглённые карточки.
export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'PurpleTheme',
    themes: {
      PurpleTheme,
      DarkPurpleTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    VBtn: {
      color: 'secondary',
      variant: 'flat',
      rounded: 'lg',
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
