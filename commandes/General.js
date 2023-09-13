const { zokou } = require("../framework/zokou");
const conf = require("../set");

zokou({ nomCom: "proprio", categorie: "Général", reaction: "💞" }, async (dest, SMITH, commandeOptions) => {
    const { ms } = commandeOptions;
    const vcard =
        'BEGIN:VCARD\n' + // metadata of the contact card
        'VERSION:3.0\n' +
        'FN:' + conf.NOM_OWNER + '\n' + // full name
        'ORG:undefined;\n' + // the organization of the contact
        'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
        'END:VCARD';
    Smith.sendMessage(dest, {
        contacts: {
            displayName: conf.NOM_OWNER,
            contacts: [{ vcard }],
        },
    },{quoted:ms});
});

zokou({ nomCom: "dev", categorie: "Général", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms } = commandeOptions;

    const devs = [
      { nom: "Denzo", numero: "244935469526" },
 
    ];

    let message =" Hello brother ✨! Développeurs name :\n\n";
    for (const dev of devs) {
      message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }

    await zk.sendMessage(dest, { image : {url : conf.IMAGE_MENU} ,caption: message  }, { quoted: ms });

});

zokou({ nomCom: "support", categorie: "Général" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("DM BROTHER ")
  await zk.sendMessage(auteurMessage,{text : `https://chat.whatsapp.com/JFNXyoRTf4t6e9GTaM2Oe6`},{quoted :ms})

})

