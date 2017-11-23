var fs = require('fs');
var path = require('path');

var getFilePaths = function (folderPath, extensions) {
    const extensionFilter = file => {
        const ext = path.extname(file).replace('.', '')
        return extensions.includes(ext);
    }
    const readFolder = folderPath => {
        return new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, list) => {
                if (err) reject(err);
                resolve(
                    Promise.all(
                        list.map(file => readFile(path.resolve(folderPath, file)))
                    )
                );
            })
        }).then(finalList => {
            return finalList.reduce((list, item) => {
                if(!item) return list;
    
                if(Array.isArray(item)) {
                    list.push(...item);
                } else {
                    list.push(item);
                }
                return list;
            }, [])
        })
    }
    
    const readFile = filePath => {
        return new Promise((resolve, reject) => {
            isFile(filePath).then(flag => {
                if(flag) {
                    if(extensionFilter(filePath)) {
                        resolve(filePath);
                    } else {
                        resolve()
                    }
                } else {
                    resolve(readFolder(filePath));
                }
            })
        });
    }
    
    const isFile = filePath => {
        return new Promise((resolve, reject) => {
            fs.lstat(filePath, (err, stats) => {
                if(err) reject(err);
                resolve(!stats.isDirectory())
            })
        });
    }

    return readFolder(folderPath);
}

const mapToEpisodes = episodePaths => (
    episodePaths.map(episodePath => {
        // TODO: matching pattern 
        // var matchRegex = ''
        return episodePath; 
    })
)

const findVideoFiles = (folderPath, extensions) => {
    return getFilePaths(folderPath, extensions)
        .then(mapToEpisodes);
}

var fileScannerService = {
    findVideoFiles : findVideoFiles
}

module.exports = fileScannerService;