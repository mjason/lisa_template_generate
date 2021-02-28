import * as lisa from '@listenai/lisa_core'
import * as path from 'path'

export default ({job, fs, application, ...core} = lisa) => {
  job('lisa_template_generate:init_project', {
    title: '初始化项目',
    task: async () => {
      const isPath = await fs.pathExists(application.root)
      if (!isPath) {
        await fs.mkdir(application.root)
      }
      fs.project.template_path = path.join(__dirname, "../templates")
      await fs.project.template("package.json.ejs", "package.json", application.packageJSON)
      await fs.project.touch("./README.md")
      await fs.project.copy("tsconfig.json", "tsconfig.json")
      await fs.project.copy("jest.config.js", "jest.config.js")
      await fs.project.copy("gitignore", ".gitignore")
      await fs.project.copy("../src", "src")
      await fs.project.copy("../templates", "templates")
    },
  })
}