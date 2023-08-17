import { IncomingMessage, Server, ServerResponse, createServer } from "http"
import ServerMessage from "./ServerMessage.js";

export type routeProps = {
    route: string,
    method: "GET" | "POST",
    callBack: (req: IncomingMessage, res: ServerMessage) => void
}
export default class QWERTYServer {
    private _routeList: Array<routeProps> = [];
    private _server: Server;
    private _port: number;
    private _host: string;
    constructor(port: number, host: string) {
        this._port = port;
        this._host = host;
    }

    public get(route: string, cb: (req: IncomingMessage, res: ServerMessage) => void) {
       this._routeList.push({route, callBack: cb, method: "GET"});
    }
    
    public post(route: string, cb: (req: IncomingMessage, res: ServerMessage) => void) {
       this._routeList.push({route, callBack: cb, method: "POST"});
    }

    public listen() {
        this._startServer();
        this._server.listen(this._port, this._host)
        console.log(`Server running on address: http://${this._host}:${this._port}/`);
    } 

    private _startServer() {
        this._server = createServer((req, res) => {
            const postList = this._routeList.filter(e => e.method === "POST");
            const getList = this._routeList.filter(e => e.method === "GET");

            switch(req.method) {
                case "GET":
                    getList.forEach(e => {
                        if(req.url === e.route) {
                            const sm = new ServerMessage(res);
                            e.callBack(req,sm);
                        }
                    })
                    break;
                case "POST":
                    postList.forEach(e => {
                        if(req.url === e.route) {
                            const sm = new ServerMessage(res);
                            e.callBack(req,sm);
                        }
                    })
                break;
            }
        })
    }
}