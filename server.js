let http = require("http");

class User {
    constructor(id,name){
        this.id = id;
        this.name = name;
    }
}

let users = new Map();
users.set(1,new User(1,"张三"));
users.set(2,new User(2,"sam"));
users.set(3,new User(3,"tom"));
users.set(4,new User(4,"jack"));


class Result{
    constructor(flag,data){
        this.flag = flag;
        this.data = data;
    }
}

let server  = http.createServer(function(request,response){
    let result = null;
    let url = request.url;

    try{
        let param = url.split(/\?/)[1];
        let key = param.split(/=/)[0];
        let value = param.split(/=/)[1];

        if( !key || !value || key!="id"){
            result = new Result(false,"Parameter must be id = ???");
        }else{
            if(Number.isInteger(+value)){
                if(users.has(+value)){
                    result = new Result(true,users.get(+value));
                }else{
                    result = new Result(false,"Not Found :(");
                }
            }else{
                result = new Result(false,"ID must be integer!");
            }
        }
    }catch(e){
        result = new Result(false,"Invalid Parameter!");
    }

    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    response.write(JSON.stringify(result));
    response.end();
});

server.listen(8000,function(){
    console.log("Running ...");
})