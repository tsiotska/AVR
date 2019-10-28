import mongoose from 'mongoose';
import '../schemes/authorScheme';

const author = mongoose.model('authorScheme');

export function getAuthorList() {
  return author.find({name: "Vitaliy"});
}

export function createAuthor(req) {
  console.log(req.body);
  const Author = new author({
    name: req.body.name,
    surname: req.body.surname,
    about: req.body.about,
    createdAt: new Date()
  });
  return Author.save();
}

export function deleteAuthor(req){
  return author.delete(req.body);
}

