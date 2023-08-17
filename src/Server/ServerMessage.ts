import { IncomingMessage, ServerResponse } from "http";
import {readFileSync, writeFileSync, readFile, writeFile} from "fs"

type JsonProps = {
    [key: string]: string;
}

export default class ServerMessage {
    constructor(private res: ServerResponse) {}
    public render(fileName: string, json: JsonProps) {
        const original = readFile(`${fileName}.html`, (err, data) => {
            const page = data.toString();
            const buildedPage = page.replace("#title#", json.title);
            console.log(buildedPage);
            this.res.end(buildedPage);
        });
    }
    public end(chunk: any) {
        this.res.end(chunk);
    }
}