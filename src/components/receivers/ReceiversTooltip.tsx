import type { FC, PropsWithChildren } from 'react'
import { styled } from 'styled-components'

type ReceiversTooltipProps = PropsWithChildren<{
  coords: { top: number; left: number; height: number }
  list: string[]
}>

export const ReceiversTooltip: FC<ReceiversTooltipProps> = ({
  list,
  coords,
}) => {
  return (
    <TooltipStyled top={`${coords.top}px`} left={`${coords.left}px`}>
      <TooltipContainerStyled height={`${coords.height}px`}>
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
  padding: 6px 6px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  border: var(--border-style-tooltip);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  top: ${props => props.top};
  left: ${props => props.left};
`
const TooltipContainerStyled = styled.div<{ height: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: ${props => props.height};
  border: var(--border-style-tooltip);
  overflow-y: scroll;
  padding-right: 12px;
`
const TooltipListStyled = styled.ol`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const TooltipItemStyled = styled.li``
