const yargs = require('yargs');

const controllers = require('./controllers');

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    describe: 'ADD a new note',
    builder:{
        title:{
            describe: 'Note TITLE',
            demandOption: true,
            type:'string',
            alias:'t'
        },
        body:{
            describe: 'Note BODY',
            demandOption: true,
            type:'string',
            alias:'b'
        }
    },
    handler: function(argv){
        //console.log('Adding Note...');
        controllers.add(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'REMOVE a note',
    builder:{
        title:{
            describe: 'Note TITLE',
            demandOption: true,
            type:'string',
            alias:'t'
        }
    },
    handler: function(argv){
        //console.log('Removing Note...');
        controllers.remove(argv.title);
    }
});

yargs.command({
    command: 'read',
    describe: 'READ a note',
    builder:{
        title:{
            describe: 'Note TITLE',
            demandOption: true,
            type:'string',
            alias:'t'
        }
    },
    handler: function(argv){
        //console.log('Reading Note...');
        controllers.read(argv.title)
    }
});

yargs.command({
    command: 'list',
    describe: 'LIST all notes',
    handler: function(){
        //console.log('Listing Notes...');
        controllers.list();
    }
});

yargs.command({
    command: 'edit',
    describe: 'EDIT a note',
    builder:{
        search:{
            describe: 'Note TITLE to search for',
            demandOption: true,
            type:'string',
            alias:'s'
        },
        title:{
            describe: 'Updated Note TITLE',
            type:'string',
            alias:'t'
        },
        body:{
            describe: 'Updated Note BODY',
            type:'string',
            alias:'b'
        }
    },
    handler: function(argv){
        //console.log('Adding Note...');
        controllers.edit(argv.search, argv.title, argv.body);
    }
})


module.exports = yargs