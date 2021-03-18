class Rover {
   // Write code here!
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

   receiveMessage(message)
   {
          this.message = message.name;
     let commandOutput = [];
     let commandStatus = false;
     for(let i=0;i<message.commands.length;i++)
     {
       if(message.commands[i].commandType=='STATUS_CHECK')
       {
         commandOutput[commandOutput.length] = {
                                                     completed: true,
                                                     roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
                                                    } 
       }

       if(message.commands[i].commandType=='MOVE')
       {
         if(this.mode == 'LOW_POWER')
         {
         commandOutput[commandOutput.length] = {
                                                     completed: false
                                                    } 
         }
         else
         {
         commandOutput[commandOutput.length] = {
                                                     completed: true
                                                    } 
         this.position = message.commands[i].value;
         }
       }

       if(message.commands[i].commandType=='MODE_CHANGE')
       {
         commandOutput[commandOutput.length] = {
                                                     completed: true
                                                    } 
         this.mode = message.commands[i].value;
       }
     }
     //console.log(commandOutput);

     let output = {
                    'message':this.message,
                    results: commandOutput//[
      //{
      //   completed: true
      //},
      //{
      //   completed: true,
      //   roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: //this.position }
      //}
   //]
                  };
     return output
   }
}

module.exports = Rover;