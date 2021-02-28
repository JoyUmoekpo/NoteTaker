const path = require("path")

module.exports = function(app) {
    app.get("/api/notes", (req, res) => {
        let content = fs.readFile("../db/db.json", "utf8");
            res.json(content);
    });

    app.post("api/notes", (req, res) => {
        indexCode.push(req.body);
        res.json(indexCode);
    });

    app.post("/api/notes/:id", (req, res) => {
    })
};