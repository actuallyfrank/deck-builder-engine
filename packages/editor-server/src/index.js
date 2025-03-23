const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const fs = require("fs");
  const data = { message: "Hello World!" };
  fs.writeFileSync("output.json", JSON.stringify(data, null, 2));
  res.send("JSON file has been written!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
