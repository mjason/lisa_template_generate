import { getAuthor, getProjectName, getProjectPath } from '../ux'
import { stdin, MockSTDIN } from 'mock-stdin'

jest.unmock('mock-stdin');

describe("ux 测试", () => {

  let io : MockSTDIN

  beforeEach(() => {
    io = stdin()
  })

  afterAll(() => {
    io.restore()
  })

  test('测试项目绝对路径是否成功', async () => {
    const sendStdin = async () => {
      io.send("create_csk\r")
      io.send("MJ\r")
    }
    setTimeout(() => sendStdin().then(), 5)

    const projectPath = await getProjectPath()
    expect(projectPath).toMatch('create_csk')

    const author = await getAuthor()
    expect(author).toBe("MJ")
  })

})

test('test getProjectName', () => {
  const projectName = getProjectName("./create_csk")
  expect(projectName).toBe("create_csk")
})