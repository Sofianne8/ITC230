let expect = require("chai").expect;
let music = require("../lib/music");

describe("music module", () => {
 it("get returns requested song", function() {
   let result = music.get("Volcano");
   expect(result).to.deep.equal({title: "Volcano", author:"Damien Rice", pubDate:2002});
 });
 
 it("get fails w/ invalid song", () => {
   let result = music.get("WrongSong");
   expect(result).to.be.undefined;
 });
});

describe("music module", () => {
 it("deletes requested song", function() {
   let result = music.delete("Volcano");
   expect(result.deleted).to.be.true;
  });
 it("delete fails w/ invalid song", () => {
   let result = music.delete("WrongName");
   expect(result.deleted).to.be.false;
 });
});

describe("music module", () => {
 it("adds requested song", function() {
   let result = music.add({title: "Volcano", author:"Damien Rice", pubDate:2002});
   expect(result.added).to.be.true;
 });
 
 it("add fails w/ existing song", () => {
   let result = music.add({title: "Volcano", author:"Damien Rice", pubDate:2002});
   //console.log(result);
     expect(result.added).to.be.false;
 });
});


