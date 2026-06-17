import type { ThemeDefinition } from 'vuetify'

/**
 * Slate & Sand theme for the refreshed ReBit Studio identity.
 * The tokens keep Barry/Vuetify component ergonomics while replacing
 * the old blue-purple admin palette with the new brand system.
 */
export const ReBitStudioTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#F97316',
    secondary: '#1E293B',
    info: '#475569',
    success: '#2F9E44',
    accent: '#E9DCC6',
    warning: '#F59E0B',
    error: '#DC2626',
    lightprimary: '#FFF2E8',
    lightsecondary: '#EEF1F4',
    darkText: '#1E293B',
    lightText: '#475569',
    containerBg: '#FAF8F5',
    surface: '#ffffff',
    background: '#FAF8F5',
    'surface-variant': '#E9DCC6',
  },
  variables: {
    'border-color': '#E4DED4',
    'high-opacity': 1,
    'medium-opacity': 0.76,
    'low-opacity': 0.48,
    'border-radius-root': '8px',
  },
}

export const ReBitStudioDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#F97316',
    secondary: '#E9DCC6',
    info: '#CBD5E1',
    success: '#63C174',
    accent: '#475569',
    warning: '#FBBF24',
    error: '#F87171',
    lightprimary: '#3B2A1B',
    lightsecondary: '#2A3442',
    darkText: '#FAF8F5',
    lightText: '#CBD5E1',
    containerBg: '#111827',
    surface: '#1E293B',
    background: '#111827',
    'surface-variant': '#334155',
  },
  variables: {
    'border-color': '#475569',
    'high-opacity': 1,
    'medium-opacity': 0.78,
    'low-opacity': 0.5,
    'border-radius-root': '8px',
  },
}
