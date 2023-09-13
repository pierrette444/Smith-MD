const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { ajouterGroupe ,getGroupe,ajouterAction,getAntibot,ajouterAntibot} = require("../bdd")
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require("fs-extra")



zokou({nomCom:"antibot",categorie:"Groupe"},async(dest,zk,commandeOptions)=>{

  let {repondre,arg,ms,prefixe,dev,superUser,verifAdmin,verifZokouAdmin,verifGroupe}=commandeOptions;

  if(!verifGroupe)
  {repondre("Groupe .");return;}
  const args = arg.join(" ");

  const demandeAntibot =async(f)=>
    {
      /*var txt ="https://replit.com/join/epezjbvype-murnoire"
      await zk.sendMessage(zk.user.id,{text:txt+"\n Smith-MD"});*/
      var resultat;
      var donnees = await getAntibot(f);
           for(var a=0;a<donnees.length;a++)
             {    
              // console.log("Les donnees "+JSON.stringify(donnees));
                if(donnees[a].groupejid===f){resultat=donnees[a].etat;}
                
             }
      return resultat;
    }

  var req=await demandeAntibot(dest);

              try{

                   if (!arg || arg == "") {
      repondre(`*Exemple : * ${prefixe}antibot true (antibot on) ou ${prefixe}antibot false (antibot off)`);return;
    }
                if(args==="oui")
                {
                  if(!dev){
                       if(!verifAdmin)
                   {
                         repondre("_I'am not admin please_ .");return;
                   }else{

                           if(!dev){
                                        if(verifZokouAdmin)
                                        {
                                          if(req=="true")
                                          {repondre("antibot on. "); return;}else{await addAntibot(dest,args);repondre("Antibot activated succeful✅ !")}
                                        }else{repondre("Sorry antibot off I'am note admin .")}
                           }else{

                                        if(req=="true")
                                          {repondre("Antibot on ."); return;}else{await addAntibot(dest,args);repondre("Antibot activated succeful✅ !")}
                           }
                   }}else{if(req=="true")
                                          {repondre("Antibot on brother . "); return;}else{await addAntibot(dest,args);repondre("Antibot activated succeful✅ !")}}
                }else if(args=="false")
                {
                     if(!dev)
                     {
                                       if(!verifAdmin)
                   {
                         repondre("Sorry I'am not admin.");return;
                   }else{

                           if(!dev){
                                        if(verifZokouAdmin)
                                        {
                                          if(req=="false")
                                          {repondre("Antibot off succeful✅ . "); return;}else{await addAntibot(dest,args);repondre("Antibot off succeful✅ !")}
                                        }else{repondre("I'am not admin .")}
                           }else{

                                        if(req=="false")
                                          {repondre("L'antibot on brother . "); return;}else{await addAntibot(dest,args);repondre("Antibot ativated succeful✅ !")}
                           }
                   }}else{if(req=="false")
                                          {repondre("Antibot off succeful✅. "); return;}else{await addAntibot(dest,args);repondre("Anti-bot désactivé avec succès !")}}
                }else if(args="état"||args=="etat")
                {
                      /*  req=="oui"?${repondre("*Etat anti-bot :* \n Antibot on succeful✅");return;}: req=="non"?${repondre("*Etat anti-bot :* \n Antibot off succeful✅");return;}:"";*/
                }
              //////////////////     
                
              }catch(e){}
  
})
