import * as lisa from '@listenai/lisa_core'

import cli from 'cli-ux'
import * as path from 'path'
import { getAuthor, getProjectName, getProjectPath } from './ux'

import task from "./task"
const { application, loadPackageJSON, runner } = lisa

export async function main() {
  loadPackageJSON(path.join(__dirname, "../package.json"))

  application.root = await getProjectPath()
  application.packageJSON.author = await getAuthor()
  application.packageJSON.name = getProjectName(application.root)

  task(lisa)
  await runner('lisa_template_generate:init_project')
}

export default (lisa?: any) => {
  main().then().catch(err => {
    console.log(err)
  })
}