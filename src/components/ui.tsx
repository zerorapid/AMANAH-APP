import { styled, Card, Button, YStack, XStack, Paragraph } from 'tamagui'
import { COLORS, RADIUS } from '../constants/theme'

// Reusable orange primary button
export const PrimaryButton = styled(Button, {
  backgroundColor: COLORS.primary,
  color: 'white',
  size: '$5',
  fontWeight: 'bold',
  borderRadius: RADIUS.md,
})

// Ghost button with orange border
export const OutlineButton = styled(Button, {
  backgroundColor: 'transparent',
  borderColor: COLORS.primary,
  color: COLORS.primary,
  size: '$5',
  fontWeight: 'bold',
  borderRadius: RADIUS.md,
  borderWidth: 1.5,
})

// Standard card with subtle shadow border
export const AmanCard = styled(Card, {
  backgroundColor: COLORS.white,
  borderColor: COLORS.border,
  borderWidth: 1,
  borderRadius: RADIUS.lg,
  padding: '$4',
})

// Orange accent card (used for balance)
export const AccentCard = styled(Card, {
  backgroundColor: COLORS.primary,
  borderRadius: RADIUS.lg,
  padding: '$5',
})

// Status pill
export const StatusPill = styled(Paragraph, {
  fontSize: 11,
  fontWeight: 'bold',
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: RADIUS.full,
  overflow: 'hidden',
  variants: {
    status: {
      success: { color: COLORS.success, backgroundColor: '#F0FDF4' },
      error: { color: COLORS.error, backgroundColor: '#FEF2F2' },
      warning: { color: COLORS.warning, backgroundColor: '#FFFBEB' },
      default: { color: COLORS.textMuted, backgroundColor: COLORS.surface },
    }
  } as const,
  defaultVariants: {
    status: 'default',
  }
})
