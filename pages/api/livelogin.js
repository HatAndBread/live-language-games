export default function liveLogin(req, res) {
  if (req.body.type === 'pin') {
    //check if game valid
    console.log(req.body);
    res.send({ ok: true });
  } else if (req.body.type === 'name') {
    console.log(req.body);
    res.send({ ok: true });
  } else {
    console.log('unthinkable error');
  }
}
