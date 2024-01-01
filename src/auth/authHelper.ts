import { v4 } from "uuid"
import { EmailConfirmation } from "../users/user.schema"
import { addDays } from "date-fns"



 class AuthHelper {
    confiramtionDataMapper(): EmailConfirmation{
        const data:EmailConfirmation = {
            code: v4(),
            expirationDate: addDays(new Date(),3),
            isConfirmed: false
        } 
        return data
    }
}

export const authHelper = new AuthHelper()