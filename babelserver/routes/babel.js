const express = require("express");
const router = express.Router();
const multiparty = require("multiparty")
const process = require("child_process");
const {
    readdirSync,
    rmdirSync,
    statSync,
    unlinkSync,
    existsSync,
    mkdirSync,
    writeFile,
    readFileSync,
    createReadStream
} = require("fs");

router.post("/", function (req, res, next) {
    // 允许所有的请求源来跨域
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 允许所有的请求头来跨域
    res.setHeader("Access-Control-Allow-Headers", "*")
    // 使用multiparty解析二进制文件
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            return
        }
        const {code} = fields

        const emptyDir = (path) => {
            const files = readdirSync(path);
            files.forEach(file => {
                const filePath = `${path}/${file}`;
                const stats = statSync(filePath);
                if (stats.isDirectory()) {
                    emptyDir(filePath);
                } else {
                    unlinkSync(filePath);
                    // console.log(`删除${file}文件成功`);
                }
            });
        }

        const rmEmptyDir = (path, level = 0) => {
            const files = readdirSync(path);
            if (files.length > 0) {
                let tempFile = 0;
                files.forEach(file => {
                    tempFile++;
                    rmEmptyDir(`${path}/${file}`, level + 1);
                });
                if (tempFile === files.length && level !== 0) {
                    rmdirSync(path);
                }
            } else {
                level !== 0 && rmdirSync(path)
            }
        }

        const sourcePath = "dist"
        const transformPath = "distes5"
        if (existsSync(sourcePath)) {
            emptyDir(sourcePath)
            rmEmptyDir(sourcePath)
        }
        if (!existsSync(sourcePath)) {
            // 若目录不存在，则创建目录
            mkdirSync(sourcePath)
        }

        writeFile(`${sourcePath}/code.js`, String(code), "utf-8", (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`${sourcePath}/code.js 文件写入成功`)
            }
        })

        process.exec("npx babel dist --out-dir distes5", (error, stdout, stderr) => {
            if (!error) {
                const files = readdirSync(transformPath);
                let fileCode = ""
                files.forEach(file => {
                    const filePath = `${transformPath}/${file}`;
                    fileCode += readFileSync(filePath, "utf-8")
                });
                console.log(fileCode)
                res.send(fileCode);
            } else {
                console.log("error", error)
                res.send(error);
            }
        });
    })
});

router.get("/download", function (req, res, next) {
    // 允许所有的请求源来跨域
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 允许所有的请求头来跨域
    res.setHeader("Access-Control-Allow-Headers", "*")
    const transformPath = "distes5"
    const transformFilePath = `${transformPath}/code.js`
    const readStream = createReadStream(transformFilePath)
    // const stats = statSync(transformFilePath);
    res.set({
        "Content-type": "application/force-download",
        "Content-Disposition": "attachment;filename=code.js",
        // "Content-Length": stats.size
    });
    readStream.pipe(res)
});

module.exports = router;
