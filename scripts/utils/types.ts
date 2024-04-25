interface IBaseCreateDTO {
  row: number
  column: number
}

export interface IComethCreateDTO extends IBaseCreateDTO {
  direction?: 'up' | 'down' | 'right' | 'left'
}

export interface ISoloonsCreateDTO extends IBaseCreateDTO {
  color?: 'blue' | 'red' | 'purple' | 'white'
}

export type IPolyanetsCreateDTO = IBaseCreateDTO
export type IDeleteDTO = IBaseCreateDTO

export type DataValue = 'POLYANET' | 'SPACE'