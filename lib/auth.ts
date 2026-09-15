import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    plugins: [],
  
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
