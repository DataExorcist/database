import { writeFile } from "fs/promises";

async function makeJSON(URL, name) {
    await fetch(URL)
        .then(response => response.text())
        .then(async text => {
            await writeFile(`database/CSV/${name}.csv`, text);
            const entries = text.replace(/["]/g, '').split("\n");
            const headers = entries[0].split(",");
            const finalJSON = [];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i].split(",");
                if (entry.length === headers.length) {
                    const data = {};
                    for (let j = 0; j < headers.length; j++) {
                        data[headers[j]] = entry[j];
                    }
                    finalJSON.push(data);
                }
            }
            await writeFile(`database/JSON/${name}.json`, JSON.stringify(finalJSON));
        });
}

await makeJSON("https://privacyrights.org/data-brokers/export?page&_format=csv", "brokers");