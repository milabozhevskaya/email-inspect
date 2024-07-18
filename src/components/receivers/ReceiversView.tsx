import {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { ReceiversTooltip, ReceiversWrap } from './'
import { splitReceivers } from '../../helpers'
import { useWindowSize } from '../../hooks'

type ReceiversViewProps = PropsWithChildren<{ receivers: string[] }>

export const ReceiversView: FC<ReceiversViewProps> = ({ receivers }) => {
  if (receivers.length === 0) return 'No receivers'

  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false)

  const [coords, setCoords] = useState({ top: 0, left: 0, height: 0 })

  const openTooltip = (bool: boolean) => {
    if (refWraps.current.length === 0) return

    const parentCell =
      (combinationIndex !== null && refWrap.current[0].parentElement) ||
      refWraps.current[0].parentElement

    if (!parentCell) return

    const parentCellRect = parentCell.getBoundingClientRect()
    console.log(parentCellRect)

    setCoords({
      left: parentCellRect.x + parentCellRect.width,
      top: parentCellRect.y + window.scrollY,
      height: document.documentElement.clientHeight - parentCellRect.y - 20,
    })

    setIsOpenTooltip(bool)
  }

  const [wrapsWidth, setWrapsWidth] = useState<Array<number> | null>(null)

  const size = useWindowSize()

  const [combinations] = useState<Array<[string, boolean, number]>>(
    splitReceivers(receivers),
  )

  const [combinationIndex, setCombinationIndex] = useState<number | null>(null)

  const refWraps = useRef<HTMLElement[]>([])

  const refMap = (el: HTMLElement | null) => {
    if (el) refWraps.current.push(el)
  }

  const refWrap = useRef<HTMLElement[]>([])

  const refSingle = (el: HTMLElement | null) => {
    if (el) refWrap.current[0] = el
  }

  useLayoutEffect(() => {
    if (refWraps.current.length === 0) return

    const parentCell =
      (combinationIndex !== null && refWrap.current[0].parentElement) ||
      refWraps.current[0].parentElement

    if (!parentCell) return

    const parentCellWidth = parentCell.clientWidth

    const computedStyles = getComputedStyle(parentCell)

    let index = null

    const arrOfWidth =
      combinationIndex === null
        ? refWraps.current.map(el => el.clientWidth)
        : wrapsWidth
    if (arrOfWidth === null) return

    combinationIndex === null && setWrapsWidth(arrOfWidth)

    for (let i = arrOfWidth.length - 1; i >= 0; i--) {
      if (
        arrOfWidth[i] <=
          parentCellWidth -
            parseFloat(computedStyles.paddingLeft) -
            parseFloat(computedStyles.paddingRight) &&
        index === null
      ) {
        index = i
        break
      }
    }
    if (index === null) setCombinationIndex(0)
    else setCombinationIndex(index)

    parentCell.onmouseleave = () => openTooltip(false)
  }, [size])

  if (combinationIndex === null)
    return combinations.map(oneCombination => {
      const [text, points, count] = oneCombination
      return (
        <ReceiversWrap
          key={text.length}
          ref={refMap}
          text={text}
          points={points}
          badge={count}
          width="fit-content"
        />
      )
    })

  return (
    <>
      <ReceiversWrap
        ref={refSingle}
        width="100%"
        text={combinations[combinationIndex][0]}
        points={combinations[combinationIndex][1]}
        badge={combinations[combinationIndex][2]}
        openTooltip={() => openTooltip(true)}
      />
      {isOpenTooltip && <ReceiversTooltip list={receivers} coords={coords} />}
    </>
  )
}
