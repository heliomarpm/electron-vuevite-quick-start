import { normalize, dirname } from 'path'

export function getDevFolder(path) {
  const [nodeModules, devFolder] = normalize(dirname(path)).split(/\/|\\/g)

  return [nodeModules, devFolder].join('/')
}
