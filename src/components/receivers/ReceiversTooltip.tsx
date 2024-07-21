import { useState, type FC, type PropsWithChildren } from 'react'
import { styled } from 'styled-components'

type ReceiversTooltipProps = PropsWithChildren<{
  coords: { top: number; left: number; height: number }
  list: string[]
}>

export const ReceiversTooltip: FC<ReceiversTooltipProps> = ({
  list,
  coords,
}) => {
  const [message, setMessage] = useState('')

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(list.join('\n'))
        setMessage('Скопировано в буфер обмена')
      } catch (err) {
        setMessage(`Ошибка при копировании текста: ${err}`)
      } finally {
        setTimeout(() => {
          setMessage('')
        }, 2000)
      }
    } else {
      setMessage('Невозможно скопировать в буфер обмена')
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
  }

  return (
    <TooltipStyled {...{ top: `${coords.top}px`, left: `${coords.left}px` }}>
      <TooltipContainerStyled height={`${coords.height}px`}>
        <TooltipListStyled>
          {list.map(el => (
            <TooltipItemStyled key={el}>{el}</TooltipItemStyled>
          ))}
        </TooltipListStyled>
        <TooltipButtonsStyled>
          <TooltipButtonStyled onClick={copyToClipboard}>
            Copy
          </TooltipButtonStyled>
          <TooltipMessageContainerStyled>
            <TooltipMessageStyled>{message}</TooltipMessageStyled>
          </TooltipMessageContainerStyled>
        </TooltipButtonsStyled>
      </TooltipContainerStyled>
    </TooltipStyled>
  )
}

const TooltipStyled = styled(
  ({ top, left, ...rest }: { top: string; left: string }) => <div {...rest} />,
)`
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
  padding-left: 6px;
  margin: 0;
`
const TooltipListStyled = styled.ol`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  padding: 0px 0px;
  list-style-position: inside;
`
const TooltipButtonsStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0px 8px 10px;
  flex-grow: 1;
`
const TooltipButtonStyled = styled.button`
  position: relative;
  display: flex;
  padding: 4px 20px;
  background-color: var(--background-copy-button-tooltip);
  color: var(--color-copy-button-tooltip);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    transition: background-color 0.6s ease;
    background-color: var(--background-copy-button-tooltip-hover);
  }
  &:active {
    transition: background-color 0s ease;
    background-color: var(--background-copy-button-tooltip-active);
  }
`
const TooltipItemStyled = styled.li`
  transition: background-color 0.2s ease;
  padding: 2.5px 0px;
  background-color: transparent;
  padding-left: 10px;
  margin: 0px;
  cursor: default;
  &:hover {
    transition: background-color 0.2s ease;
    background-color: var(--background-item-tooltip-hover);
  }
`
const TooltipMessageContainerStyled = styled.div`
  background-color: transparent;
  padding-left: 5px;
  margin: 0px;
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-wrap: no-wrap;
  cursor: default;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 100%;
`
const TooltipMessageStyled = styled.span`
  background-color: transparent;
  display: flex;
  margin: 0px;
  cursor: default;
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
`
