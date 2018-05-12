// ==UserScript==
// @name         Title add T (test), D (dev), L (localhost)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.lykkex.net/*
// @include      http://localhost*
// @include      https://lykkecity.github.io/LykkePayMarkup*
// @require      http://lab.ejci.net/favico.js/favico.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // http://lab.ejci.net/favico.js/
    var favicon=new Favico({
        position : 'up',
        type: 'rectangle',
        bgColor : '#fff',
        textColor : '#000',
        fontStyle: '100'
    });

    let fav = document.querySelector('link[rel="icon"]');
    if (fav) {
        fav.remove();
    }

    if (window.location.host.indexOf('-test') > -1) {
        //document.title = 'test_' + document.title;
        favicon.badge('T');
    } else if (window.location.host.indexOf('-dev') > -1) {
        //document.title = 'dev_' + document.title;
        if (window.location.host.indexOf('pay-backoffice-dev') > -1) {
            favicon.badge('DPB');
        } else if (window.location.href.indexOf('https://backoffice-dev') > -1) {
            favicon.badge('DB');
        } else {
            favicon.badge('D');
        }
    } else if (window.location.host.indexOf('localhost') > -1) {
        //document.title = 'local_' + document.title;
        favicon.badge('L');
    } else if (window.location.href.indexOf('lykkecity.github.io/LykkePayMarkup') > -1) {
        favicon.badge('M');
    }

})();
