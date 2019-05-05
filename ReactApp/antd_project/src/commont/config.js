global.constants = {
    url:'http://localhost:8080/manage',
    checkPermission:(path)=>{
        let array = JSON.parse(sessionStorage.getItem("route"))
        if(!array || array.length === 0) 
            return false; 
        for(let i = 0; i < array.length ; i ++){ 
            if(array[i] === path) return true; 
        } 
        return false;
    },
    checkImageType:(typeList, type)=>{
        if(!typeList || typeList.length === 0) 
            return false; 
        for(let i = 0; i < typeList.length ; i ++){ 
            if(typeList[i] === type) return true; 
        } 
        return false;
    },
    checkToken:()=>{
        if(sessionStorage.getItem("token")){
            return true;
        }
        return false;
    }
};