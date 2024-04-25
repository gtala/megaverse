import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export class AxiosSingleton {
  private static instance: AxiosSingleton
  private static axiosInstance: AxiosInstance
  private createAxiosInstance() {
    const axiosInstance = axios.create()
    axiosInstance.defaults.baseURL = 'https://challenge.crossmint.io/'
    axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      config.headers.set({ 'Content-Type': 'application/json' })
      return config
    })
    return axiosInstance
  }
  private constructor() {
    const axiosInstance = this.createAxiosInstance()

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const { config } = error
        try {
          if (!config) throw new Error('Config is not defined')
          return axiosInstance(config)
        } catch (e) {
          return Promise.reject(e)
        }
      }
    )

    AxiosSingleton.axiosInstance = axiosInstance
  }
  public static getInstance(): AxiosSingleton {
    if (!AxiosSingleton.instance) {
      this.instance = new AxiosSingleton()
    }
    return this.instance
  }
  public getAxios(): AxiosInstance {
    return AxiosSingleton.axiosInstance
  }
}
