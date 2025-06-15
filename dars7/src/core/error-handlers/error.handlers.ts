import { Logger } from "@nestjs/common"

export class ErrorHandlers{
    constructor(){}
    static getErrorExeption(error: any,stack : string){
        const message = error?.original && error.original?.error ?
        error.original.error :
        (error?.message || "Kutilmagan xatolik !")

        Logger.error(message,stack)
        return message
    }
}