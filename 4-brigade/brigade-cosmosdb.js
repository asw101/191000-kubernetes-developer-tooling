// Updating a cosmosDB database
const { events, Job } = require("brigadier")

events.on("exec", (e, p) => {
  var mongo = new Job("update-db", "mongo:3.2")
  mongo.storage.enabled = false
  mongo.tasks = [
      dbCmd(p, `db.mydb.insert(${e.payload})`)
  ]
  mongo.run()
})

function dbCmd(p, script) {
  return `mongo ${p.secrets.cosmosName}.documents.azure.com:10255/test ` +
    `-u ${p.secrets.cosmosName} -p  ${p.secrets.cosmosKey} --ssl --sslAllowInvalidCertificates ` +
    `--eval '${script}'`
}
