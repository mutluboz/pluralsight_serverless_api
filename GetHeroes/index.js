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
      db
        .collection('heroes')
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          console.log('retrieved succesfully');
          result.forEach(hero => delete hero._id);
          context.res = {
            // status: 200,
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};
