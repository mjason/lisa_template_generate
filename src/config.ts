import * as lisa from '@listenai/lisa_core'
import * as path from 'path'

module.exports = ({application, fs, ...core} = lisa) => {
  application.configuration(config => {
    // config可配置属性请参考: xxx
    // config.addContext('gen_template', {
    //    outputPath: ''
    // })
    // config.addGlobalContext({

    // })
  })
}
