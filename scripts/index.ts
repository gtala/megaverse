import { clear, create, map } from './01_createMegaverse'

const tasksMap = {
  create,
  clear,
  map,
}

async function main(args: string[]): Promise<void> {
  const processName = args.shift()

  try {
    console.info(`process ${processName} has started...`)
    console.table(await tasksMap[processName](...args))
  } catch (e) {
    console.error(e)
    console.info(`process ${processName} has terminated with errors`)
    return
  }
  console.info(`process ${processName} has finished successfully...`)
}

main(process.argv.slice(2))