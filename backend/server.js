const express = require("express");
const cors = require("cors");

const videoRoutes = require("./routes/videoRoutes");
const downloadRoutes = require("./routes/downloadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Usar rotas organizadas
app.use("/video-info", videoRoutes);
app.use("/download", downloadRoutes);

const PORT = 5500;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
