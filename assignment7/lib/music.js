let songs =[
	{artist:"Damien Rice", title: "Volcano", pubDate: "2002"},
  {artist:"Audio Slave", title: "Like A Stone", pubDate: "2002"},
  {artist:"Marvin Gaye", title: "Let's Get it On", pubDate: "1973"}

];
exports.getAll = () =>{
	return songs;
}
exports.get = (music) =>{
    return songs.find((item) =>{
        return item.artist == music;
    });
}
exports.add = (music) =>{
	let found = this.get(music.artist);
	if (!found) {
    songs.push(music);
	}
	return {added: !found, total: songs.length};
}
exports.delete = (music) =>{
    let oldLength = songs.length;
    let newSong= songs.filter((item) =>{
       return item.artist !== music;
    });
    songs = newSong;
    return {deleted: (oldLength !== songs.length), total: songs.length};
}
