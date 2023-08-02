/** Command-line tool to generate Markov text. */

const fs = require('fs')
const Markov = require('./markov')
const process = require('process')
const axios = require('axios')

function read(file) {
    fs.readFile(file, 'utf8', function cb(err, data) {
        if (err) {
            console.log(`Error reading file ${file}: \n \t ${err}`)
            process.exit(1)
        }
        handleData(data)
    })
}

async function readWeb(url) {
    try {
        let res = await axios.get(url)
        handleData(res.data)
    }
        catch (err) {
            console.log(`Error fetching ${url}: \n \t ${err}`)
        }
    
}


function handleData(data) {
    const m = new Markov.MarkovMachine(data)
    let txt = m.makeText(numWords = 100)
    console.log(txt)
    return txt
}




function createText(type, path) {
   
    if (type === 'url') {
        return readWeb(path)
    }
    if (type === 'file') {
        return read(path)
    }

}

createText(process.argv[2], process.argv[3]);