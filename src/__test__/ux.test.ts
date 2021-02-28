import { CliUx } from '../ux'
import { stdin, MockSTDIN } from 'mock-stdin'
import { mockArgv } from '@listenai/lisa_core/lib/test_helper'

jest.unmock('mock-stdin');

describe("ux 测试", () => {

  let io : MockSTDIN

  beforeEach(() => {
    io = stdin()
  })

  afterEach(() => {
    io.restore()
  })

  test('测试项目绝对路径是否成功', async () => {

    const cliUx = new CliUx()

    const sendStdin = async () => {
      io.send("create_csk\r")
      io.send("MJ\r")
    }
    setTimeout(() => sendStdin().then(), 5)

    const projectPath = await cliUx.getProjectPath()
    expect(projectPath).toMatch('create_csk')

    const author = await cliUx.getAuthor()
    expect(author).toBe("MJ")
  })

})

test('test getProjectName', () => {
  const cliUx = new CliUx()

  const projectName = cliUx.getProjectName("./create_csk")
  expect(projectName).toBe("create_csk")
})

test('test ux flags', () => {
  mockArgv(["--project_path", "create_csk_23", "--author", "linmanjia"], async () => {
    const cilUx = new CliUx()
    const projectPath = await cilUx.getProjectPath()
    expect(projectPath).toBe("create_csk_23")

    const author = await cilUx.getAuthor()
    expect(author).toBe("linmanjia")
  })
})