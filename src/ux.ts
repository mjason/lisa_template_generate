/**
 * 和用户交互的界面，注意本代码必须经过自动化测试，不要想当然不写测试代码
 */

import { application, argv } from '@listenai/lisa_core';
import cli from 'cli-ux'
import * as minimist from 'minimist'
import * as path from 'path'

/**
 * 移动到 Core 之中
 * @param key
 */
export function flags(key: string) {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<()=> Promise<any>>) => {
    const method = descriptor.value as ()=> Promise<any>
    descriptor.value = async function() {
      let _argv: any

      if (application.argv.length > 0) {
        _argv = minimist(application.argv)
      } else {
        _argv = argv()
      }

      if (key in _argv) {
        const flag = _argv[key]
        return flag
      } else {
        const result = await method.apply(this)
        return result
      }
    }
  }
}

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