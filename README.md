# @identity-box/mnemonic-passphrase

This is small utility that we use to generate passphrase mnemonics.

It can be use in the code or as CLI.

## Code

The example below shows typical usage:

```javascript
import nacl from 'tweetnacl'
import {
  randomMnemonicPassphrase,
  mnemonicPassphrase,
  entropyFromPassphrase
} from '@identity-box/mnemonic-passphrase'

const passphrase = randomMnemonicPassphrase()

console.log(passphrase)

const entropy = entropyFromPassphrase(passphrase)

console.log(entropy)

const random16 = nacl.randomBytes(16)

const passphrase16 = mnemonicPassphrase(random16)

console.log(passphrase16)

const entropy16 = entropyFromPassphrase(passphrase16)

console.log(entropy16)
```

Allowed entropy length N (the argument to `nacl.randomBytes`) must be `16 <= N <= 32` and `N mod 4 === 0` (must divide by 4).

## CLI

To use it as CLI run:

```bash
npx github:/identity-box/mnemonic-passphrase
```

To generate a random passphrase (from a 32B entropy) run:

```bash
npx github:/identity-box/mnemonic-passphrase passphrase
```

To generate an entropy of length `16B` run:

```bash
npx github:/identity-box/mnemonic-passphrase random -N 16
```

To generate a passphrase from the given entropy:

```bash
npx github:/identity-box/mnemonic-passphrase passphrase 4af32d3079b75f48a7358e799710dfc4
```

And finally, to retrieve the original entropy from the passphrase:

```bash
npx github:/identity-box/mnemonic-passphrase entropy "enough offer equal vibrant invest picture orphan range kangaroo review dawn mass"
```

For help, you can use `--help` with any of the commands.
