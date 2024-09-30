import { valid, ltr, eq } from 'semver'

import { COLORS } from '../../../constants/index.mjs'

export function checkValidations({ version, newVersion }) {
  if (!newVersion) {
    console.log(`${COLORS.RED}No version entered${COLORS.RESET}`)

    return true
  }

  if (!valid(newVersion)) {
    console.log(
      `${COLORS.RED}Version must have a semver format (${COLORS.SOFT_GRAY}x.x.x${COLORS.RESET} example: ${COLORS.GREEN}1.0.1${COLORS.RESET}${COLORS.RED})${COLORS.RESET}`
    )

    return true
  }

  if (ltr(newVersion, version)) {
    console.log(
      `${COLORS.RED}New version is lower than current version${COLORS.RESET}`
    )

    return true
  }

  if (eq(newVersion, version)) {
    console.log(
      `${COLORS.RED}New version is equal to current version${COLORS.RESET}`
    )

    return true
  }
}
