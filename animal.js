const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "animalController.html"));
});

app.post("/api/humor", (req, res) => {

    const {
        tutor,
        animal,
        especie,
        idade,
        comportamentos
    } = req.body;

    const pesos = {
        brincar: 1,
        inquietacao: -1,
        latir: -1,
        morder: -2,
        raiva: -2,
        prostacao: -2
    };

    let score = 0;

    comportamentos.forEach(comportamento => {
        score += pesos[comportamento] || 0;
    });

    let classificacao;

    if (score >= 1) {
        classificacao = "😊 Humor Positivo";
    } else if (score >= -2) {
        classificacao = "😐 Humor Neutro";
    } else {
        classificacao = "⚠️ Necessita Atenção";
    }

    res.json({
        tutor,
        animal,
        especie,
        idade,
        score,
        classificacao
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});