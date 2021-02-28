/**
 * 和用户交互的界面，注意本代码必须经过自动化测试，不要想当然不写测试代码
 */

import { application, argv, flags } from '@listenai/lisa_core';
import cli from 'cli-ux'
import * as path from 'path'

export class CliUx {

  // 如果需要命令行输入的，请注入对应的flag，方便测试
  @flags("project_path")
  async getProjectPath() {
    const projectPath = await cli.prompt("请输入项目路径", {default: '.'})
    return path.resolve(projectPath)
  }

  @flags('author')
  async getAuthor() {
    const author = await cli.prompt('请输入作者名称', {default: ''}) as string
    return author
  }

  getProjectName(projectPath: string) {
    return path.basename(projectPath)
  }
}