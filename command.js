class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     if(value && commandType=='STATUS_CHECK'){
       throw Error("Value is not required for command type STATUS_CHECK.");
     }
     this.value = value;
   }
 
 }
 
 module.exports = Command;