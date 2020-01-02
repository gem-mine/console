import chalk from 'chalk'

const colors = {
  log: chalk.cyanBright,
  warn: chalk.yellowBright,
  error: chalk.redBright
}

const log = global.console.log

function write(level: string, ...args: any[]): void {
  try {
    throw new Error('empty')
  } catch (e) {
    const stack = e.stack
      .trim()
      .split(/\n/)
      .map((line: string) => line.trim())
      .filter((line: string) => line.startsWith('at '))
    const current = stack[2].match(/at\s(.*\()?(.*:\d+:\d+)(\))?$/)[2]
    const color = colors[level] || colors.log
    log(color(`[${level}: ${_now()}]`), ...args, current)
  }
}

function _patchZero(n: number): string {
  if (n < 10) {
    return `0${n}`
  }
  return `${n}`
}

function _now(): string {
  const date = new Date()
  const year = date.getFullYear()

  const month = _patchZero(date.getMonth() + 1)
  const day = _patchZero(date.getDate())
  const hour = _patchZero(date.getHours())
  const minute = _patchZero(date.getMinutes())
  const second = _patchZero(date.getSeconds())

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const _nonf = function() {}

interface Console {
  config: ({ debug }: { debug: boolean }) => void
}

const console: Console = {
  config({ debug }: { debug: boolean }) {
    if (debug) {
      global.console.log = function(...args: any[]) {
        write('log', ...args)
      }
      global.console.warn = function(...args: any[]) {
        write('warn', ...args)
      }
      global.console.error = function(...args: any[]) {
        write('error', ...args)
      }
    } else {
      global.console.log = _nonf
      global.console.warn = _nonf
      global.console.error = _nonf
    }
  }
}

export default console