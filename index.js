const http = require('http');
const fs = require('fs')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    if (req.url == '/favicon.ico') {
        res.statusCode = 204

    } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html');
        let path = "." + req.url
        fs.readdir(path, { "encoding": "utf8" }, (err, data) => {
            if (err) {
                const content = fs.readFileSync(path.toString())
                res.end(content)
            } else {
                let response = ''
                if (data.length == 0) {
                    response += "<h2>Nothing  to show</h2>"
                }
                data.forEach((el) => {
                    response += `<li ><a href = ${el + "/"}>${el}</a></li>`
                })
                res.end(`<div ><h1 ">File server</h1><hr/> <div>${response}</div></div>`);
            }
        });

    }


})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})