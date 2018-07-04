import * as fs from "fs";
import * as parser from './parser';

let paths: string[] = process.argv;
paths.splice(0, 2);

if (paths.length == 0) {
  console.log(`Correct usage: node index ...<path-to-file-from-project-folder> or npm test`);
}
paths.forEach(function runPaths(val: string) {
  const program: string = `${fs.readFileSync(`${val}`)}`;

  console.log(`${val}: `);
  run(program);
  console.log(`\n`);
});

/**
 * Parses and evaluates a program from the top scope.
 * @param {string} program The unparsed program to run.
 */
function run(program: string): any {
  parser.parse(program);
}
