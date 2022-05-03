import { useState } from 'react'

interface IState<D> {
  data: D | null
  error: Error | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: IState<null> = {
  data: null,
  error: null,
  stat: 'idle',
}
const defaultConfig = {
  throwOnError: false,
}

export const useAsync = <D>(
  initialState?: IState<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState<IState<D>>({
    ...defaultInitialState,
    ...initialState,
  })

  const setDate = (data: D) => {
    setState({
      data,
      error: null,
      stat: 'success',
    })
  }

  const setError = (error: Error) => {
    setState({
      data: null,
      error,
      stat: 'error',
    })
  }

  // 用来出发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setState({
      ...state,
      stat: 'loading',
    })
    return promise
      .then((data) => {
        setDate(data)
        return data
      })
      .catch((err) => {
        setError(err)
        // catch 会消化异常，如果不主动抛出，外面是接搜不到异常的
        if (config.throwOnError) {
          return Promise.reject(err)
        } else {
          return err
        }
      })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoadig: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    setDate,
    setError,
    run,
    ...state,
  }
}
