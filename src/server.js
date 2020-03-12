const app = require('./app')

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => console.log(`Listening on ${ port }`));

// app.listen(9999, () => {
//   console.log('Aplicação está rodando')
// })