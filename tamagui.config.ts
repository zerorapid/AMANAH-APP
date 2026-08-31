import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    // Override light theme to use white and orange
    light: {
      ...config.themes.light,
      background: '#ffffff',
      color: '#1a1a1a',
      borderColor: '#e5e5e5',
      // Override primary colors to Orange
      color1: '#ffffff',
      color2: '#fff5ec',
      color3: '#ffebd9',
      color4: '#ffe0c6',
      color5: '#ffd6b3',
      color6: '#ffcc9f',
      color7: '#ffc28c',
      color8: '#ffb879',
      color9: '#ff6b00', // Main Orange
      color10: '#e66000',
      color11: '#cc5600',
      color12: '#4d2000',
    }
  }
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
