#!/usr/bin/env node

import commander from 'commander'

// https://stackoverflow.com/questions/60205891/import-json-extension-in-es6-node-js-throws-an-error
import { createRequire } from "module"
const require = createRequire(import.meta.url);

const packageJSON = require('../package.json')

const program = new commander.Command()

const main = async () => {
  program
    .version(`${packageJSON.version}`)
    .usage('command [options]')
    .on('command:*', () => {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
      process.exit(1)
    })
  program.command('passphrase', 'generates mnemonic passphrase')
  program.command('entropy', 'converts passphrase to the original entropy')
  program.command('random', 'generates random entropy')

  program.parse()
}

main()
