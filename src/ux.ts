/**
 * 和用户交互的界面，注意本代码必须经过自动化测试，不要想当然不写测试代码
 */

import cli from 'cli-ux'
import * as path from 'path'

export async function getProjectPath() {
  const projectPath = await cli.prompt("请输入项目路径", {default: '.'})
  return path.resolve(projectPath)
}

export async function getAuthor() {
  const author = await cli.prompt('请输入作者名称', {default: ''}) as string
  return author
}

export function getProjectName(projectPath: string) {
  return path.basename(projectPath)
}