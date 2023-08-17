import QWERTYServer from "./src/Server/QWERTYServer.js";
const app = new QWERTYServer(3001, "localhost");
app.get("/breno", (req, res) => {
    res.render("file", { alisson: "Sou legal", title: "Oi", varteste: "Segundo teste", teste2: "Iupi" });
});
app.post("/breno", (req, res) => {
    res.end("rota post");
});
app.listen();
