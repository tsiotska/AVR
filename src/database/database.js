import mongoose from 'mongoose';
export const dbUrl = 'mongodb://localhost:27017/info';


export function setUpConnection(){
  mongoose.connect('mongodb+srv://big_siski:1111@cluster0-xtbl3.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true, useFindAndModify: false}).then(() => {
    console.log("DataBase is ready!");
  })
    .catch((err) => {
      console.log('Error on database: ' + err.stack);
      process.exit(1);
    });
}

export function closeDataBase() {
  mongoose.connection.close();
}
