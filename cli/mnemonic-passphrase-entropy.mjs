#!/usr/bin/env node

import { Command } from 'commander'
import {
  entropyFromPassphrase
} from '../index.mjs'

const program = new Command()

const entropy = async passphrase => {
  const entropy = entropyFromPassphrase(passphrase)
  console.log(entropy)
  process.exit(0)
}

program.name('entropy')
  .argument('<passphrase>', 'passphrase from which to recreate the original entropy')
  .action((passphrase) => {
    entropy(passphrase)
  })

program.parse()
