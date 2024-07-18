import type { FC, PropsWithChildren } from 'react'
import { styled } from 'styled-components'

type ReceiversTooltipProps = PropsWithChildren<{
  coords: { top: number; left: number }
  list: string[]
}>

export const ReceiversTooltip: FC<ReceiversTooltipProps> = ({
  list,
  coords,
}) => {
  return (
    <TooltipStyled top={`${coords.top}px`} left={`${coords.left}px`}>
      <TooltipContainerStyled>
        <TooltipListStyled>
          {list.map(el => (
            <TooltipItemStyled key={el}>{el}</TooltipItemStyled>
          ))}
        </TooltipListStyled>
      </TooltipContainerStyled>
    </TooltipStyled>
  )
}

const TooltipStyled = styled.div<{ top: string; left: string }>`
  position: absolute;
  display: flex;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  top: ${props => props.top};
  left: ${props => props.left};
`
const TooltipContainerStyled = styled.div``
const TooltipListStyled = styled.ul``
const TooltipItemStyled = styled.li``
