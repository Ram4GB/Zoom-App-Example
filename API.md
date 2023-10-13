```
const express = require('express');
const app = express();
const cors = require('cors');
const { KJUR } = require('jsrsasign');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const meetingNumber = "" // Please replace your meeting number
const role = 1;


const generateSignature = (key, secret, meetingNumber, role) => {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: key,
    appKey: key,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, secret);
  return sdkJWT;
};


app.get('/token', (req, res) => {
  try {
    const token = generateSignature(process.env.VITE_ZOOM_SDK_KEY, process.env.VITE_ZOOM_CLIENT_SECRET, meetingNumber, role)
    res.status(200).send({
      token: token,
      myProfile: "https://github.com/Ram4GB",
      message: "Hello from server!!!"
    })
  } catch(e) {
    res.status(404).send(':))))')
  }
})

app.all('/', (req, res) => {
  res.status(200).send({
    message: "Okela"
  })
})

app.listen(3000, () => {
  console.log('Server start at port 3000')
})

```
