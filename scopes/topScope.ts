import { request as httpReq, RequestOptions, IncomingMessage } from 'http'
import { request as httpsReq } from 'https'
import { parse as parseUrl } from 'url'

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

topScope.Array = {
  create: (...items): any[] => {
    return items
  },
  size: (array: any[]): number => {
    return array.length
  },
  element: (array: any[], index: number): any => {
    return array[index]
  }
}

topScope.HTTP = {
  get: (url: string, callback: Function): any => {
    const options = parseUrlToOptions(url, false, 'GET')
    const req = request(options, false, callback)

    req.on('error', error => {
      throw error
    })

    req.end()
  },
  post: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url, false, 'POST')
    const req = request(options, false, callback)

    req.on('error', error => {
      throw error
    })

    req.write(data)
    req.end()
  },
  put: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url, true, 'PUT')
    const req = request(options, false, callback)

    req.on('error', error => {
      throw error
    })

    req.write(data)
    req.end()
  },
  delete: (url: string, callback: Function) => {
    const options = parseUrlToOptions(url, true, 'POST')
    const req = request(options, false, callback)

    req.on('error', error => {
      throw error
    })

    req.end()
  },
  patch: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url, true, 'PATCH')
    const req = request(options, true, callback)

    req.on('error', error => {
      throw error
    })

    req.write(data)
    req.end()
  }
}

topScope.HTTPS = {
  get: (url: string, callback: Function): any => {
    const options = parseUrlToOptions(url, true, 'GET')
    const req = request(options, true, callback)

    req.on('error', error => {
      throw error
    })

    req.end()
  },
  post: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url, true, 'POST')
    const req = request(options, true, callback)

    req.on('error', error => {
      throw error
    })

    req.write(data)
    req.end()
  },
  put: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url, true, 'PUT')
    const req = request(options, true, callback)

    req.on('error', error => {
      throw error
    })

    req.write(data)
    req.end()
  },
  delete: (url: string, callback: Function) => {
    const options = parseUrlToOptions(url, true, 'POST')
    const req = request(options, true, callback)

    req.on('error', error => {
      throw error
    })

    req.end()
  },
  patch: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url, true, 'PATCH')
    const req = request(options, true, callback)

    req.on('error', error => {
      throw error
    })

    req.write(data)
    req.end()
  }
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

function parseUrlToOptions (url: string, https: boolean, type: 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET'): RequestOptions {
  const parsed = parseUrl(url)

  return {
    hostname: parsed.hostname,
    port: parsed.port ? parsed.port : https ? 443 : 80,
    path: parsed.path,
    method: type,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

function request (options, https: boolean, callback?: Function) {
  const cb = (res: IncomingMessage) => {
    let data = ''

    res.setEncoding('utf8')

    res.on('data', chunk => {
      data += chunk
    })

    res.on('end', () => {
      return callback(data)
    })
  }

  if (https) {
    return httpsReq(options, cb)
  }

  return httpReq(options, cb)
}
