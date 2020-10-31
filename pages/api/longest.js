export default async function longest(req, res) {
  console.log(req.body);
  const rawData = await fetch(`https://api.datamuse.com/words?sp=${req.body.word}&qe=sp&md=df`);
  const data = await rawData.json();
  const result = data[0];
  console.log(result);
  console.log(`Has headword: ${hasHeadWord(result)}`);
  if (
    (result.hasOwnProperty('defs') && frequency(result.tags) > 0.01) ||
    frequency(result.tags) > 0.3 ||
    hasHeadWord(result)
  ) {
    console.log('spelled correctly');
    console.log(frequency(result.tags));
    res.send({ points: calculateScore(req.body.word.length, req.body.time, req.body.timeLimit), success: true });
  } else {
    console.log('wrong spelling, dummy');
    console.log(frequency(result.tags));
    res.send({ points: 0, success: false });
  }
}

const frequency = (arr) => {
  let frequencyString;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].match(/^f:/)) {
      frequencyString = arr[i];
      break;
    }
  }
  if (frequencyString) {
    let num = parseFloat(frequencyString.slice(2, frequencyString.length));
    return num;
  }
  return 0;
};

const hasHeadWord = (result) => {
  if (Object.keys(result).includes('defHeadword')) {
    return true;
  }
  return false;
};

const calculateScore = (wLength, timeCompleted, timeLimit) => {
  return Math.floor(Math.pow(wLength, wLength / 1.5) * (timeLimit - timeCompleted));
};
// https://api.datamuse.com/words?sp=${req.body}&qe=sp&md=d     <---- Get definition
