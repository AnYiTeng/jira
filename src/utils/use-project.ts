import { useEffect } from 'react'
import { IList } from 'screens/projectList'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/use-async'
import { cleanObject } from 'utils'

export const useProject = (param?: Partial<IList>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<IList[]>()

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
  }, [param])

  return result
}
