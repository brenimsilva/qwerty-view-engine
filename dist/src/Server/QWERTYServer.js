import { createServer } from "http";
import ServerMessage from "./ServerMessage.js";
export default class QWERTYServer {
    _routeList = [];
    _server;
    _port;
    _host;
    constructor(port, host) {
        this._port = port;
        this._host = host;
    }
    get(route, cb) {
        this._routeList.push({ route, callBack: cb, method: "GET" });
    }
    post(route, cb) {
        this._routeList.push({ route, callBack: cb, method: "POST" });
    }
    listen() {
        this._startServer();
        this._server.listen(this._port, this._host);
        console.log(`Server running on address: http://${this._host}:${this._port}/`);
    }
    _startServer() {
        this._server = createServer((req, res) => {
            const postList = this._routeList.filter(e => e.method === "POST");
            const getList = this._routeList.filter(e => e.method === "GET");
            switch (req.method) {
                case "GET":
                    getList.forEach(e => {
                        if (req.url === e.route) {
                            const sm = new ServerMessage(res);
                            e.callBack(req, sm);
                        }
                    });
                    break;
                case "POST":
                    postList.forEach(e => {
                        if (req.url === e.route) {
                            const sm = new ServerMessage(res);
                            e.callBack(req, sm);
                        }
                    });
                    break;
            }
        });
    }
}
