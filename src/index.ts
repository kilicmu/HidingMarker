const zeroWidthChar = [
  '\u200b',
  '\u200c',
]

const DEFAULT_MARK_STR = ''
const MARK_START = '__MARK_START__'
const MARK_END = '__MARK_END__'
const wrapper = [
  MARK_START,
  MARK_END,
]

const to16Bit = (binaryStr: string): string => binaryStr.padStart(16, '0')

const charTo16Binary = (c: string): string => to16Bit(c.charCodeAt(0).toString(2))

const strTo16Binary = (str: string): string => str.split('').map(charTo16Binary).join('')

const encodeBinary = (binary: string): string => binary.split('').map((c) => zeroWidthChar[Number(c)]).join('')

const decodeBinary = (zeroWidthStr: string): string => zeroWidthStr.split('').map((c) => zeroWidthChar.indexOf(c)).join('')

const encodeStr = (str: string) => encodeBinary(strTo16Binary(str))

const isMarked = (str: string): boolean => {
  const encodedStartWrapper = encodeBinary(strTo16Binary(wrapper[0]))
  return str.indexOf(encodedStartWrapper) !== -1;
}

export const sign = (str: string, mark: string = DEFAULT_MARK_STR) => {
  str = str
    .replaceAll(new RegExp(`${zeroWidthChar.join('|')}`, 'g'), () => '')
  return `${str.slice(0, 1)}${encodeStr(wrapper[0] + mark + wrapper[1])}${str.slice(1)}`
}

export const extract = (str: string) => {
  if (!isMarked(str)) {
    return void 0
  }

  const start = Math.min(...zeroWidthChar.map(i => str.indexOf(i)))
  const end = Math.max(...zeroWidthChar.map(i => str.lastIndexOf(i)))
  const binaryMarkedStrWithWrapper = decodeBinary(str.slice(start, end + 1))

  let retStr = ''
  for(let i = 0; i < binaryMarkedStrWithWrapper.length; i += 16) {
    retStr += String.fromCharCode(parseInt(binaryMarkedStrWithWrapper.slice(i, i+16), 2))
  }

  return new RegExp(`${wrapper[0]}(.*)${wrapper[1]}`, 'g').exec(retStr)?.[1]
}

const str = sign('hellokooilic ho wor gdag', 'kilic')
console.log(str, extract(str))