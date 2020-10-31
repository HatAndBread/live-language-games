function getLetters(howMany) {
  const lettersToReturn = [];
  while (!containsVowels(lettersToReturn)) {
    for (let i = 0; i < howMany; i++) {
      lettersToReturn.push(letters[Math.floor(Math.random() * letters.length)]);
    }
  }
  return lettersToReturn;
}

function containsVowels(arr) {
  for (let i = 0; i < vowels.length; i++) {
    if (arr.includes(vowels[i])) {
      return true;
    }
  }
  arr.splice(0, arr.length);
  return false;
}

const vowels = ['A', 'E', 'I', 'O', 'U'];
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
