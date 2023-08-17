import { readFile } from "fs";
export default class ServerMessage {
    res;
    constructor(res) {
        this.res = res;
    }
    render(fileName, json) {
        const original = readFile(`${fileName}.html`, (err, data) => {
            const page = data.toString();
            const buildedPage = page.replace("#title#", json.title);
            console.log(buildedPage);
            this.res.end(buildedPage);
        });
    }
    end(chunk) {
        this.res.end(chunk);
    }
}
