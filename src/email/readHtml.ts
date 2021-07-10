import { readFileSync } from "fs"
import { compile } from "handlebars"
import * as path from "path"


export function readHtml(htmlFileName: string, username: string, replacements: object) {
    const filePath = path.join(__dirname, `/${htmlFileName}`)
    const source = readFileSync(filePath, "utf-8").toString()
    const template = compile(source)
    const htmlToSend = template(replacements)

    return htmlToSend
}