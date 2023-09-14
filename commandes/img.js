const {zokou} = require('../framework/zokou');
const gis = require('async-g-i-s');

zokou({
  nomCom: "img",
  categorie: "Download",
  reaction: "📷"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('name image please !');
    return;
  }

  const searchTerm = arg.join(" ");

  try {
    const results = await gis(searchTerm);

    // Envoyer les 5 premières images trouvées
    for (let i = 0; i < 5; i++) {
      zk.sendMessage(dest, { image: { url: results[i].url } }, { quoted: ms });
    }
  } catch (error) {
    console.error('Error images :', error);
    repondre('Error images.',error);
  }
});
