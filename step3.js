const fs=require('fs');
const process=require('process');
const axios=require('axios');

function cat(path,outPath=null){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else{
            handleOutput(data,outPath);
        }
    });
}

async function webCat(url,outPath=null){
    try{
        const resp=await axios.get(url);
        handleOutput(resp.data,outPath);
    } catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

const args=process.argv.slice(2);
let outPath=null;
let pathOrUrl;

if(args[0]==='--out'){
    outPath=args[1];
    pathOrUrl=args[2];
} else {
    pathOrUrl=args[0];
}

if (pathOrUrl){
    if(pathOrUrl.startsWith('http')){
        webCat(pathOrUrl,outPath);
    } else {
        cat(pathOrUrl,outPath);
    } else{
        console.error('Please provide a file path or URL');
        process.exit(1);
    }
}