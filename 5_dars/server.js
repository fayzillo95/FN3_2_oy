import setStatus from "./src/scripts/init.js"
import http from 'http'

const server = http.createServer((req, res) => {
    setStatus(req, res)
});
const PORT = 15975
server.listen(PORT, () => {
    console.log(`Server is listening on \nURL :   http://localhost:${PORT}`);
});