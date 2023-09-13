const axios = require("axios");
const {Smith} = require("../framework/zokou")

smith({
  nomCom: "anime",
  categorie: "Fun",
  reaction: "📺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://api.jikan.moe/v4/random/anime";

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url;
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;

    
    zk.sendMessage(origineMessage, { image: { url: imageUrl }, text: message }, { quoted: ms });
  } catch (error) {
    console.error('Error :', error);
    repondre('Error.');
  }
});
