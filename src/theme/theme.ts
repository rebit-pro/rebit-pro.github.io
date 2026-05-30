import type { ThemeDefinition } from 'vuetify'

/**
 * Палитры перенесены из admin-шаблона Barry (rebit-p2p/frontend):
 * PurpleTheme (light) и DarkPurpleTheme (dark) — единый бренд rebit.
 */
export const PurpleTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#1e88e5',
    secondary: '#5e35b1',
    info: '#03c9d7',
    success: '#00c853',
    accent: '#FFAB91',
    warning: '#ffc107',
    error: '#f44336',
    lightprimary: '#eef2f6',
    lightsecondary: '#ede7f6',
    darkText: '#212121',
    lightText: '#616161',
    containerBg: '#eef2f6',
    surface: '#ffffff',
    background: '#ffffff',
  },
  variables: {
    'border-color': '#1e88e5',
    'high-opacity': 1,
    'medium-opacity': 0.8,
    'low-opacity': 0.5,
  },
}

export const DarkPurpleTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#1e88e5',
    secondary: '#7c4dff',
    info: '#03c9d7',
    success: '#05b187',
    accent: '#fc4b6c',
    warning: '#fec90f',
    error: '#fc4b6c',
    lightprimary: '#29314f',
    lightsecondary: '#29314f',
    darkText: '#d7dcec',
    lightText: '#bdc8f0',
    containerBg: '#1a223f',
    surface: '#111936',
    background: '#111936',
  },
  variables: {
    'border-color': '#1e88e5',
    'high-opacity': 1,
    'medium-opacity': 0.8,
    'low-opacity': 0.5,
  },
}
