#!/usr/bin/env node

import { Command } from 'commander'
import {
  mnemonicPassphrase,
  randomMnemonicPassphrase
} from '../index.mjs'

const program = new Command()

const passphrase = async entropy => {
  if (entropy) {
    const entropyBytes = Buffer.from(entropy, 'hex')
    const passphrase = mnemonicPassphrase(entropyBytes)
    console.log(passphrase)
  } else {
    const passphrase = randomMnemonicPassphrase()
    console.log(passphrase)
  }
  process.exit(0)
}

program.name('passphrase')
  .argument('[entropy]', 'entropy to use to generate the passphrase; random entropy (32B) will be used if not provided')
  .action((entropy) => {
    passphrase(entropy)
  })

program.parse()
