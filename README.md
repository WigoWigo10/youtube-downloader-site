## **📌 YouTube Downloader**
Um aplicativo web para baixar vídeos e áudios do YouTube, utilizando **yt-dlp**, **FFmpeg**, **Node.js** e **Express.js**.

### **🛠️ Funcionalidades**
- ✅ Baixar vídeos do YouTube no formato **MP4 (H.264, via HTTPS)**.
- ✅ Baixar áudio nos formatos **M4A (AAC) ou WebM (Opus)**.
- ✅ Fundir **áudio e vídeo automaticamente** usando **FFmpeg**.
- ✅ Interface web amigável com **Tailwind CSS**.
- ✅ Backend desenvolvido em **Node.js e Express**.
- ✅ Filtragem para exibir apenas **uma unidade de resolução por opção** (sem repetições).
- ✅ Exibir **informações do vídeo** (título, thumbnail, opções de download).
- ✅ Registro detalhado de logs para **depuração**.

---

## **📋 Pré-requisitos**
Antes de rodar o projeto, instale os seguintes softwares:
- [Node.js](https://nodejs.org/) (LTS recomendado)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) (Para extrair informações e baixar vídeos)
- [FFmpeg](https://ffmpeg.org/) (Para combinar áudio e vídeo)

### **🔧 Como instalar yt-dlp e FFmpeg**
**No Windows** (via Scoop):
```sh
scoop install yt-dlp ffmpeg
```
**No Linux/macOS**:
```sh
sudo apt install yt-dlp ffmpeg  # Debian/Ubuntu
brew install yt-dlp ffmpeg      # macOS (via Homebrew)
```

---

## **🚀 Como rodar o projeto**
1. **Clone este repositório**:
   ```sh
   git clone https://github.com/seu-usuario/youtube-downloader-site.git
   cd youtube-downloader-site
   ```

2. **Instale as dependências**:
   ```sh
   yarn install  # Se estiver usando Yarn
   # ou
   npm install   # Se estiver usando NPM
   ```

3. **Inicie o servidor backend**:
   ```sh
   node backend/server.js
   ```

4. **Abra o frontend**:
   ```sh
   cd frontend
   live-server  # ou abra index.html no navegador
   ```

---

## **🖥️ Estrutura do Projeto**
```
📂 youtube-downloader-site
│── 📂 backend          # Servidor Express.js
│   │── 📂 routes       # Rotas organizadas
│   │   ├── videoRoutes.js      # Rota para obter informações do vídeo
│   │   ├── downloadRoutes.js   # Rota para download do vídeo/áudio
│   │── server.js       # Servidor principal
│── 📂 frontend         # Interface Web
│   │── index.html      # Página inicial
│   │── style.css       # Estilos com Tailwind CSS
│   │── script.js       # Lógica do frontend
│── package.json        # Dependências do projeto
│── README.md           # Este arquivo
```

---

## **📝 Como funciona**
### **🔍 Obtenção das Informações do Vídeo**
- O usuário insere a URL do vídeo no frontend.
- O backend (Node.js + yt-dlp) busca os **formatos disponíveis** e filtra apenas:
  - **Vídeos**: MP4 (H.264) via HTTPS.
  - **Áudios**: M4A (AAC) ou WebM (Opus).
  - Apenas **uma resolução de cada opção** é mostrada.

### **⬇️ Download e Fusão de Áudio e Vídeo**
- O usuário escolhe a resolução e inicia o download.
- O backend baixa **separadamente** o vídeo e o áudio.
- O FFmpeg **funde** os dois arquivos em um único **MP4**.
- O arquivo final é enviado para o usuário.

---

## **⚠️ Problemas Conhecidos**
- 🔸 Algumas resoluções podem não estar disponíveis para certos vídeos.
- 🔸 O FFmpeg precisa estar corretamente configurado no sistema.
- 🔸 No Windows, pode ser necessário adicionar `yt-dlp` e `ffmpeg` ao **Path**.

---

## **📜 Licença**
Este projeto é de código aberto e está disponível sob a licença **MIT**.