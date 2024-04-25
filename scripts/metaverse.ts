import { megaverseClient } from './utils/megaverseClient'
import { AstralObject, CometDirection, IBaseCreateDTO, MoonColor } from './utils/types'

type FunctionType = { add: () => Promise<void>; remove: () => Promise<void> }

export const create = async () => {
  await execAction('add')
}

export const clear = async () => {
  await execAction('remove')
}

const execAction = async (actionParam: 'add' | 'remove') => {
  const responseMap: { data: { goal: AstralObject[][] } } = await megaverseClient.map.get()

  for (let row = 0; row < responseMap.data.goal.length; row++) {
    const rowData = responseMap.data.goal[row]
    for (let column = 0; column < rowData.length; column++) {
      const { astralObject, variety } = parseValue(rowData[column].split('_'))

      if (astralObject !== 'SPACE') {
        console.log(`${actionParam} [row][column]`, row, column)
        await getAstralMapFunction({ row, column }, variety).get(astralObject)[actionParam]()
      }
    }
  }
}

const parseValue = (params: string[]) => {
  const astralObject: AstralObject = params.length > 1 ? (params[1] as AstralObject) : (params[0] as AstralObject)
  let variety: MoonColor | CometDirection

  if (params.length > 1) {
    variety = params[0].toLowerCase() as MoonColor | CometDirection
  }
  return { astralObject, variety }
}

export const map = async () => {
  const responseMap: { data: { goal: AstralObject[][] } } = await megaverseClient.map.get()

  for (let i = 0; i < responseMap.data.goal.length; i++) {
    console.log(responseMap.data.goal[i].join(' '))
  }
}

const getAstralMapFunction = (commonPayload: IBaseCreateDTO, variety: CometDirection | MoonColor) =>
  new Map<string, FunctionType>([
    [
      'COMETH',
      {
        add: async () => {
          await megaverseClient.cometh.add({
            ...commonPayload,
            direction: variety as CometDirection,
          })
        },
        remove: async () => {
          await megaverseClient.cometh.remove(commonPayload)
        },
      },
    ],
    [
      'SOLOON',
      {
        add: async () => {
          await megaverseClient.soloons.add({
            ...commonPayload,
            color: variety as MoonColor,
          })
        },
        remove: async () => {
          await megaverseClient.soloons.remove(commonPayload)
        },
      },
    ],
    [
      'POLYANET',
      {
        add: async () => {
          await megaverseClient.polyanets.add(commonPayload)
        },
        remove: async () => {
          await megaverseClient.polyanets.remove(commonPayload)
        },
      },
    ],
  ])