import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import {Server} from 'http'

let server : Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string); //database connection
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

//handle unhandle rejection
//unhanldeRejection promise reject hole server k close korbe.
process.on('unhandledRejection',()=>{
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})


//handle uncaught exception
process.on('uncaughtException',()=>{
  process.exit(1);
})