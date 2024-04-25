import { megaverseClient } from './utils/megaverseClient'
import { DataValue } from './utils/types'

export const create = async () => {
  const responseMap: { data: { goal: DataValue[][] } } = await megaverseClient.map.get()

  for (let rIndex = 0; rIndex < responseMap.data.goal.length; rIndex++) {
    const row = responseMap.data.goal[rIndex]
    for (let cIndex = 0; cIndex < row.length; cIndex++) {
      if (row[cIndex] === 'POLYANET')
        await megaverseClient.polyanets.add({
          row: rIndex,
          column: cIndex,
        })
    }
  }
}

export const clear = async () => {
  const responseMap: { data: { goal: DataValue[][] } } = await megaverseClient.map.get()

  for (let rIndex = 0; rIndex < responseMap.data.goal.length; rIndex++) {
    const row = responseMap.data.goal[rIndex]
    for (let cIndex = 0; cIndex < row.length; cIndex++) {
      if (row[cIndex] === 'POLYANET')
        await megaverseClient.polyanets.remove({
          row: rIndex,
          column: cIndex,
        })
    }
  }
}

export const map = async () => {
  const responseMap: { data: { goal: DataValue[][] } } = await megaverseClient.map.get()

  for (let i = 0; i < responseMap.data.goal.length; i++) {
    console.log(responseMap.data.goal[i].join(' '))
  }
}