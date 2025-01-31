const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

router.get("/", (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        console.error("❌ Nenhuma URL foi recebida!");
        return res.status(400).json({ error: "URL do YouTube é obrigatória" });
    }

    console.log(`🔍 Buscando informações do vídeo: ${videoUrl}`);

    exec(`yt-dlp -J ${videoUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error("🚨 Erro ao executar yt-dlp:", stderr);
            return res.status(500).json({ error: "Erro ao buscar informações do vídeo." });
        }

        try {
            const info = JSON.parse(stdout);
            console.log(`✅ Vídeo encontrado: ${info.title}`);

            let videoFormats = {};
            let audioFormats = [];

            // Filtra os formatos disponíveis
            info.formats.forEach(format => {
                const isVideo = format.vcodec !== "none";
                const isAudio = format.acodec !== "none";

                // FILTRO PARA VÍDEOS: Apenas MP4 (H.264), HTTPS e sem duplicatas de resolução
                if (isVideo && format.ext === "mp4" && format.vcodec.includes("avc1") && format.protocol === "https") {
                    if (!videoFormats[format.height]) { // Garante apenas uma opção por resolução
                        videoFormats[format.height] = {
                            itag: format.format_id,
                            resolution: `${format.height}p`,
                            mime_type: format.ext
                        };
                    }
                }

                // FILTRO PARA ÁUDIO: Apenas M4A ou WebM
                if (isAudio && (format.ext === "m4a" || format.ext === "webm")) {
                    audioFormats.push({
                        itag: format.format_id,
                        mime_type: format.ext
                    });
                }
            });

            res.json({
                title: info.title,
                thumbnail: info.thumbnail,
                formats: Object.values(videoFormats), // Converte o objeto de volta para array
                audio: audioFormats
            });

        } catch (err) {
            console.error("🚨 Erro ao processar JSON:", err.message);
            res.status(500).json({ error: "Erro ao processar dados do vídeo." });
        }
    });
});

module.exports = router;
