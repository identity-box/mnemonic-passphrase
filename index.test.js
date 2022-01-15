import nacl from 'tweetnacl'
import {
  randomMnemonicPassphrase,
  mnemonicPassphrase,
  entropyFromPassphrase
} from './index.mjs'

const INVALID_ENTROPY = 'Invalid entropy'
const INVALID_CHECKSUM = 'Invalid mnemonic checksum'

describe('mnemonic-passphrase', () => {

  const mnemonicLength = 24
  
  it('generates random mnemonic', () => {
    const mnemonic = randomMnemonicPassphrase()

    expect(mnemonic).toBeDefined()
    expect(mnemonic.split(' ').length).toBe(mnemonicLength)
  })

  
  it('generates a mnemonic from entropy', () => {
    const entropy = nacl.randomBytes(10)

    const mnemonic = mnemonicPassphrase(entropy)

    expect(mnemonic).toBeDefined()
  })

  it('mnemonic is reversable', () => {
    const entropy = nacl.randomBytes(nacl.secretbox.keyLength)
    const entropyBuffer = Buffer.from(entropy)
    const entropyHex = entropyBuffer.toString('hex')

    const mnemonic = mnemonicPassphrase(entropy)

    const reversed = entropyFromPassphrase(mnemonic)

    expect(reversed).toBe(entropyHex)
  })

  it('minimal entropy is 16 and must be divisible by 4', () => {
    const entropy = nacl.randomBytes(16)
    const mnemonic = mnemonicPassphrase(entropy)
    const reversed = entropyFromPassphrase(mnemonic)
    const entropy15 = nacl.randomBytes(15)
    const mnemonic15 = mnemonicPassphrase(entropy15)
    expect(() => entropyFromPassphrase(mnemonic15)).toThrow(new Error(INVALID_CHECKSUM))
    const entropy12 = nacl.randomBytes(12)
    const mnemonic12 = mnemonicPassphrase(entropy12)
    expect(() => entropyFromPassphrase(mnemonic12)).toThrow(new Error(INVALID_ENTROPY))
  })

  it('max entropy is 32 and must be divisible by 4', () => {
    const entropy = nacl.randomBytes(32)
    const mnemonic = mnemonicPassphrase(entropy)
    const reversed = entropyFromPassphrase(mnemonic)
    const entropy33 = nacl.randomBytes(33)
    const mnemonic33 = mnemonicPassphrase(entropy33)
    expect(() => entropyFromPassphrase(mnemonic33)).toThrow(new Error(INVALID_CHECKSUM))
    const entropy36 = nacl.randomBytes(36)
    const mnemonic36 = mnemonicPassphrase(entropy36)
    expect(() => entropyFromPassphrase(mnemonic36)).toThrow(new Error(INVALID_ENTROPY))
  })
})
