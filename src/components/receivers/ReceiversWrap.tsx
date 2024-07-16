import { type PropsWithChildren, Ref, forwardRef } from 'react'
import { StyledReceiversBadge } from './'
import styled from 'styled-components'

type ReceiversWrapProps = PropsWithChildren<{
  text: string
  points: boolean
  badge: number
  width: string
}>

export const ReceiversWrap = forwardRef(function (
  { text, points, badge, width }: ReceiversWrapProps,
  refFn: Ref<HTMLElement>,
) {
  const ref = (el: HTMLElement | null) => {
    if (typeof refFn === 'function') refFn(el)
  }

  return (
    <DivStyles ref={ref} width={width}>
      <TextStyles>{text}</TextStyles>
      {points && <PointStyles>...</PointStyles>}
      {badge > 0 && <StyledReceiversBadge numTruncated={badge} />}
    </DivStyles>
  )
})

const TextStyles = styled.span`
  white-space: nowrap;
  overflow: hidden;
`

const PointStyles = styled.span`
  margin-right: auto;
  flex-shrink: 0;
`

const DivStyles = styled.div<{ width: string }>`
  display: flex;
  width: ${props => props.width};
`
