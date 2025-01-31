const express = require("express");
const { exec } = require("child_process");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "URL do YouTube é obrigatória" });
    }

    console.log(`📥 Iniciando download do vídeo: ${videoUrl}`);

    // Define os arquivos temporários
    const videoFile = "video.mp4";
    const audioFile = "audio.m4a";
    const outputFile = "output.mp4";

    // Comandos para baixar vídeo e áudio
    const videoCommand = `yt-dlp -f 137 -o ${videoFile} ${videoUrl}`;
    const audioCommand = `yt-dlp -f 140 -o ${audioFile} ${videoUrl}`;
    const mergeCommand = `ffmpeg -i ${videoFile} -i ${audioFile} -c:v copy -c:a aac -strict experimental ${outputFile}`;

    // Executa o download do vídeo
    exec(videoCommand, (videoError) => {
        if (videoError) {
            console.error("🚨 Erro ao baixar vídeo:", videoError);
            return res.status(500).json({ error: "Erro ao baixar vídeo." });
        }

        console.log("✅ Vídeo baixado com sucesso.");

        // Executa o download do áudio
        exec(audioCommand, (audioError) => {
            if (audioError) {
                console.error("🚨 Erro ao baixar áudio:", audioError);
                return res.status(500).json({ error: "Erro ao baixar áudio." });
            }

            console.log("✅ Áudio baixado com sucesso.");

            // Junta o áudio e o vídeo
            exec(mergeCommand, (mergeError) => {
                if (mergeError) {
                    console.error("🚨 Erro ao fundir áudio e vídeo:", mergeError);
                    return res.status(500).json({ error: "Erro ao fundir áudio e vídeo." });
                }

                console.log("🎬 Vídeo finalizado com sucesso!");

                // Enviar o arquivo final
                res.download(outputFile, "video_final.mp4", (err) => {
                    if (err) console.error("Erro ao enviar arquivo:", err);

                    // Remover arquivos temporários após o envio
                    fs.unlinkSync(videoFile);
                    fs.unlinkSync(audioFile);
                    fs.unlinkSync(outputFile);
                });
            });
        });
    });
});

module.exports = router;
