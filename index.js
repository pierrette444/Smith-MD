" strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileyls_1 = __importStar(require("@sampandey001/baileys"));
const logger_1 = __importDefault(require("@sampandey001/baileys/lib/Utils/logger"));
const logger = lomgger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");m
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
//import chalk from 'chalk'
const { getGroupe, getAntibot, addAntibot } = require("./bdd");
const { ajouterGroupe } = require("./bdd/groupe");
let evt = require(__dirname + "/framework/zokou");
//const //{loadCmd}=require("/framework/mesfonctions")
let { reagir } = require(__dirname + "/framework/app");
var session = conf.session;
const prefixe = conf.PREFIXE;
var lienPaste = 'https://paste.c-net.org/';
if (session != '') {
    var priseSession = session.replace(SMITH/gi, "");
    //console.log(priseSession)
    //console.log('https://paste.c-net.org/' + priseSession)}
    /* console.log(chalk.green("Smith-Md"))*/
}
async function authentification() {
    try {
        let { data } = await axios.get(lienPaste + priseSession);
        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/auth/creds.json")) {
            console.log("connexion en cour ...");
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(data), "utf8");
            //console.log(session)
        }
        else if (fs.existsSync(__dirname + "/auth/creds.json")) {
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(data), "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalide ");
        return;
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
setTimeout(() => {
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/auth");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['Smith-Md', "safari", "1.0.0"],
            printQRInTerminal: true,
            /* auth: state*/ auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            //////////
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg.message || undefined;
                }
                return {
                    conversation: 'An Error Occurred, Repeat Command!'
                };
            }
            ///////
        };
        const SM = (0, baileys_1.default)(sockOptions);
        store.bind(zk.ev);
        setInterval(() => { store.writeToFile("stor.json"); }, 3000);
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message)
                return;
            const decodeJid = (jid) => {
                if (!jid)
                    return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                }
                else
                    return jid;
            };
            var mtype = (0, baileys_1.getContentType)(ms.message);
            var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ?
                ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ?
                ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ?
                (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";
            var origineMessage = ms.key.remoteJid;
            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split('@')[0];
            /* const Denzo='244935469526';
             const Black='242068510698'*/
            /*  var superUser=[servBot,Denzo,Black].map((s)=>s.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);
              var dev =[dj,dj2,luffy].map((t)=>t.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);*/
            const checkthegroup = origineMessage?.endsWith("@g.us");
            var infosGroupe = check the group ? await SMITH.groupMetadata(origineMessage) : "";
            var nameGroupe = check the group ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
            //ms.message.extendedTextMessage?.contextInfo?.mentionedJid
            // ms.message.extendedTextMessage?.contextInfo?.quotedMessage.
            var mr = ms.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgAnswered? auteurMsgRepondu : "";
            var auteurMessage = check the group ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) {
                autorMessage = idBot;
            }
            var membreGroupe = verifGroupe ? ms.key.participant : '';
            const nomAuteurMessage = ms.pushName;
            const Denzo = '244935469526';
            const Sombre = '242068510698;
            var superUser = [servBot,Denzo, Sombre conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            var dev = [Denzo,Sombre].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            function Answered(You) { SMITH.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }
            console.log("\t [][]...{Smith-MD}...[][]");
            console.log("✨=========== SMITH-MD ===========✨");
            if (verifGroupe) {
                console.log("message provenant du groupe : " + nomGroupe);
            }
            console.log("message envoyé par : " + "[" + nameAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
            console.log("type de message : " + mtype);
            console.log("------ contenu du message ------");
            console.log(texte);
            /**  */
            function groupeAdmin(membreGroupe) {
                let admin = [];
                for (m of membreGroupe) {
                    if (m.admin == null)
                        continue;
                    admin.push(m.id);
                }
                // else{admin= false;}
                return admin;
            }
            const mbre = checkthegroup ? await infosGroupe.participants : '';
            //  const verifAdmin = verifGroupe ? await mbre.filter(v => v.admin !== null).map(v => v.id) : ''
            let admins = verifGroupe ? groupeAdmin(mbre) : '';
            const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
            var verifZokouAdmin = verifGroupe ? admins.includes(idBot) : false;
            /** ** */
            /** ***** */
            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
            const verifCom = texte ? texte.startsWith(prefixe) : false;
            const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
            var commandeOptions = {
                ✨User, ✨dev,
                ✨checktheGroupe,
                ✨mbre,
                ✨membreGroupe,
                ✨verifAdmin,
                ✨infoGroupe,
                ✨nameGroupe,
                ✨autorMessage,
                ✨nameutorMessage,
                ✨idBot,
                ✨Adminsmith,
                ✨prefixe,
                ✨arg,
                ✨Answered,
                ✨mtype,
                ✨groupeAdmin,
                ✨msgAnswered,
                ✨autorMsgRepondu,
                ms
            };
            /** ****** gestion auto-status  */
            if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.reading_AUTO_STATUS === "false") {
                await zk.readMessages([ms.key]);
            }
            if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.download_AUTO_STATUS === "false") {
                /* await zk.readMessages([ms.key]);*/
                if (ms.message.extendedTextMessage) {
                    var stTxt = ms.message.extendedTextMessage.text;
                    await zk.sendMessage(idBot, { text: stTxt }, { quoted: ms });
                }
                else if (ms.message.imageMessage) {
                    var stMsg = ms.message.imageMessage.caption;
                    var stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
                    await zk.sendMessage(idBot, { image: { url: stImg }, caption: stMsg }, { quoted: ms });
                }
                else if (ms.message.videoMessage) {
                    var stMsg = ms.message.videoMessage.caption;
                    var stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
                    await zk.sendMessage(idBot, {
                        video: { url: stVideo }, caption: stMsg
                    }, { quoted: ms });
                }
                /** *************** */
                // console.log("*nouveau status* ");
            }
            /** ******fin auto-status */
            if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }
            /******************* PM_PERMT***************/

            if (!BestUser && origineMessage === autorMessage && verifCom && conf.PM_PERMIT === "yes" ) {
                Answered("⛔*if some command does not work in private create a group to be able to benefit from it*⛔") ; return }
            ///////////////////////////////
            //anti-link
            try {
                if (texte.includes('https://') && checkthegroup) {
                    var verifAdmin = admin ? admins.includes(idBot) : false;
                    let req = await getGroupe(origineMessage);
                    // console.log("la bd " + Object.values(req))
                    for (var a = 0; a < req.length; a++) {
                        if (req[a].id === origineMessage) {
                            console.log("reponse " + req[a].antilien + "\n\n");
                            if (req[a].antilink == "yes") {
                                console.log('  _Links detected._'); /*repondre("\_Links detected");*/
                                console.log("le dev " + dev);
                                console.log("Smith admin " + Admin);
                                if (!dev || !BestUser) {
                                    if (Admin) {
                                        if (!verifAdmin) {
                                            const key = {
                                                remoteJid: origineMessage,
                                                fromMe: false,
                                                id: ms.key.id,
                                                participant: autorMessage
                                            };
                                            var txt = "_Links detected_, \n";
                                            txt += `message DELETE  \n @${auteurMessage.split("@")[0]} remove from group.`;
                                            const gifLink = "https://raw.githubusercontent.com/pierrette444/Smith-MD/main/media/remover.gif";
                                            var sticker = new Sticker(gifLink, {
                                                pack: 'Smith-MD',
                                                author: conf.Name_OWNER,
                                                type: StickerTypes.FULL,
                                                categories: ['✨', '🥰'],
                                                id: '12345',
                                                quality: 50,
                                                background: '#000000'
                                            });
                                            await sticker.toFile("st1.webp");
                                            // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
                                            await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
                                            (0, baileys_1.delay)(800);
                                            await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                                            try {
                                                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                                            }
                                            catch (e) {
                                                console.log("antiien ") + e;
                                            }
                                            await zk.sendMessage(origineMessage, { delete: key });
                                            await fs.unlink("st1.webp");
                                        }
                                        else {
                                            repondre("the link was sent by a group administrator.");
                                        }
                                    }
                                    else {
                                        repondre("admin groupe  .");
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.log("bdd err " + e);
            }
            /*
      
              */
            /** *************************anti-bot******************************************** */
            try {
                const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
                const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
                if (botMsg || baileysMsg) {
                    var verifAdmin = verifGroupe ? admins.includes(idBot) : false;
                    let req = await getAntibot(origineMessage);
                    for (var i = 0; i < req.length; i++) {
                        if (req[i].groupejid === origineMessage) {
                            if (req[i].etat === "oui") {
                                if (!superUser || !dev) {
                                    if (verifZokAdmin) {
                                        if (!verifAdmin) {
                                            const key = {
                                                remoteJid: origineMessage,
                                                fromMe: false,
                                                id: ms.key.id,
                                                participant: auteurMessage
                                            };
                                            var { stick, genererNomFichier } = require('./framework');
                                            const nomFichier = await genererNomFichier('webp');
                                            var st = await stick("./media/antibot.gif", "Zokou-MD");
                                            await st.toFile(nomFichier);
                                            var txt = "*Bot détecté*, \n";
                                            txt += `message supprimé \n @${auteurMessage.split("@")[0]} 
                             rétiré 
                                    du groupe.`;
                                            await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("./" + nomFichier) }, { quoted: ms });
                                            (0, baileys_1.delay)(800);
                                            await fs.unlink("./" + nomFichier);
                                            /* try{await zk.sendMessage(origineMessage,{text:txt,mentions:[auteurMessage]},{quoted:ms}) ;}catch(e){console.log("gggg "+e)}*/
                                            try {
                                                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                                            }
                                            catch (e) {
                                                console.log("antibot ") + e;
                                            }
                                            await zk.sendMessage(origineMessage, { delete: key });
                                        }
                                        else {
                                            repondre("*Bot detected*\n 🤧🤧🤧.");
                                            return;
                                        }
                                    }
                                }
                                //  repondre("*Bot detected.*");
                            }
                        }
                    }
                }
            }
            catch (er) {
                console.log('.... ' + er);
            }
            /////////////////////////
            if (conf.MODE != 'oui' && !superUser) {
                return;
            }
            //execution des commandes   
            if (verifCom) {
                //await await zk.readMessages(ms.key);
                const cd = evt.cm.find((zokou) => zokou.nomCom === (com));
                if (cd) {
                    try {
                        reagir(origineMessage, zk, ms, cd.reaction);
                        cd.fonction(origineMessage, zk, commandeOptions);
                    }
                    catch (e) {
                        console.log("😡😡 " + e);
                        zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                    }
                }
            }
            //fin exécution commandes
        });
        //fin événement message
        //événement contact
        zk.ev.on("contacts.upsert", async (contacts) => {
            const insertContact = (newContact) => {
                for (const contact of newContact) {
                    if (store.contacts[contact.id]) {
                        Object.assign(store.contacts[contact.id], contact);
                    }
                    else {
                        store.contacts[contact.id] = contact;
                    }
                }
                return;
            };
            insertContact(contacts);
        });
        //fin événement contact 
        //événement connexion
        zk.ev.on("connection.update", async (con) => {
            const { lastDisconnect, connection } = con;
            if (connection === "connecting") {
                console.log("ℹ️ Connexion en cours...");
            }
            else if (connection === 'open') {
                console.log("✅ connection completed ! ☺️");
                console.log("--");
                await (0, baileys_1.delay)(200);
                console.log("------");
                await (0, baileys_1.delay)(300);
                console.log("------------------/-----");
                console.log("Bot connected 🕸\n\n");
                //chargement des commandes 
                console.log("chargement des commandes ...\n");
                fs.readdirSync(__dirname + "/commandes").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == (".js")) {
                        try {
                            require(__dirname + "/commandes/" + fichier);
                            console.log(fichier + " installé ✔️");
                        }
                        catch (e) {
                            console.log(`${fichier} error : ${e}`);
                        } /* require(__dirname + "/commandes/" + fichier);
                         console.log(fichier + " installé ✔️")*/
                        (0, baileys_1.delay)(300);
                    }
                });
                (0, baileys_1.delay)(700);
                var md;
                if (conf.MODE === "oui") {
                    md = "public";
                }
                else if (conf.MODE === "false") {
                    md = "private";
                }
                else {
                    md = "indéfini";
                }
                console.log("BOT COMMANDE ✅");
                let cmsg = `╔════◇
║ 『SMITH-MD』
║    Prefix : [ ${prefixe} ]
║    Mode :${md}
║    Total Commandes : ${evt.cm.length}︎
╚══════════════════╝

╔═════◇
║『Denzo-Uchiwa✨
║ 
╚══════════════════╝`;
                await Smith.sendMessage(SM.user.id, { text: cmsg });
            }
            else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('Session id invalide😩😫😣 ...');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('!!! connexion close, reconnecting ...');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('connexion Lost 😞 ,,, reconnecting ... ');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('connexion réplacée ,,, sesssion Open !!!');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('you are deconnected,,, Scanne QR code');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('Reboot In progress ▶️');
                    main();
                }
                // sleep(50000)
                console.log("hum " + connection);
                main(); //console.log(session)
            }
        });
        //fin événement connexion
        //événement authentification 
        zk.ev.on("creds.update", saveCreds);
        //fin événement authentification 
        //
        /** ************* */
        //fonctions utiles
        zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
            let quoted = message.msg ? message.msg : message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await (0, baileys_1.downloadContentFromMessage)(quoted, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let type = await FileType.fromBuffer(buffer);
            let trueFileName = './' + filename + '.' + type.ext;
            // save to file
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        };
        // fin fonctions utiles
        /** ************* */
        return zk;
    }
    let fichier = require.resolve(__filename);
    fs.watchFile(fichier, () => {
        fs.unwatchFile(fichier);
        console.log(`mise à jour ${__filename}`);
        delete require.cache[fichier];
        require(fichier);
    });
    main();
}, 5000);
