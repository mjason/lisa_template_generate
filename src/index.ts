import * as lisa from '@listenai/lisa_core'

import * as path from 'path'
import { CliUx } from './ux'

import task from "./task"
const { application, loadPackageJSON, runner } = lisa

export async function main() {
  loadPackageJSON(path.join(__dirname, "../package.json"))

  const cliUx = new CliUx()

  application.root = await cliUx.getProjectPath()
  application.packageJSON.author = await cliUx.getAuthor()
  application.packageJSON.name = cliUx.getProjectName(application.root)

  task(lisa)

  await runner('lisa_template_generate:init_project')
}

export default (lisa?: any) => {
  main().then().catch(err => {
    console.log(err)
  })
}