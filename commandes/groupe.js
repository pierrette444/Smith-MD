

const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { ajouterGroupe ,getGroupe,ajouterAction} = require("../bdd/groupe")
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require("fs-extra");
const conf = require("../set");
  const { uploadImageToImgur } = require('../framework/imgur');




zokou({ nomCom: "tagall", categorie: "Groupe", reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("Owner commande ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'no msage'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; let car = `──────▄▌▐▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▌\n───▄▄██▌█ Yo brother\n▄▄▄▌▐██▌█ Beste life\n███████▌█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌\n▀(⊙)▀▀▀▀▀▀▀(⊙)(⊙)▀▀▀▀▀▀▀▀▀▀(⊙)▀▀`

  tag += `========================\n  
        ✨ *Smith-MD* ✨
========================\n
🌍 Groupe : ${nomGroupe} 🚀 
🗣️ Auteur : *${nomAuteurMessage}* 👋 
📋 Message : *${mess}* 📝
========================\n
\n

` ;




  let emoji = ['✅', '👀', '🥰', '⭐', '✔️', '😇', '⚙️', '💻', '🎊', '😡', '✊', '❌', '$','😟','🥵','🐅']
  let random = Math.floor(Math.random() * (emoji.length - 1))


  for (const membre of membresGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`
  }

 
 if (verifAdmin || superUser) {

  Smith.sendMessage(dest, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms })

   } else { repondre('Admin commande')}

});


zokou({ nomCom: "link", categorie: "Groupe", reaction: "🙋" }, async (dest, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;
  if (!verifGroupe) { repondre("wait bro , tu veux le lien de mon dm?"); return; };


  var link = await zk.groupInviteCode(dest)
  var lien = `https://chat.whatsapp.com/${link}`;

  let mess = `Hi ${nomAuteurMessage} , Greoupe link ${nomGroupe} \n

Link :${link}`
  repondre(mess)


});
/** *admin membre*/
zokou({ nomCom: "promote", categorie: "Groupe", reaction: "✨" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("groupe commande"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(Smithadmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              var txt = `🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} membre admin groupe.\n
                      Promote detected.`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              Smith.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            } else { return repondre("✨.") }

          } else { return repondre("No membre of groupe ."); }
        }
        else { return repondre("I'am not admin.") }

      } else { repondre("tag number promote"); }
    } else { return repondre("I'am not admin.") }
  } catch (e) { repondre("oups " + e) }

})

//fin nommer
/** ***demettre */

zokou({ nomCom: "demote", categorie: "Groupe", reaction: "✨" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("admin commande"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {

              repondre("No longer admin")

            } else {
              var txt = `@${auteurMsgRepondu.split("@")[0]} No longer admin..\n`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
              Smith.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            }

          } else { return repondre("no participe of groupe ."); }
        }
        else { return repondre("I'am not admin .") }

      } else { repondre("tag member demote"); }
    } else { return repondre("I'am not admin .") }
  } catch (e) { repondre("oups " + e) }

})



/** ***kick****  **/
/** **kick** */
zokou({ nomCom: "kick", categorie: "Groupe", reaction: "⚡" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("Groupe commande"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(SmithAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              const gifLink = "https://raw.githubusercontent.com/pierrette444/Smith-MD/main/media/remover.gif"
              var sticker = new Sticker(gifLink, {
                pack: 'Smith-MD', // The pack name
                author: nomAuteurMessage, // The author name
                type: StickerTypes.FULL, // The sticker type
                categories: ['🤩', '🎉'], // The sticker category
                id: '12345', // The sticker id
                quality: 50, // The quality of the output file
                background: '#000000'
              });

              await sticker.toFile("st.webp")
              var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
            /*  zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: ms.message.extendedTextMessage.contextInfo.stanzaId})*/
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })

            } else { repondre("admin member .") }

          } else { return repondre("No membre of groupe ."); }
        }
        else { return repondre("I'am not admin.") }

      } else { repondre("tag the number kicke"); }
    } else { return repondre("I'am not admin.") }
  } catch (e) { repondre("oups " + e) }

})


/** *****dlt */


zokou({ nomCom: "dlt", categorie: "Groupe",reaction:"🧹" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe,auteurMsgRepondu,idBot, msgRepondu, verifAdmin, superUser, auteurMessage ,verifZokouAdmin} = commandeOptions;
  
  if (!msgRepondu) {
    repondre("mention msge delete");
    return;
  }
  if(superUser)
  {
    
       if(auteurMsgRepondu==idBot)
       {
         const key={
            remoteJid:dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
       }
      else if(auteurMsgRepondu!=idBot && !verifGroupe)
       {
             try{
                        
            const key={
            remoteJid:dest,
      fromMe: false,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
             }catch(erreur){repondre("error "+e)}
       }
  }

          if(verifGroupe)
          {
               if(verifAdmin || superUser)
               {
                    if(verifZokouAdmin)
                    {
                         try{
                        
            const key={
            remoteJid:dest,
      fromMe: false,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
             }catch(erreur){repondre("error "+e)}
                    }
                      
               }else{repondre("I'am not admin.")}
          }
});

zokou({ nomCom: "info", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, verifZokouAdmin } = commandeOptions;
  if (!verifGroupe) { repondre("commande réservée au groupe uniquement"); return };

 try { ppgroup = await Smith.profilePictureUrl(dest ,'image') ; } catch { ppgroup = conf.IMAGE_MENU}

    const info = await Smith.groupMetadata(dest)

    /*console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)*/


    let mess = {
      image: { url: ppgroup },
      caption:  `*━━━━『Info groupe』━━━━*\n\n*🎐Nom:* ${info.subject}\n\n*🔩ID Groupe:* ${dest}\n\n*🔍Desc:* \n\n${info.desc}`
    }


    Smith.sendMessage(dest, mess, { quoted: ms })
  })




zokou({ nomCom: "antilik", categorie: "Groupe", reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { ms, repondre, arg, verifGroupe, auteurMessage, superUser, verifZokouAdmin, verifAdmin,prefixe, dev } = commandeOptions;
  var b = arg.join(" ")
  console.log(b)
  const requeteAntilien=async(from)=>
    {
      var result;
      var tabGr=await getGroupe(dest)
        for(var i=0;i<tabGr.length;i++)
          {
            if(tabGr[i].id===from)
            {
              result=tabGr[i].antilink;
            }
          }
      return result;
    }
  if (!verifGroupe) {
    return repondre("*Groupe commande*");
  }
  try {
    if (!arg || arg == "") {
      repondre(`*Exemple : * ${prefixe}antilink true (antilink activated) ⚡ ${prefixe}antilink false (antlink off )`);return;
    }

    if (b == "true") {
      if (!dev) {
        if (!verifAdmin) { repondre("I'am note admin."); return; }
        // antilink(dest,b);
        //repondre("antilink activated succeful✅!")
        if (verifZokouAdmin) {
      if(await requeteAntilien(dest)==="true"){
          repondre("antilink activated.");return
        }
          ajouterGroupe(dest, b);
          repondre("antilink activated succeful✅!")
        } else { repondre("I'am not admin .") }
      } else {
        if(await requeteAntilien(dest)==="true"){
          repondre("antilink activated bro.");return
        }
        ajouterGroupe(dest, b);
        repondre("antilink activated succeful✅!")

      }

    } else if (b == "false") {
      let req = await getGroupe(dest);
      if (!dev) {

        if (!verifAdmin) { repondre("I'am not admin "); return; }

        
            if(await requeteAntilien(dest)=="false"){
          repondre("antilink desactivated");return
        }  
              
            
        ajouterGroupe(dest, b);
        repondre("antilink desactivated succefful✅!")
        /*  if(verifZokouAdmin)
          {
            
            antilink(dest);
            repondre("antilink activated succeful✅!")
          }else{repondre("I'am not admin.")}*/
      } else {
          if(await requeteAntilien(dest)=="false"){
          repondre("antilink desactivated.");return
        }
        ajouterGroupe(dest, b);
        repondre("antilink désactivated succeful✅!")

      }
    }
  /** ******état antilink  */
    if(b==="état"||b==="etat")
    {
    //  console.log("at req "+await requeteAntilien(dest))
          if(await requeteAntilien(dest)==="true"){
          repondre(" *état antilink :*\n antilink activated bruh.");return
        } else if(await requeteAntilien(dest)==="false"){
          repondre("*état antilink :*\n antilink desactivated.");return
        }
    }
/** ********fin etat  */
  } catch (e) { }

});

zokou({ nomCom: "groupe", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, arg } = commandeOptions;

  if (!verifGroupe) { repondre("admin commande"); return };
  if (!superUser || !verifAdmin) {
    repondre("admin commande");
    return;
  }
  if (!arg[0]) { repondre('Consigne :\n\nmute closed '); return; }
  const option = arg.join(' ')
  switch (option) {
    case "unmute":
      await Smith.groupSettingUpdate(dest, 'important msage')
      repondre('Groupe open succeful✅')
      break;
    case "mute":
      await Smith.groupSettingUpdate(dest, 'important msage');
      repondre('Groupe closed succeful✅');
      break;
    default: repondre("⛔⛔✋⛔⛔")
  }

});

zokou({ nomCom: "bye", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
  if (!verifGroupe) { repondre("groupe commande"); return };
  if (!superUser) {
    repondre("Owner commande");
    return;
  }
   repondre('sayonnara') ;
  await Smith.groupLeave(dest)
});

zokou({ nomCom: "gname", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("admin commande");
    return;
  };
  if (!arg[0]) {
    repondre("name goupe");
    return;
  };
   const nom = arg.join(' ')
  await Smith.groupUpdateSubject(dest, nom);
    repondre(`New name groupe on: *${nom}*`)

 
}) ;

zokou({ nomCom: "gdesc", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("admin commande");
    return;
  };
  if (!arg[0]) {
    repondre("✍️✍️✍️ New description");
    return;
  };
   const nom = arg.join(' ')
  await Smith.groupUpdateDescription(dest, nom);
    repondre(`New description on: *${nom}*`)

 
}) ;


zokou({ nomCom: "gpp", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("groupe commande");
    return;
  }; 
  if (msgRepondu.imageMessage) {
    const pp = await  Smith.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;

    await Smith.updateProfilePicture(dest, { url: pp })
                .then( res => {
                    Smith.sendMessage(dest,{text:"Group pfp changed"})
                    fs.unlinkSync(pp)
                }).catch(() =>   Smith.sendMessage(dest,{text:err})
)
        
  } else {
    repondre('Select img please')
  }

});

/////////////
zokou({nomCom:"tag",categorie:"Groupe",reaction:"🎤"},async(dest,zk,commandeOptions)=>{


const {ms,repondre,msgRepondu,verifGroupe,prefixe,arg}=commandeOptions;


if(!verifGroupe){return repondre("groupe commande");}

const infoGroupe=verifGroupe?await Smith.groupMetadata(dest).catch((e)=>{console.log(e);}):"";


const membres =verifGroupe?infoGroupe.participants:{}

if(!msgRepondu && !arg.join(" "))
{
 // return repondre(`${prefixe}annonce Hello !`);
  const txt =`${prefixe}Hello !`
  await Smith.sendMessage(dest,{text:txt})
}

try{

           /*const isTextRpd=msgRepondu.extendedTextMessage?.text?true:false;

const textRpd =isTextRpd?msgRepondu.extendedTextMessage?.text:"";

const isVideoRpd =msgRepondu.videoMessage?true:false;
const videoRpd =isVideoRpd?await Smith.downloadAndSaveMediaMessage(msgRepondu.videoMessage):null;


const titreVid =isVideoRpd?msgRepondu.videoMessage.caption:"";


const isImgRpd=msgRepondu.imageMessage?true:false;

const imgRpd=isImgRpd?await Smith.downloadAndSaveMediaMessage(msgRepondu.imageMessage):null;

const titreImg=isImgRpd?msgRepondu.imageMessag.caption:"";*/

         if(msgRepondu)
            {

    /** *********^^^^^^^^^^^^/ *///////////////////////////////////////////
             
           const isTextRpd=msgRepondu.extendedTextMessage?.text?true:false;

const textRpd =isTextRpd?msgRepondu.extendedTextMessage?.text:"";

const isVideoRpd =msgRepondu.videoMessage?true:false;
const videoRpd =isVideoRpd?await Smith.downloadAndSaveMediaMessage(msgRepondu.videoMessage):null;


const titreVid =isVideoRpd?msgRepondu.videoMessage.caption:"";


const isImgRpd=msgRepondu.imageMessage?true:false;

const imgRpd=isImgRpd?await Smith.downloadAndSaveMediaMessage(msgRepondu.imageMessage):null;

const titreImg=isImgRpd?msgRepondu.imageMessage.caption:"";
              
      ////////////        

              

              
if(isImgRpd)
                  { 
                     await Smith.sendMessage(dest,{image:{url:imgRpd},caption:titreImg,mentions:membres.map((i)=>i.id)},{quoted:ms})
                   }else    if(isVideoRpd)
{
     await Smith.sendMessage(dest,   {video:  {url:videoRpd},caption:titreVid,mentions:membres.map((i)=>i.id)},{quoted:ms})  
}else if(isTextRpd)
{ 

  /*repondre(msgRepondu.extendedTextMessage?.text)*/
  
   await Smith.sendMessage(dest,{text:textRpd,mentions:membres.map((i)=>i.id)})
}
            


}else if(arg.join(" "))
{ 
    const txt =arg.join(" ")
      await Smith.sendMessage(dest,{text:txt,mentions:membres.map((i)=>i.id)})
} else { repondre("tag msage please") }


}catch(e){return repondre("error : "+e);}


})
/******/
