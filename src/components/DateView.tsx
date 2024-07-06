import type { FC, PropsWithChildren } from 'react'

type DateViewProps = PropsWithChildren<{ datetime: string }>

export const DateView: FC<DateViewProps> = ({ datetime }) => {
  const datetimeObj = new Date(datetime)
  const today = new Date()

  const rules: Intl.DateTimeFormatOptions = {
    year:
      datetimeObj.getFullYear() === today.getFullYear() ? undefined : '2-digit',
    month: '2-digit',
    day: '2-digit',
  }

  const date = datetimeObj.toLocaleDateString('ru', rules)

  return <span>{date}</span>
}
