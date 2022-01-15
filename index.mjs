import nacl from 'tweetnacl'
import { entropyToMnemonic } from './mnemonic/entropyToMnemonic.mjs'
import { mnemonicToEntropy } from './mnemonic/mnemonicToEntropy.mjs'

const randomMnemonicPassphrase = () => {
  const randomKey = nacl.randomBytes(nacl.secretbox.keyLength)
  return entropyToMnemonic(randomKey)
}

const mnemonicPassphrase = entropy => {
  return entropyToMnemonic(entropy)
}

const entropyFromPassphrase = passphrase => {
  return mnemonicToEntropy(passphrase)
}

export {
  randomMnemonicPassphrase,
  mnemonicPassphrase,
  entropyFromPassphrase
}
