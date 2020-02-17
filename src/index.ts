const functions: object = {
  convertNumberToEnglishText: (n: number): string => {
    let string: string = n.toString(),
      units: Array<string>,
      tens: Array<string>,
      scales: Array<string>,
      start: number,
      end: number,
      chunks: Array<string>,
      chunksLen: number,
      chunk: number,
      ints: Array<number>,
      i: number,
      word: string,
      words: Array<string>

    /* Remove spaces and commas */
    string = string.replace(/[, ]/g, '')

    /* Is number zero? */
    if (parseInt(string) === 0) {
      return 'zero'
    }

    // 0 < int <20
    units = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ]

    // 20 <= int *= 10 < 100
    tens = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ]

    // 1000 <= int *= 1000 <= 1000000
    scales = ['', 'thousand', 'million']

    /* Split argument into 3 digit chunks from right to left, e.g. 1000000 -> 1,000,000 */
    start = string.length
    chunks = []
    while (start > 0) {
      end = start
      chunks.push(string.slice((start = Math.max(0, start - 3)), end))
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length
    if (chunksLen > scales.length) {
      return ''
    }

    /* Stringify each integer in each chunk */
    words = []
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i])

      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i]
          .split('')
          .reverse()
          .map(parseFloat)

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word)
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word)
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word)
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + ' hundred')
        }
      }
    }

    // Add word 'negative', if there is a '-' sign before the numbers' string
    if (string[0] === '-') {
      words.push('negative')
    }
    // Reverse the words array
    return words.reverse().join(' ')
  },
}

module.exports = functions
