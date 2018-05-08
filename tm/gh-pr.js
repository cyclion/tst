// ==UserScript==
// @name         GitHub PRs collapse all feature
// @namespace    http://tampermonkey.net/
// @version      1.3.0
// @description  try to take over the world!
// @author       You
// @include      https://github.com/LykkeCity/*/pull/*
// @include      https://github.com/LykkeCity/*/commit/*
// @include      https://github.com/LykkeCity/*/compare/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js#sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js
// @downloadURL  https://raw.githubusercontent.com/vitaliidasaev/tst/master/tm/gh-pr.js
// ==/UserScript==

(function() {
    'use strict';
    const buttonSelector = '.js-details-container > .file-header > .file-actions > button';
    const buttonSelectorNotOpen = '.js-details-container:not(.open) > .file-header > .file-actions > button';

    $(function() {

        $('body').append(
`<style>
  .btn-collapse-all {
    position: fixed;
    bottom: 0;
    right: 20px;
    opacity: 0.5;
    transition: background .5s;
    padding: 2px 10px;
  }
  .btn-collapse-all:hover {
    opacity: 1;
  }
  ${buttonSelector} {
    width: 150px;
    border: 1px lightgray solid;
    border-radius: 20px;
  }
  .btn-scroll-top { position: fixed; bottom:0; right: 0; padding: 0; height: 26px; width: 20px; text-align: center; }
</style>
<button class="btn-collapse-all btn btn-sm btn-outline">collapse all</button>
<button class="btn-scroll-top btn btn-sm">^</button>`
        );

        $('.btn-scroll-top').on('click', function() { window.scrollTo(0,0); });

        $('.btn-collapse-all').on('click', function() {
            customBtnCollapseAll();
        });

        prependBtnToTools();

        $("body").on('DOMSubtreeModified', ".js-details-container", function() {
            prependBtnToTools();
        });

        function prependBtnToTools() {
            var tools = $('.pr-review-tools');
            if (tools.find('.btn-collapse-all-toolbar-btn').length > 0) return;
            tools.prepend(`
<div class="diffbar-item">
<div class="BtnGroup">
<button type="button" class="btn-collapse-all-toolbar-btn btn btn-sm btn-outline BtnGroup-item">Collapse all</button>
</div>
</div>
`);
            $('.btn-collapse-all-toolbar-btn').on('click', customBtnCollapseAll);
        }
    });

    function customBtnCollapseAll() {
        const buttons = $(buttonSelectorNotOpen);
        // .js-details-container.open > .file-header > .file-actions > button
        console.log('collapseAll length', buttons.length);
        buttons.trigger('click');
    }
})();
