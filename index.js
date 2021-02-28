const main = require("./lib").default

process.argv.push("--project_path", "create_csk", "--author", "MJ")
main()