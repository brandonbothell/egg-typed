import * as fs from "fs";
import * as parser from './parser';
import * as colors from 'colors/safe';

let paths: string[] = process.argv;
paths.splice(0, 2);

if (paths.length == 0) {
  console.log(colors.magenta(`Correct usage: ${colors.green(`node index`)} ...<path-to-file-from-project-folder> ${colors.bold(`or`)} ${colors.green(`npm test`)}`));
}
paths.forEach(function runPaths(val: string) {
  const program: string = `${fs.readFileSync(`${val}`)}`;

  console.log(`${colors.green(val)}: `);
  parser.parse(program);
  console.log();
});
