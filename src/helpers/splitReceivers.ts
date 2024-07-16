const splitFirstReceiver = (receiver: string, badgeCount: number) =>
  receiver
    .split('')
    .reduce<Array<[string, boolean, number]>>((word, letter, indx) => {
      const prevVariant = word.length > 0 ? word[word.length - 1][0] : ''
      const comma =
        badgeCount > 0 && indx === receiver.length - 1 ? ', ' : ''
      return [
        ...word,
        [
          prevVariant + letter + comma,
          indx !== receiver.length - 1 || badgeCount > 0,
          badgeCount,
        ],
      ]
    }, []);

export const splitReceivers = (receivers: string[]): Array<[string, boolean, number]> => receivers.reduce<Array<[string, boolean, number]>>((acc, cur, index) => {
  const badgeCount = receivers.length - index - 1
  if (receivers.length === 1) return splitFirstReceiver(cur, badgeCount)
  if (acc.length === 0) return [...splitFirstReceiver(cur, badgeCount)]
  return [
    ...acc,
    [
      acc[acc.length - 1][0] + cur + `${badgeCount > 0 ? ', ' : ''}`,
      index !== receivers.length - 1,
      badgeCount,
    ],
  ]
}, []);
