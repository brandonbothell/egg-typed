import { get as http } from 'http'
import { get as https } from 'https'

export const topScope = Object.create(null)

topScope.true = true
topScope.false = false

for (let op of ['+', '-', '*', '/', '==', '<', '>']) {
  topScope[op] = Function('a, b', `return a ${op} b;`)
}

topScope.print = (...values): string => {
  let valuesString = ''

  for (let i = 0; i < values.length; i++) {
    valuesString += values[i]
  }

  console.log(valuesString)
  return valuesString
}

topScope.array = (...items): any[] => {
  return items
}

topScope.sizeof = (array: any[]): number => {
  return array.length
}

topScope.element = (array: any[], index: number): any => {
  return array[index]
}

topScope.httpGet = (url: string, callback: Function): any => {
  http(url, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      return callback(data)
    })
  })
}

topScope.httpsGet = (url: string, callback: Function): any => {
  https(url, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      return callback(data)
    })
  })
}

topScope.js = (code: string): any => {
  return eval(code)
}

topScope.JSON = {
  parse: (json: string): any => {
    return JSON.parse(json)
  },
  string: (json: any, spaces?: number): string => {
    return JSON.stringify(json, null, spaces)
  }
}
