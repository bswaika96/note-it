const fs = require('fs');
const chalk = require('chalk');

const path = 'notes.json'

const load = () => {
    console.log(chalk.blue('Loading notes...'))
    try{
        if(fs.existsSync(path)){
            const object = fs.readFileSync('notes.json').toString();
            const data = JSON.parse(object)
            if(data.length>0)
                return data
        }
    }catch(err){
        console.log(err)
    }
    return undefined
};

const save = (notes) => {
    console.log(chalk.blue('Saving notes...'))
    try{
        fs.writeFileSync(path, JSON.stringify(notes));
        return true    
    }catch(err){
        console.log(err);  
    }
    return undefined
};

const findNote = (notes, title, mode=0) => {
    const index = notes.findIndex((note) => {
        return note.title === title
    })
    if(mode === 0){
        return index
    }else{
        if(index!=-1){
            return notes[index]
        }
    }
    return undefined
}

module.exports = {
    load,
    save,
    findNote
};