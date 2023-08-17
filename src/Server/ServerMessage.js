import { readFile } from "fs";
export default class ServerMessage {
    res;
    // private jsonKeyRegex = /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g;
    regexPattern = /#(.*?)#/g;
    constructor(res) {
        this.res = res;
    }
    render(fileName, json) {
        readFile(`${fileName}.html`, (err, data) => {
            let page = data.toString();
            const matches = page.match(this.regexPattern)?.map(m => m.slice(1, -1));
            console.log(matches);
            if (json && matches) {
                matches?.forEach(k => {
                    page = page.replace(`#${k}#`, json[k]);
                });
            }
            this.res.end(page);
        });
    }
    end(chunk) {
        this.res.end(chunk);
    }
}
