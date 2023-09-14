const {zokou} = require('../framework/zokou');
const fs = require('fs');
const { fetchVideo } = require('@prevter/tiktok-scraper');
 const { writeFileSync } = require('fs');
const mumaker = require("mumaker");
const getFBInfo = require("@xaviabot/fb-downloader");

zokou({nomCom : "igdl" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('link please');return}; 

  try {
     const response = await mumaker.instagram(link)
  
  let choix = response[0]

    zk.sendMessage(dest,{video : {url : choix},caption : "*Smith-MD* Downloading",gifPlayback : false },{quoted : ms}) 
  } catch (e) {repondre("error \n " + e)}

  

  
});


zokou({
  nomCom: "fb,insta,tiktok",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Link please !');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.hd  }, caption: '*Smith-MD*Downloading' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre(error)});


   
  } catch (error) {
    console.error('Error :', error);
    repondre('Error.' , error);
  }
});



zokou({ nomCom: "tiktok", categorie: "Downloading", reaction: "▶️" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`commande use:\n ${prefixe}Link please`);
    return;
  }

  const videoUrl = arg.join(" ");
  mumaker.tiktok(videoUrl)
    .then((data) => {
      const thumbnail = data.thumbnail;
      const author = data.author;
      const description = data.description;
      const media = Array.isArray(data.media) ? data.media.join(", ") : data.media;
      const music = data.music;
      const like = data.like;
      const comment = data.comment;
      const share = data.share;

      // ✨✨⭐
      const caption = `
        Autor: ${author}
        Description: ${description}
        Média: ${media}
        Musique: ${music}
        like: ${like}
        Commentaire: ${comment}
        Partages: ${share}
      `;

      
      zk.sendMessage(dest, { image: { url: thumbnail }, caption: caption},{quoted : ms});

      // ✨⭐✨✊
      zk.sendMessage(dest, { video: { url: data.media } });

      // ✨⭐✨
      
    })
    .catch((err) => {
      console.error("Error :", err);
    });
});

zokou({
  nomCom: "fbdl2",
  categorie: "Downloading",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Link please!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.sd  }, caption: '*Smith-MD* Downloading' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre(error)});


   
  } catch (error) {
    console.error('Error:', error);
    repondre('Error link.' , error);
  }
});
