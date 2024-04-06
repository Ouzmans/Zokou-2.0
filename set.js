const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE5PUlZyMUtqUURIRTVGVUdiVi9XRlY1eXMwT0dWUkhZenFOTXJGT25VUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFl0Rm5oZjQ5NGdHUVduc0VmWm1hYWp6LzBMRThyelNaYXRtOUJSR1R3QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RHN5WGxvNTJQSDNrcUxGdXZzQ2drUXVkSVhROGVWMzBEZU5JMVlDb0ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRUWNWcjhiZlQxRHY5UGxPOWhKRjQ5RUVldEhtRFU5R05kOVR0NFlBTVJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklLdVozYnlOZWExTm5sRHFGdWdjY056SENCcmY3dWZVMk1wdVFVREFUa2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFrUlZoNXMvMGtxU2lUSER0ZjEzLzFxcmU3ZVVQRW1JbTFNMis3M0tNdzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0pCWDRiZngvZzZraHZFbjBkVEtYZmJPN0lxRWlmRHMyMVZTbVdhODcwbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiazJlYWhpd29UbHZYQittcnV1aGJabU95Y2I2QUxMbWhlRHhHMURVUjUwOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iklyc2VaYm8yN05YMTJZN3A1TEJLTXhoYXJ3WjR5TTRDQUpsVTh3TjhmYkg5V0UwQUhvK3dIQWpQOTAvNmpma2t6Ymx5MC9ST1dTRXdZT0RPanQzZkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IjRpTHE0b29tU29BRDNZYmdJZTYwV24rRzZxR0lKbHowdkYvTVc0SUxWYzg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjlKYTB1cnZCVDlHc0xhT0xJM1l6U1EiLCJwaG9uZUlkIjoiOGZiOTI3ZWUtNjFkOC00MjFiLTk5M2ItNjgwMTI3NjU4NGZhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFtWk42akZDVDRKZWpqWXhjbVhuZjdTbFpOMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjZHg1Tnp1MGxON3c2OEMzRXdOdkNSTSthUUE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSzdESExZQjQiLCJtZSI6eyJpZCI6IjIyMTc2NjAxOTgxNjoxN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJPdXNtYW5lIiwibGlkIjoiMTM3MjI4NzM1MDAwNzQxOjE3QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFRsMFBvSEVON1N4YkFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQW56U2pWWXA1UWxjdnp1eGhzK3o1WWl3dVpKdmlWZDBLUCs2eXdKQjlUWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTWoyWEsyQm9XaU04TWx6YVMzVHhGb2hBaHdNOEZoaDBmTWVPSktzNGIwVUtnVURxdldwY1puNElmUEY3Z0Z0SDMvZHN2RHVldCtTSC83bG1SZE1SQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IjdRQ1RycmRrSkkzNTZvVHRHUUZseHVWV3RJVzVQK01nYWgrSzk1MGd3aUJNbVlpWjNiN3JWdTl4S2huQjZwMzJQbmVueUNYcmsxMTB0d3FqeUF3ZEFRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIxNzY2MDE5ODE2OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFKODBvMVdLZVVKWEw4N3NZYlBzK1dJc0xtU2I0bFhkQ2ovdXNzQ1FmVTIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTI0MTcxMjEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUHp6In0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "OUZMANS.SN",
    NUMERO_OWNER : process.env.NUMERO_OWNER, 221766019816             
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
