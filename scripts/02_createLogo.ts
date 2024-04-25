import { megaverseClient } from './utils/megaverseClient'
import { CometDirection, DataValue, MoonColor } from './utils/types'

export const logoCreate = async () => {
  const responseMap: { data: { goal: DataValue[][] } } = await megaverseClient.map.get()

  for (let rIndex = 0; rIndex < responseMap.data.goal.length; rIndex++) {
    const row = responseMap.data.goal[rIndex]
    for (let cIndex = 0; cIndex < row.length; cIndex++) {
      const commonPayload = {
        row: rIndex,
        column: cIndex,
      }

      if (row[cIndex].includes('COMETH')) {
        await megaverseClient.cometh.add({
          ...commonPayload,
          direction: row[cIndex].split('_')[0].toLowerCase() as CometDirection,
        })
      }

      if (row[cIndex].includes('SOLOON')) {
        await megaverseClient.soloons.add({
          ...commonPayload,
          color: row[cIndex].split('_')[0].toLowerCase() as MoonColor,
        })
      }

      if (row[cIndex].includes('POLYANET')) {
        await megaverseClient.polyanets.add({
          ...commonPayload,
        })
      }
    }
  }
}

export const logoClear = async () => {
  const responseMap: { data: { goal: DataValue[][] } } = await megaverseClient.map.get()

  for (let rIndex = 0; rIndex < responseMap.data.goal.length; rIndex++) {
    const row = responseMap.data.goal[rIndex]
    for (let cIndex = 0; cIndex < row.length; cIndex++) {
      if (row[cIndex] !== 'SPACE')
        await megaverseClient.polyanets.remove({
          row: rIndex,
          column: cIndex,
        })
    }
  }
}

export const logoMap = async () => {
  const responseMap: { data: { goal: DataValue[][] } } = await megaverseClient.map.get()

  for (let i = 0; i < responseMap.data.goal.length; i++) {
    console.log(responseMap.data.goal[i].join(' '))
  }
}