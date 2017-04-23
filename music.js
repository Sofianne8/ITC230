'use strict'
let songs = [
  {title: "Volcano", author: "Damien Rice", pubDate: 2002},
  {title: "Like A Stone", author: "AudioSlave", pubDate: 2002},
  {title: "Let's get it on", author: "Marvin Gaye", pubDate: 1973}
];


exports.delete = (title) => {
  let oldLength = songs.length;
  let newSongs = songs.filter((item) => {
    return item.title !== title;
  });

  songs = newSongs;
  return {
    deleted: songs.length !== oldLength,
    total: songs.length,
    Song: songs
  }
};
exports.get = (title) => {
  return songs.find((item) => {
    return item.title === title;
  });
};
