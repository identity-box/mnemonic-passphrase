#!/usr/bin/env node

import nacl from 'tweetnacl'
import { Command } from 'commander'
import {
  entropyFromPassphrase
} from '../index.mjs'

const program = new Command()

const random = async numberOfBytes => {
  let N = Number.parseInt(numberOfBytes)
  if (isNaN(N)) {
    console.log('No valid number provided. Using <32>.')
    N = 32
  }
  const entropy = nacl.randomBytes(N)
  const entropyBuffer = Buffer.from(entropy)
  const entropyHex = entropyBuffer.toString('hex')
  console.log(entropyHex)
  process.exit(0)
}

program.name('random')
  .option('-N, --numberOfBytes [N]', 'Number of bytes', 32)
  .action(() => {
    const { numberOfBytes } = program.opts()
    random(numberOfBytes)
  })

program.parse()
