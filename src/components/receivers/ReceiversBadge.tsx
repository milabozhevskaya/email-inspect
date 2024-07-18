import styled from 'styled-components'
import type { ComponentPropsWithoutRef, FC } from 'react'

export type ReceiversBadgeProps = {
  numTruncated: number
  openTooltip?: () => void
} & Omit<ComponentPropsWithoutRef<'span'>, 'className' | 'style'>

const ReceiversBadge: FC<ReceiversBadgeProps> = ({
  numTruncated,
  openTooltip,
  ...rest
}) => {
  return (
    <span {...rest} data-testid="badge" onMouseEnter={openTooltip}>
      +{numTruncated}
    </span>
  )
}

export const StyledReceiversBadge = styled(ReceiversBadge)`
  flex-shrink: 0;
  padding: 2px 5px;
  border-radius: 3px;
  background-color: var(--color-primary);
  color: #f0f0f0;
  overflow: hidden;
`
