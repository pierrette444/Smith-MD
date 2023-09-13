const { Smith } = require('../framework/Smith');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const conf = require("../set");
const sleep =  (ms) =>{
  return new Promise((resolve) =>{ setTimeout (resolve, ms)})
  
  } ;

zokou({ nomCom: "tgs", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Owner Commande'); return;
  }
  const apikey = conf.APILOLHUMAIN

  if (apikey === null || apikey === 'null') { repondre('Humm bro link no valide'); return; };

  if (!arg[0]) {
    repondre("stikers link please ");
    return;
  }

  let lien = arg.join(' ');

  let api = 'https://api.lolhuman.xyz/api/telestick?apikey=' + apikey + '&url=' + link;

  try {
    const response = await axios.get(api);
    const img = response.data.result.sticker;

    for (let i = 0; i < img.length; i++) {
      const sticker = new Sticker(img[i], {
        pack: nomAuteurMessage,
        author: "Smith-MD",
        type: StickerTypes.FULL,
        categories: ['✨', '🥰'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer();

      await SMITH.sendMessage(
        dest,
        {
          sticker: stickerBuffer,
        },
        { quoted: ms }
      );
    }
  } catch (e) {
    repondre("error \n", e);
  }
});

Smith({ nomCom: "crew", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage, superUser, auteurMsgRepondu, msgRepondu } = commandeOptions;

  if (!superUser) { repondre("private option "); return };

  if (!arg[0]) { repondre('name groupe '); return };
  if (!msgRepondu) { repondre('mention member added '); return; }

  const name = arg.join(" ")

  const group = await zk.groupCreate(name, [auteurMessage, auteurMsgRepondu])
  console.log("created group with id: " + group.gid)
  zk.sendMessage(group.id, { text: `Welcome to ${name}` })

});

zokou({ nomCom: "bye", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
  if (!verifGroupe) { repondre("commande groupe"); return };
  if (!superUser) {
    repondre("commande reservée au propriétaire");
    return;
  }

  await SMITH.groupLeave(dest)
});

zokou({ nomCom: "rejoindre", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!superUser) {
    repondre("commande Owner");
    return;
  }
  let result = arg[0].split('https://chat.whatsapp.com/')[1] ;
 await zk.groupAcceptInvite(result) ;
  
      repondre(`Succes`).catch((e)=>{
  repondre('Error')
})

})


Smith({ nomCom: "jid", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande Owner");
    return;
  }
              if(!msgRepondu) {
                jid = dest
              } else {
                jid = auteurMsgRepondu
              } ;
   zk.sendMessage(dest,{text : jid },{quoted:ms});

        }) ;

  zokou({ nomCom: "envoi", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

       if (!superUser) {
    repondre("commande Owner");
    return;
  } 
    
   if (!msgRepondu) {
    repondre("mention msge please ");
    return; };
     if (!arg[0]) {
    repondre('jid number');
    return; } ;

   const jid = arg.join(' ')
     

    /*const msg = getMessageFromStore(auteurMsgRepondu, msgRepondu) */
await zk.sendMessage( jid, { forward: msgRepondu }) // WA forward the message!

  })
;

zokou({ nomCom: "block", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande OWNER");
    return;
  }
             
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('mention number blocked'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes'))   } ;

  });

zokou({ nomCom: "deblock", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande OWner");
    return;
  }
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('mention number no block'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes'))   } ;
  
    });

zokou({ nomCom: "purge", categorie: "Groupe", reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { auteurMessage ,ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser,prefixe } = commandeOptions

  const metadata = await zk.groupMetadata(dest) ;
 

  if (!verifGroupe) { repondre(" groupe commande 😇"); return; }
  if (superUser || auteurMessage == metadata.owner) { 
  
   repondre('5s ') ;
   await sleep(5000)
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
try {
  let users = membresGroupe.filter((member) => !member.admin)

  for (const membre of users) {

    

   
    
await zk.groupParticipantsUpdate(
        dest, 
        [membre.id],
        "remove" 
    ) 
    await sleep(500)
    
  }  
} catch (e) {repondre("admin groupe approuve")} } else {
  repondre("Commande Owner"); return
}
});
