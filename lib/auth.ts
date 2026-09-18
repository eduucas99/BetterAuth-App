import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { twoFactor } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [twoFactor()],
  
    //Database 
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }),

    //Email provicers
    emailAndPassword: { 
        enabled: true, 
        requireEmailVerification: true,
    }, 

    emailVerification:{
        sendOnSignIn: true,
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async({user, url, token}) => {
            console.log('verification email: ', { user, url, token});
        }
    },
    //Proveedores
    socialProviders: { 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    }, 

});
