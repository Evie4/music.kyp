import { theme as baseTheme, primaryColor } from 'smooth-doc/src/theme'

export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    modes: {
      ...baseTheme.colors.modes,
      dark: {
        ...baseTheme.colors.modes.dark,
        'editor-background': '#00263f',
      },
    },
    ...primaryColor('indigo'),
  },
}