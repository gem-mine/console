const spy = jest.spyOn(global.console, 'log')

import console from '../src'

const prefixReg = /[log: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}]/

describe('console in node with debug', () => {
  afterEach(() => {
    spy.mockReset()
  })
  test('should console in named function', () => {
    console.config({
      debug: true
    })
    const testFunc = function testFunc() {
      global.console.log('t')
    }
    testFunc()
    expect(spy).toBeCalledTimes(1)

    expect(prefixReg.test(spy.mock.calls[0][0])).toBe(true)
    expect(spy.mock.calls[0][1]).toBe('t')
    expect(spy.mock.calls[0][2]).toBe('C:\\github\\console\\__tests__\\node.test.ts:16:22')
  })

  test('should console in array function', () => {
    console.config({
      debug: true
    })
    const testFunc = () => {
      global.console.log('t')
    }
    testFunc()
    expect(spy).toBeCalledTimes(1)

    expect(prefixReg.test(spy.mock.calls[0][0])).toBe(true)
    expect(spy.mock.calls[0][1]).toBe('t')
    expect(spy.mock.calls[0][2]).toBe('C:\\github\\console\\__tests__\\node.test.ts:31:22')
  })

  test('should console in function call by apply', () => {
    console.config({
      debug: true
    })
    const testFunc = () => {
      const a: Array<Function> = []
      a.push(() => { global.console.log('t') })
      a[0].apply(null)
    }
    testFunc()
    expect(spy).toBeCalledTimes(1)

    expect(prefixReg.test(spy.mock.calls[0][0])).toBe(true)
    expect(spy.mock.calls[0][1]).toBe('t')
    expect(spy.mock.calls[0][2]).toBe('C:\\github\\console\\__tests__\\node.test.ts:47:37')
  })
})