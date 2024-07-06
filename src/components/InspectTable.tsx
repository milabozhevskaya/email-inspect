import { type FC, useMemo, type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { groupBy } from 'lodash-es'
import type { Email } from '../types/Email'
import { ReceiversView, DateView, TimeView } from './'

type InspectTableProps = PropsWithChildren<{ emails: Email[] }>

const InspectTable: FC<InspectTableProps> = ({ emails, ...rest }) => {
  const groupedEmails = useMemo(
    () =>
      groupBy<Email>(emails, ({ datetime }) =>
        new Date(datetime).toLocaleDateString(),
      ),
    [emails],
  )

  return (
    <table {...rest}>
      <thead>
        <tr>
          <th>Source</th>
          <th>Receivers</th>
          <th>Subject</th>
          <th className="align-right">Date</th>
          <th className="align-right">Time</th>
        </tr>
      </thead>
      {Object.entries(groupedEmails).map(([datetime, emailGroup]) => (
        <tbody key={datetime}>
          {emailGroup.map(({ id, from, to: recipients, subject, datetime }) => (
            <tr key={id}>
              <td>{from}</td>
              <td>
                <ReceiversView recipients={recipients} />
              </td>
              <td>{subject}</td>
              <td className="align-right">
                <DateView datetime={datetime} />
              </td>
              <td className="align-right">
                <TimeView datetime={datetime} />
              </td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  )
}

export const StyledInspectTable = styled(InspectTable)`
  table-layout: fixed;
  border: var(--border-style);
  border-spacing: 0;
  width: 100%;
  text-align: left;

  thead {
    background-color: var(--background-table-header);
  }

  th {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 3px;
  }

  th,
  td {
    border: var(--border-style);
    padding: 5px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 34px;
    box-sizing: border-box;
  }

  th {
    &:nth-child(1) {
      width: 20%;
    }
    &:nth-child(2) {
      width: 30%;
    }
    &:nth-child(3) {
      width: 50%;
    }
    &:nth-child(4) {
      width: 90px;
    }
    &:nth-child(5) {
      width: 70px;
    }
  }

  tbody:nth-child(even) {
    background-color: var(--background-even);
  }

  .align-right {
    text-align: right;
  }
`
