const fs=require('fs');
const process=require('process');
const axios=require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url){
    try{
        const resp=await axios.get(url);
        console.log(resp.data);
    } catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

const arg=process.argv[2];
if(arg){
    if(arg.startsWith('http')){
        webCat(arg);
    } else {
        cat(arg);
    }
} else {
    console.error('Please provide a file path or URL');
    process.exit(1);
}