
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const { resolve } = require('path/win32');
const { rejects } = require('assert');
 
//membuat folder data jika belum ada 
const dirPath = './data';

if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
} 

//membuat file contacts.json jika belum ada 
const dataPath = './data/contacts.json';

if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');  
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama,email,noHp) => {
    const contact = { nama , email, noHp};
    // const file = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(file);
    const contacts = loadContact();

    //cek duplikat 
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar , gunakan nama lain'));
        return false;
    }
    
    //cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid'));
            return false;
        }
    }

    //cek noHp
    if(!validator.isMobilePhone(noHp,'id-ID')){
        console.log(chalk.red.inverse.bold('No Hp tidak valid'));
        return false;
    }

    contacts.push(contact);
             
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    
    console.log(chalk.green.inverse.bold('Terimakasih Sudah Memasukan Data.'));
};


const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Contact : '));
    contacts.forEach((contact ,i ) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if(!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(chalk.green.inverse.bold(contact.noHp));
    if(contact.email){
        console.log(chalk.white.inverse.bold(contact.email));
    }
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !==  nama.toLowerCase()
    );

    if(contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    
    console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact};