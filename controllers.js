const chalk = require('chalk')

const notes = require('./notes');

const controllers = {
    list: function(){
        let notesObject = notes.load();
        if(!notesObject){
            console.log(chalk.bgYellow.white('Warning: ') + ' No notes to display...');
        }else{
            notesObject.forEach((note, index) => {
                console.log(`\nNOTE ${index+1}:\n  TITLE:\n    ${note.title}\n  BODY:\n    ${note.body}`);
            })
        }
    },
    add: function(title, body){
        let notesObject = notes.load();
        if(!notesObject){
            notesObject = [{
                title,
                body
            }]
            if(!notes.save(notesObject)){
                console.log(chalk.bgRed.white('Error: ') + ' Couldn\'t save notes!')
            }
        }else{
            const index = notes.findNote(notesObject, title)
            if(index==-1){
                notesObject.push({
                    title,
                    body
                })
                if(!notes.save(notesObject)){
                    console.log(chalk.bgRed.white('Error: ') + ' Couldn\'t save notes!')
                }
            }else{
                console.log(chalk.bgRed.white('Error: ') + ' Duplicate Title. Please change it!');
            }
        }
    },
    remove: function(title){
        let notesObject = notes.load();
        if(!notesObject){
            console.log(chalk.bgYellow.white('Warning: ') + ' No notes yet...');
        }else{
            const index = notes.findNote(notesObject, title)
            if(index!=-1){
                const note = notesObject.splice(index, 1);
                console.log(chalk.bgGreen.white('Success: ') + ' Removed Note...')
                console.log('TITLE:', note[0].title)
                console.log('BODY:', note[0].body)
                if(!notes.save(notesObject)){
                    console.log(chalk.bgRed.white('Error: ') + ' Couldn\'t save notes!')
                }     
            }else{
                console.log(chalk.bgRed.white('Error: ') + ' No such note found!')
            }
        }
    },
    read: function(title){
        let notesObject = notes.load();
        if(!notesObject){
            console.log(chalk.bgYellow.white('Warning: ') + ' No notes yet...');
        }else{
            const note = notes.findNote(notesObject, title, 1)
            if(!note){
                console.log(chalk.bgRed.white('Error: ') + ' No such note found!')
            }else{
                console.log(chalk.bgGreen.white('Success: ') + ' Reading Note...')
                console.log('TITLE:\n ', note.title)
                console.log('BODY:\n ', note.body)
            }
        }
    },
    edit: function(key, title, body){
        let notesObject = notes.load();
        if(!notesObject){
            console.log(chalk.bgYellow.white('Warning: ') + ' No notes yet...');
        }else{
            const index = notes.findNote(notesObject, key)
            if(index!=-1){
                const note = notesObject[index];
                const noteTitle = title || note.title;
                const noteBody = body || note.body;
                console.log('OLD TITLE:\n ', note.title)
                console.log('OLD BODY:\n ', note.body)
                console.log(chalk.bgGreen.white('Success: ') + ' Updating Note...')
                note.title = noteTitle
                note.body = noteBody
                console.log('NEW TITLE:\n ', note.title)
                console.log('NEW BODY:\n ', note.body)
                if(!notes.save(notesObject)){
                    console.log(chalk.bgRed.white('Error: ') + ' Couldn\'t save notes!')
                }  
            }else{
                console.log(chalk.bgRed.white('Error: ') + ' No such note found!')
            }
        }
    }
}

module.exports = controllers