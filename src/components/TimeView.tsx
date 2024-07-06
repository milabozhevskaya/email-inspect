import type { FC, PropsWithChildren } from 'react'

type TimeViewProps = PropsWithChildren<{ datetime: string }>

const rules: Intl.DateTimeFormatOptions = Object.freeze({
  hour: '2-digit',
  minute: '2-digit',
})

export const TimeView: FC<TimeViewProps> = ({ datetime }) => {
  const datetimeObj = new Date(datetime)
  const time = datetimeObj.toLocaleTimeString('ru-u-hc-h23', rules)

  return <span>{time}</span>
}
