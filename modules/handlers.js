var fs = require("fs");
var formidable = require("formidable");
var fileName = null;

exports.upload = function (request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();

    fs.readFile("templates/upload.html", function (err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);

        form.parse(request, function (error, fields, files) {
            fileName = files.upload.name;
            fs.renameSync(files.upload.path, fileName);
        });
    });
};

exports.welcome = function (request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");

    fs.readFile("templates/start.html", function (err, data) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

        if (err) {
            response.writeHead(404);
            response.write("File not found!");
        } else {
            response.write(data);
        }
        response.end();
    });
};

exports.show = function (request, response) {
    fs.readFile(fileName, "binary", function (error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    })
};

exports.style = function (request, response) {
    fs.readFile("templates/upload.css", function (error, file) {
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(file);
        response.end();
    })
};

exports.select = function (request, response) {
    fs.readFile("templates/start.css", function (error, file) {
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(file);
        response.end();
    })
};

exports.error = function (request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
};
