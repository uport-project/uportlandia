const app = require("./server.shared");

app.listen(3000, err => {
  if(err)
    throw err;
  console.log("> Dev server listening on port 3000");
});
