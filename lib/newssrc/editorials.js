'use strict';
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function edsHindu(url, cb) {
  requestContent(url).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.100_4x_2EditorialStories')
      .find('h2')
      .find('a')
      .each(function(i, elem) {
        var article = {
          heading: $(this)
            .text()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsET(url, cb) {
  requestContent(url).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('div.content')
      .find('a')
      .each(function(i, elem) {
        if (i > 4) {
          return false;
        }
        var article = {
          heading: $(this).attr('title'),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsHBL(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('article.editorial')
      .find('a:first-child')
      .each(function(i, elem) {
        if (i > 4) {
          return false;
        }
        var article = {
          heading: $(this).text(),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsIndExp(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('div.m-article-landing__inner')
      .find('h2')
      .find('a')
      .each(function(i, elem) {
        if (i > 3) {
          return false;
        }
        var article = {
          heading: $(this).attr('title'),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsGuardian(url, cb) {
  requestContent(url).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.fc-item__content').each(function(i, elem) {
      if (i > 3) {
        return false;
      }
      var article = {
        heading: $(this)
          .find('a')
          .text()
          .replace(/\n/g, ''),
        link: $(this)
          .find('a')
          .attr('href')
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

module.exports = {
  edsHindu: edsHindu,
  edsET: edsET,
  edsIE: edsIndExp,
  edsHBL: edsHBL,
  edsGuardian: edsGuardian
};