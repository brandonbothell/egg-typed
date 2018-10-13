import { get as http, request as httpReq, RequestOptions } from 'http'
import { get as https, request as httpsReq } from 'https'
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
    http(url, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        return callback(data)
      })
    })
  },
  post: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url)
    const req = httpReq(options, res => {
      let data = ''

      res.setEncoding('utf8')
      res.on('data', chunk => {
        data += chunk
      })
      res.on('end', () => {
        return callback(data)
      })
    })

    req.on('error', error => {
      throw error
    })

    req.write(data)
    req.end()
  }
}

topScope.HTTPS = {
  get: (url: string, callback: Function): any => {
    https(url, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        return callback(data)
      })
    })
  },
  post: (url: string, data: any, callback: Function) => {
    const options = parseUrlToOptions(url)
    const req = httpsReq(options, res => {
      let data = ''

      res.setEncoding('utf8')
      res.on('data', chunk => {
        data += chunk
      })
      res.on('end', () => {
        return callback(data)
      })
    })

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

function parseUrlToOptions (url: string): RequestOptions {
  const parsed = parseUrl(url)

  return {
    hostname: parsed.hostname,
    port: parsed.port ? parsed.port : 443,
    path: parsed.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
