import { application, fs } from '@listenai/lisa_core';
import { stdin, MockSTDIN } from 'mock-stdin'
jest.unmock('mock-stdin');
import { main } from '../index'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePathExists(): R;
    }
  }
}

expect.extend({
  async toBePathExists(path: string) {
    const value = await fs.pathExists(fs.project.join(path))
    return {
      message: () => value ? '' : `${path} 路径检查失败`,
      pass: value
    }
  }
})

describe("main 测试", () => {
  let io : MockSTDIN

  beforeEach(() => {
    io = stdin()
  })

  afterEach(() => {
    io.restore()
  })

  test('test create project', async () => {
    await fs.remove("./create_csk")

    const sendStdin = async () => {
      io.send("./create_csk\r")
      io.send("MJ\r")
    }
    setTimeout(() => sendStdin().then(), 5)
    await main()

    expect("tsconfig.json").toBePathExists()
    expect("package.json").toBePathExists()
    expect("jest.config.js").toBePathExists()
    expect("src").toBePathExists()
    expect("templates").toBePathExists()
    expect(".gitignore").toBePathExists()
    expect("README.md").toBePathExists()
  })
})

