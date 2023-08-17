import { readFileSync, readFile } from "fs";
export default class ServerMessage {
    res;
    regexKey = /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g;
    constructor(res) {
        this.res = res;
    }
    render(fileName, json) {
        if (json) {
            const matches = JSON.stringify(json).match(this.regexKey);
            readFile(`${fileName}.html`, (err, data) => {
                let page = data.toString();
                if (matches) {
                    const jsonKeys = matches.map(e => e.slice(1, -2));
                    console.log(jsonKeys);
                    jsonKeys.forEach(k => {
                        page = page.replace(`#${k}#`, json[k]);
                    });
                    this.res.end(page);
                }
            });
        }
        else {
            const original = readFileSync(`${fileName}.html`);
            this.res.end(original);
        }
    }
    end(chunk) {
        this.res.end(chunk);
    }
}
