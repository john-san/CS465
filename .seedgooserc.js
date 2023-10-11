module.exports = {
  modelBaseDirectory: './app_server/models',
  models: ["*.js", "!db.js"], // model matcher
  data: "data", // data directory
  db: "mongodb://127.0.0.1:27017/travlr", // db connection. use 127.0.0.1 instead of localhost: https://stackoverflow.com/questions/69840504/mongooseserverselectionerror-connect-econnrefused-127017
};