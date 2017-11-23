var fs = require('fs');
var path = require('path');
var readdir = require('readdir-enhanced');

/**
 * Returns true when filePath includes any of extensions
 * @param {String} filePath
 * @param {String[]} extensions
 * @return {Boolean}
 */
function extensionFilter(filePath, extensions) {
    var ext = path.extname(filePath).replace('.', '')
    return extensions.includes(ext);
}

/**
 * Gets file paths for given extensions
 * @param {String} folderPath 
 * @param {String[]} extensions
 * @returns Promise of string array
 */
function getFilePaths(folderPath, extensions) {
    return readdir(folderPath, { deep: true })
        .then(function (list) {
            return list.filter(function (filePath) {
                return extensionFilter(path.resolve(folderPath, filePath), extensions);
            });
        });
}

/**
 * Parse the filePath and generate episode object
 * @param {String} filePath
 * @return {Object} 
 */
function mapFilePathToEpisode (filePath) {
    // TODO: matching pattern 
    // var matchRegex = ''
    return filePath; 
}

function findVideoFiles(folderPath, extensions) {
    return getFilePaths(folderPath, extensions)
        .then(function(list) {
            return list.map(mapFilePathToEpisode);
        })
}

var fileScannerService = {
    findVideoFiles : findVideoFiles
}

module.exports = fileScannerService;