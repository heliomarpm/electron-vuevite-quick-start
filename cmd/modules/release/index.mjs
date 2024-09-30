import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import open from 'open'

import { extractOwnerAndRepoFromGitRemoteURL } from './utils/index.mjs'
import { checkValidations } from './validations/index.mjs'
import { question, exec } from '../../utils/index.mjs'
import { COLORS } from '../../constants/index.mjs'

import packageJSON from '../../../package.json' assert { type: 'json' };

async function makeRelease() {
  console.clear()

  const { version } = packageJSON

  const newVersion = await question(
    `Enter a new version: ${COLORS.SOFT_GRAY}(current is ${version})${COLORS.RESET} `
  )

  if (checkValidations({ version, newVersion })) {
    return
  }

  packageJSON.version = newVersion

  try {
    console.log(
      `${COLORS.CYAN}> Updating package.json version...${COLORS.RESET}`
    )

    await writeFile(
      resolve('package.json'),
      JSON.stringify(packageJSON, null, 2)
    )

    console.log(`\n${COLORS.GREEN}Done!${COLORS.RESET}\n`)
    console.log(`${COLORS.CYAN}> Trying to release it...${COLORS.RESET}`)

    exec(
      [
        `git commit -am v${newVersion}`,
        `git tag v${newVersion}`,
        `git push`,
        `git push --tags`,
      ],
      {
        inherit: true,
      }
    )

    const [repository] = exec([`git remote get-url --push origin`])
    const ownerAndRepo = extractOwnerAndRepoFromGitRemoteURL(repository)

    console.log(
      `${COLORS.CYAN}> Opening the repository releases page...${COLORS.RESET}`
    )

    await open(`https://github.com/${ownerAndRepo}/releases`)

    console.log(
      `${COLORS.CYAN}> Opening the repository actions page...${COLORS.RESET}`
    )

    await open(`https://github.com/${ownerAndRepo}/actions`)

    console.log(`\n${COLORS.GREEN}Done!${COLORS.RESET}\n`)
  } catch ({ message }) {
    console.log(`
    🛑 Something went wrong!\n
      👀 Error: ${message}
    `)
  }
}

makeRelease()
