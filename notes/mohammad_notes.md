


#special features:
- i added a function to validate the .env file.
so it will not work if you missed something in the .env file. or if the variable is empty.
also if you entered wrong value for SALT_ROUNDS it will check these.



#Authentication:
i used jose library thats includes jwt.
all auth function stored in lib/auth.ts

first, generate the token after succeed logged in.i added the useId, username, role with the token.

then inside any page that will use the session information, you can use this:
import { getSession } from "@/lib/auth";

then in the page part before the return statement, 
const session = await getSession();


then i have created a function for requireAuth pages, i wrapped it by the layout

things must be added:
- refresh tokens.
- protect APIS.
- prevent uknown APIs.