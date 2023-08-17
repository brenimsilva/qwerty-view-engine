import { IncomingMessage, ServerResponse } from "http";
import {readFileSync, writeFileSync, readFile, writeFile} from "fs"

type JsonProps = {
    [key: string]: string;
}

export default class ServerMessage {
    private regexKey = /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g;
    constructor(private res: ServerResponse) {}
    public render(fileName: string, json?: JsonProps) {
        if(json) {
            const matches = JSON.stringify(json).match(this.regexKey);
            readFile(`${fileName}.html`, (err, data) => {
                let page = data.toString();
                if(matches) {
                    const jsonKeys = matches.map(e => e.slice(1, -2));
                    console.log(jsonKeys);
                    jsonKeys.forEach(k => {
                        page = page.replace(`#${k}#`, json[k]);
                    })
                this.res.end(page);
                }
            });
        } else {
            const original = readFileSync(`${fileName}.html`);
            this.res.end(original);
        }
    }
    public end(chunk: any) {
        this.res.end(chunk);
    }
}