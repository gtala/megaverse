interface IBaseCreateDTO {
  row: number
  column: number
}

export interface IComethCreateDTO extends IBaseCreateDTO {
  direction: CometDirection
}

export interface ISoloonsCreateDTO extends IBaseCreateDTO {
  color: MoonColor
}

export type IPolyanetsCreateDTO = IBaseCreateDTO
export type IDeleteDTO = IBaseCreateDTO

export type DataValue = 'POLYANET' | 'SPACE'
export type MoonColor = 'blue' | 'red' | 'purple' | 'white'
export type CometDirection = 'up' | 'down' | 'right' | 'left'