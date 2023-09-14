const {zokou}=require("../framework/zokou")







zokou({nomCom:"reboot bot",categorie:"Mods",reaction:"👨🏿‍💼"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!dev ||!superUser)
  {
    return repondre("Owner commande");
  }

  const {exec}=require("child_process")

    repondre("* Reboot in progress ...*");

  exec("pm2 restart all");
  

  



})
