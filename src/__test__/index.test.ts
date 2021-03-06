import { application, fs, runner } from '@listenai/lisa_core';
import { main } from '../index'
import "@listenai/lisa_core/lib/test_helper"

jest.useFakeTimers();

describe("main 测试", () => {
  test('test create project', async () => {
    await fs.remove("./create_csk")
    application.argv.push("--project_path", "create_csk", "--author", "MJ")
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

