import type { FC, PropsWithChildren } from 'react'

type ReceiversViewProps = PropsWithChildren<{ recipients: string[] }>

export const ReceiversView: FC<ReceiversViewProps> = ({ recipients }) => {
  if (recipients.length === 0) return 'No recipients'

  return <div>{recipients.join(', ')}</div>
}
