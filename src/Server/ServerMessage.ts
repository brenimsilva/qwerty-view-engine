import { IncomingMessage, ServerResponse } from "http";
import {readFileSync, writeFileSync, readFile, writeFile} from "fs"

type JsonProps = {
    [key: string]: string;
}

export default class ServerMessage {
    // private jsonKeyRegex = /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g;
    private regexPattern = /#(.*?)#/g;
    constructor(private res: ServerResponse) {}
    public render(fileName: string, json?: JsonProps) {
        readFile(`${fileName}.html`, (err, data) => {
            let page = data.toString();
            const matches = page.match(this.regexPattern)?.map(m => m.slice(1,-1));
            if(json && matches) {
                matches?.forEach(k => {
                    page = page.replace(`#${k}#`, json[k]);
                })
            }
            this.res.end(page);
        });
    }
    public end(chunk: any) {
        this.res.end(chunk);
    }
}