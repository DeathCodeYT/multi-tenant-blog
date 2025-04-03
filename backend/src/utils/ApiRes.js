export class ApiRes{
    constructor(statusCode=200,data=null,message="Success",otherData=null){
        this.statusCode = statusCode
        this.success = statusCode>=200 && statusCode<300
        this.data = data
        this.message = message
        this.otherData = otherData
    }
}