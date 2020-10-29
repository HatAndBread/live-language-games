function getLetters(howMany) {
  const lettersToReturn = [];
  for (let i = 0; i < howMany; i++) {
    lettersToReturn.push(letters[Math.floor(Math.random() * letters.length)]);
  }
  return lettersToReturn;
}

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

export default getLetters;
