export default async function handler(req, res) {
  const apiUrl = "https://script.google.com/macros/s/AKfycbwre6DoTf2_wO_fkKN1ImYhzSRL9x1GSUqSaZP0jhG3CbFeQ7n9f_PjE-S_yiqc_04/exec";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const html = `
      <html>
        <head><meta charset="UTF-8"><title>JLPT Data Proxy</title></head>
        <body>
          <h1>JLPT Vocabulary</h1>
          <ul>
            ${data.vocabulary.map(item => `<li><b>${item.日文}</b>（${item.振り仮名}）：${item.日文解釋}</li>`).join('')}
          </ul>

          <h1>JLPT Grammar</h1>
          <ul>
            ${data.grammar.map(item => `<li><b>${item.文法}</b>：${item.意思}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
}

