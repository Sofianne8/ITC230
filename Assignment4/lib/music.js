'use strict'

let songs = [
  {title: "Volcano", author: "Damien Rice", pubDate: 2002},
  {title: "Like A Stone", author: "AudioSlave", pubDate: 2002},
  {title: "Let's get it on", author: "Marvin Gaye", pubDate: 1973}
];

exports.get = (title) => {
  return songs.find((item) => {
    return item.title == title;
  });
};

exports.delete = (title) => {
  let oldLength = songs.length;
  var newSong = songs.filter((item) =>{
    return item.title !== title;
  });
  songs = newSong;

  return { deleted: oldLength != songs.length, total: songs.length};
};

exports.add = (newSong) => {
  let found = this.get(newSong.title);
  if (!found) {
    songs.push(newSong);
  }
  return {added: !found, total: songs.length };
};
