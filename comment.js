const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cliProgress = require('cli-progress');


async function commentFile(filePath, outputDir) {
    const code = fs.readFileSync(filePath, "utf-8");

    const prompt = `
Voici un fichier de code TypeScript ou JavaScript.
Ajoute des commentaires utiles et concis à toutes les fonctions, classes et méthodes.
Garde le code inchangé, seulement ajoute les commentaires en français.

---

${code}
`;

    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama3",
            prompt: prompt,
            stream: false,
        });

        const commentedCode = response.data.response;

        const filename = path.basename(filePath).replace(/(\.ts|\.js)$/, ".commented$1");
        const outputPath = path.join(outputDir, filename);

        fs.writeFileSync(outputPath, commentedCode);
        console.log(`✅ Fichier commenté : ${outputPath}`);
    } catch (error) {
        console.error("Erreur lors de l’appel à Ollama :", error.message);
    }
}

function getCodeFilesRecursive(dir) {
    let files = [];
    for (const item of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            files = files.concat(getCodeFilesRecursive(fullPath));
        } else if (fullPath.endsWith(".ts") || fullPath.endsWith(".js")) {
            files.push(fullPath);
        }
    }
    return files;
}

async function run() {
    const inputDir = process.argv[2];
    if (!inputDir || !fs.existsSync(inputDir)) {
        console.error("❌ Merci de fournir un dossier valide en argument !");
        process.exit(1);
    }

    const absInputDir = path.resolve(inputDir);
    const outputDir = path.resolve("./output");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = getCodeFilesRecursive(absInputDir);

    console.log(`🔍 ${files.length} fichier(s) trouvé(s) dans ${absInputDir}`);

    const progressBar = new cliProgress.SingleBar({
        format: '📄 {filename} | {bar} {percentage}% | {value}/{total}',
        barCompleteChar: '█',
        barIncompleteChar: '░',
        hideCursor: true
    }, cliProgress.Presets.shades_classic);

    progressBar.start(files.length, 0, { filename: '' });

    for (const file of files) {
        progressBar.update(progressBar.value, { filename: path.basename(file) });
        await commentFile(file, outputDir);
        progressBar.increment();
    }

    progressBar.stop();
    console.log("🎉 Tous les fichiers ont été traités !");
}

run();
