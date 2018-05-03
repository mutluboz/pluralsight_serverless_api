const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function(context, req) {
  context.log('Http trigger function processed a request');
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      console.log('Connected successfully');
      const db = database.db(process.env.CosmosDB);

      let hero = ({ id, name, saying } = req.body);

      db.collection('heroes').insertOne(
        {
          id: hero.id,
          name: hero.name,
          saying: hero.saying
        },
        (err, result) => {
          if (err) throw err;
          context.res = {
            body: hero
          };
          database.close();
          context.done();
        }
      );
    }
  );
};
