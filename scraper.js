/**
 * scrapper.js - Parse hacker news and generates list of posts
 *
 * @author Gene Ponomarenko <kikomdev@gmail.com>
 */

'use strict';

const request = require('request'),
    cheerio = require('cheerio'),
    Validator = require('jsonschema').Validator;

const v = new Validator();

const mainUrl = 'https://news.ycombinator.com';


/**
 * Main function that recursively scrapping news feed and forms required amount of posts
 */
function getPosts(page, postsQty, posts, callback) {

    request.get(mainUrl +'/news?p=' + page, (err, res, body) => {

        if (err) console.log('Something went wrong. Error details: ', err);

        let $ = cheerio.load(body);
        $('.itemlist tr.athing').each((index, element) => {

            let itemId = $(element).attr('id'),
                additionalItem = $('.subtext > #score_' + itemId).parent();

            let post = {
                title: $(element).children('.title').last().text(),
                uri: $('.title > a', element).attr('href'),
                author: $('.hnuser', additionalItem).text(),
                points: parseInt($('.score', additionalItem).text()) || 0,
                comments: parseInt($(additionalItem).children('a').last().text()) || 0,
                rank: parseInt($('.rank', element).text())
            };

            //Add only valid posts
            if (checkPost(post)) {
                posts.push(post);
            }

            //stop iteration if enough
            return posts.length < postsQty;
        });

        // If not enough posts qty parse next page
        if (posts.length < postsQty) {
            getPosts(page+1, postsQty, posts, callback);
        } else {
            return callback(null, posts);
        }
    });
}


/**
 * Validate post
 */
function checkPost(post) {

    const schema = {
        type: 'object',
        properties: {
            title: {
                type: 'string',
                minLength: 1,
                maxLength: 256
            },
            uri: {
                type: 'string',
                format: 'uri'
            },
            author: {
                type: 'string',
                minLength: 1,
                maxLength: 256
            },
            points: {
                type: 'integer',
                minimum: 0
            },
            comments: {
                type: 'integer',
                minimum: 0
            },
            rank: {
                type: 'integer',
                minimum: 0
            }
        },
        required: ['title', 'uri', 'points', 'comments', 'rank']
    };

    return v.validate(post, schema).valid;
}

module.exports = getPosts;