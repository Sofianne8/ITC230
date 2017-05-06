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
    let newSong = songs.filter((item) =>{
    return item.title !== title;
    });
    songs = newSong;
    
    return { deleted: title, total: songs.length};
};


exports.add = (newSong) => {
    let found = this.get(newSong.title);
    let newItem = [];
    newItem ["song"] = newSong;
    if (!found) {
        songs.push(newItem);
    }
    let action = (found) ? newSong + " updated" : newSong + " added";
    return {"action": action, "total": songs.length };
};
