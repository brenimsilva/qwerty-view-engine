import QWERTYServer from "./src/Server/QWERTYServer.js";

const app = new QWERTYServer(3001, "localhost");
app.get("/breno", (req,res) => {
    res.render("file", {title: "Oi", varteste: "Segundo teste", teste2: "Iupi"});
    // res.end("<h1>Seu nome</h1>")
})
app.post("/breno", (req,res) => {
    res.end("rota post");
})
app.listen();