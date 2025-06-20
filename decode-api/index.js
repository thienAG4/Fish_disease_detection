const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/decode", (req, res) => {
  const { base64 } = req.body;
  if (!base64) {
    return res.status(400).send("No base64 data provided.");
  }

  const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(cleanBase64, "base64");

  res.set("Content-Type", "image/png");
  return res.send(buffer);
});

app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
