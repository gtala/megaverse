import { AxiosSingleton } from './axiosSigleton'
import { CANDIDATE_ID, PATHS } from './constants'
import { IComethCreateDTO, IDeleteDTO, IPolyanetsCreateDTO, ISoloonsCreateDTO } from './types'

const getMap = async () => AxiosSingleton.getInstance().getAxios().get(`api/map/${CANDIDATE_ID}/goal`)

const addCometh = async (payload: IComethCreateDTO) =>
  AxiosSingleton.getInstance()
    .getAxios()
    .post(PATHS.COMETH, { candidateId: CANDIDATE_ID, ...payload })
const addSoloons = async (payload: ISoloonsCreateDTO) =>
  AxiosSingleton.getInstance()
    .getAxios()
    .post(PATHS.SOLOONS, { candidateId: CANDIDATE_ID, ...payload })
const addPolyanets = async (payload: IPolyanetsCreateDTO) =>
  AxiosSingleton.getInstance()
    .getAxios()
    .post(PATHS.POLYANETS, { candidateId: CANDIDATE_ID, ...payload })

const removeCometh = async (payload: IDeleteDTO) =>
  AxiosSingleton.getInstance()
    .getAxios()
    .delete(PATHS.COMETH, { data: { candidateId: CANDIDATE_ID, ...payload } })
const removeSoloons = async (payload: IDeleteDTO) =>
  AxiosSingleton.getInstance()
    .getAxios()
    .delete(PATHS.SOLOONS, { data: { candidateId: CANDIDATE_ID, ...payload } })
const removePolyanets = async (payload: IDeleteDTO) =>
  AxiosSingleton.getInstance()
    .getAxios()
    .delete(PATHS.POLYANETS, { data: { candidateId: CANDIDATE_ID, ...payload } })

export const megaverseClient = {
  map: {
    get: getMap,
  },
  cometh: {
    add: addCometh,
    remove: removeCometh,
  },
  soloons: {
    add: addSoloons,
    remove: removeSoloons,
  },
  polyanets: {
    add: addPolyanets,
    remove: removePolyanets,
  },
}