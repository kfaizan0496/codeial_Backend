const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const { log } = require('console');
const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream=  rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory,
});


const development={
    name:'development',
    asset_path:'./assets',
    // asset_path:process.env.ASSET_PATH,

    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:'false',
        auth:{
            user:'kfaizan0496@gmail.com', // 
            pass:'equvwujjhyfjtkoc'
        }
    },
    google_client_id:"944962193161-vepbtjllhobesbs40s2fja6c377q3jj0.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url:"http://localhost:8000/users/auth/google/callback",
    passport_jwt_secret_key:'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    // session_cookie_key:'7mlbxfdDQVFIcQ1A9K0WDrFizQD43ZPh',
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    // ::NOTE----->::
    // session_cookie_key and passport_jwt_secret_key created by random keygen website
    //  after that store in CODEIAL_SESSION_COOKIE_KEY and CODEIAL_PASSPORT_JWT_SECRET_KEY 
    // respectively
     

    db:'codeial_production',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:'false',
        auth:{
            // user:'kfaizan0496@gmail.com', 
            // pass:'equvwujjhyfjtkoc',
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD,
        }
    },
    // google_client_id:"944962193161-vepbtjllhobesbs40s2fja6c377q3jj0.apps.googleusercontent.com",
    // google_client_secret:"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",
    // google_callback_url:"http://localhost:8000/users/auth/google/callback",
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    // passport_jwt_secret_key:'RK0QoHkJ0y4OL3rGGWVvm4Z2nYHgOYUr',
    passport_jwt_secret_key:process.env.CODEIAL_PASSPORT_JWT_SECRET_KEY,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }

}

// module.exports=development;
module.exports=eval(process.env.CODEIAL_ENVIROMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIROMENT);
