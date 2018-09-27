// Module Imports
var express = require('express');
var app = express();
var path = require('path');
var nunjucks = require('nunjucks');

// Configure Nunjucks (jinja2 nodeJS clone) template system
nunjucks.configure(__dirname + '/views/', {
    autoescape: true,
    express: app
});

// Set routing for the server
app.use(express.static('public'));
app.use('/guppy-js/', express.static(__dirname + '/node_modules/guppy-js/'));

// Different math problems for the course modules
const modules = [
    {
        p: "Solve for x:",
        q: "$$y=(x)-4$$",
        a: "$$x = (1 / ((y - ((-4)))^-1))$$"
    },
    {
        p: "Solve for x:",
        q: "$$(x^2) = ((y / 2) + 4)$$",
        a: "$$x = squareroot((((1 / 2) * y) + 4))$$"
    },
    {
        p: "Compute the derivative:",
        q: "$$((d / (d * x)) * (((x^3) + squareroot(x)) - 25))$$",
        a: "$$integral(((6 * x) - (1 / (4 * root(3,(x^2))))),x)$$"
    },
    {
        p: "Evaluate the integral:",
        q: "$$defintegral(-pi,pi,((t / ((t^2) + 1)) - (((5 / pi) * (t^2)) * cos(t))),t)$$",
        a: "$$((((4)! * (e^((3 * pi) * squareroot(((1)! - (2)!)))))^2) / (((4)! * (3)!) - (0.8 * squareroot(20736))))$$"
    },
    {
        p: "Simplify the expression:",
        q: "$$((((3 * x) + 4) / 5) - (((6 * x) + 8) / 10))$$",
        a: "$$(((summation(n = 0,infinity,(x / (n)!))^(i * arccos(-1))) / (zeta * (x^squareroot(-(pi^2))))) + (((((1 / 1) * (zeta^2)) + ((2 * (x^2)) * zeta)) + (1 / (x^-4))) / (zeta * ((zeta + (x^2))^2))))$$"
    }
];

// Route each URL to its template page

app.get('/',function(req, res) {
    res.render('landing.html');
});

app.get('/module/5',function(req,res) {
    res.render('finish.html');
});

app.get('/module/:module',function(req, res) {
    let module = req.params.module;
        res.render('index.html',{module: req.params.module, data: modules[module]});
});


// Start the server
var server = app.listen(8080);