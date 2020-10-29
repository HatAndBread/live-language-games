export default async function longest(req, res) {
  console.log(req.body);
  const rawData = await fetch(`https://api.datamuse.com/words?sp=${req.body}&qe=sp&md=df`);
  const data = await rawData.json();
  const result = data[0];
  console.log(result);
  if (result.hasOwnProperty('defs') && frequency(result.tags) > 0.09) {
    console.log('speeled correctly');
    console.log(frequency(result.tags));
  } else {
    console.log('wrong spelling, dummy');
    console.log(frequency(result.tags));
  }
  res.send({ message: 'HI!' });
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
// https://api.datamuse.com/words?sp=${req.body}&qe=sp&md=d     <---- Get definition
