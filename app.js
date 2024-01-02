const yargs = require('yargs');
const contacts  = require('./contacts');

 yargs.command({
    command : 'add',
    describe : 'menambahkan contact baru',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption : true,
            type : 'string',
        },
        email : {
            describe : 'Email',
            demandOption : false,
            type : 'string',
        },
        noHp : {
            describe : 'Nomer Handphone',
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHp);
    },
 }).demandCommand();


//menampilkan daftar nama & noHp contacts
yargs.command({
    command : 'list',
    describe : 'menampikan nama & noHp',
    handler(){
        contacts.listContact();
    },
});

//menampikan detail sebuah contact
yargs.command({
    command : 'detail',
    describe : 'menampilkan detail sebuah contact berdasarkan nama',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },
});

//menghapus contact berdasarkan nama
yargs.command({
    command : 'delete',
    describe : 'menghapus sebuah contact berdasarkan nama',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();