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
            ${data.vocabulary?.map(item => `
              <li>
                <b>${item.日文 || ""}</b>
                （${item.振り仮名 || "N/A"}）：${item.日文解釋 || ""}
                <br>例句（日文）：${item.例句（日文）|| "N/A"}
                <br>例句（中文）：${item.例句（中文）|| "N/A"}
                <br>新增日期：${item.新增日期 || "N/A"}
              </li>
            `).join('')}
          </ul>

          <h1>JLPT Grammar</h1>
          <ul>
            ${data.grammar?.map(item => `
              <li>
                <b>${item.文法 || ""}</b>：${item.意思 || ""}
                <br>用法：${item.用法 || "N/A"}
                <br>例句：${item.例句 || "N/A"}
                <br>新增日期：${item.新增日期 || "N/A"}
              </li>
            `).join('')}
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
