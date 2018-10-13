import * as fs from 'fs'
import { parseAndRun } from './parser'

const reset = '\x1b[0m'
const green = '\x1b[32m'
const underlined = '\x1b[4m'
const magenta = '\x1b[35m'

const paths: string[] = process.argv
paths.splice(0, 2)

if (paths.length === 0) {
  console.log(`${magenta}Correct usage: ${green}node out/index ...<path-to-file-from-project-folder> ${magenta}${underlined}or${reset}${green} npm test${reset}`)
}

paths.forEach(function runPaths (val: string) {
  const program: string = `${fs.readFileSync(`${val}`)}`

  console.log(`${green}${val}: ${reset}`)
  parseAndRun(program)
  console.log()
})
