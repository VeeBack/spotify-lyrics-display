import http from 'http'
import express from 'express'
import httpProxy from 'http-proxy'
import proxy from 'express-http-proxy'
const app = express()

const server = http.createServer(app)

const dealerProxy = httpProxy.createProxyServer({ target: 'https://gew4-dealer.spotify.com:443', ws: true, secure: false });

app.use(express.static('public'))

app.use('/api', proxy('https://gew4-spclient.spotify.com'))
app.use('/open', proxy('https://open.spotify.com'))
app.use('/spclient', proxy('https://spclient.wg.spotify.com'))
app.use('/oapi', proxy('https://api.spotify.com'))

server.on('upgrade', function (req, socket, head) {
  console.log('upgrade')
  dealerProxy.ws(req, socket, head);
})

server.listen(process.env.SERVER_PORT || 3000, () => {
  console.log('Listening on port 3000')
})
