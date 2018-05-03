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
      
      let heroId = req.params.id;

      db
        .collection('heroes')
        .findOneAndDelete({ id: heroId }, (err, result) => {
          if (err) throw err;
          context.res = {
            body: { message: 'Hero deleted successfully!' }
          };
          database.close();
          context.done();
        });
    }
  );
};
