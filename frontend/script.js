document.getElementById("check-url").addEventListener("click", async () => {
    const videoUrl = document.getElementById("youtube-url").value;
    const videoInfoDiv = document.getElementById("video-info");

    console.log(`🔍 Iniciando verificação do vídeo: ${videoUrl}`);

    if (!videoUrl) {
        console.warn("⚠️ Nenhuma URL foi inserida.");
        alert("Por favor, insira um link válido do YouTube.");
        return;
    }

    try {
        console.log(`📡 Enviando requisição para: http://127.0.0.1:5500/video-info?url=${encodeURIComponent(videoUrl)}`);

        // Faz a requisição para obter informações do vídeo
        const response = await fetch(`http://127.0.0.1:5500/video-info?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        console.log("📩 Resposta recebida:", data);

        if (data.error) {
            console.error("🚨 Erro ao buscar informações do vídeo:", data.error);
            alert("Erro ao buscar informações do vídeo.");
            return;
        }

        // Atualiza as informações do vídeo
        document.getElementById("video-thumbnail").src = data.thumbnail;
        document.getElementById("video-title").textContent = data.title;
        console.log(`✅ Vídeo encontrado: ${data.title}`);
        console.log(`🖼️ Thumbnail: ${data.thumbnail}`);

        // Preenche as opções de qualidade de vídeo (sem duplicatas)
        const videoQualitySelect = document.getElementById("video-quality");
        videoQualitySelect.innerHTML = data.formats
            .map(format => `<option value="${format.itag}">${format.resolution}</option>`)
            .join("");

        console.log("🎥 Opções de vídeo disponíveis:", videoQualitySelect.innerHTML);

        // Preenche as opções de formato de áudio (apenas M4A ou WebM)
        const audioFormatSelect = document.getElementById("audio-format");
        audioFormatSelect.innerHTML = data.audio
            .map(format => `<option value="${format.itag}">${format.mime_type}</option>`)
            .join("");

        console.log("🎵 Opções de áudio disponíveis:", audioFormatSelect.innerHTML);

        // Exibe as informações do vídeo
        videoInfoDiv.classList.remove("hidden");
        console.log("📺 Exibindo informações do vídeo.");
    } catch (err) {
        console.error("🚨 Erro ao obter informações do vídeo:", err);
        alert("Erro ao processar a URL. Tente novamente.");
    }
});
