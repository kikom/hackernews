/**
 * hackernews.js - Initial endpoint of scraper
 *
 * @author Gene Ponomarenko <kikomdev@gmail.com>
 */

'use strict';

const yargs = require('yargs'),
    getPosts = require('./scraper');

//Get --posts argument and check it
const postsQty = yargs.argv.posts;

if (!postsQty || postsQty <= 0 || postsQty > 100) {
    console.log('argument --posts must be set and positive number not greater than 100.');
    process.exit(1);
}

// start scrapping
getPosts(1, postsQty, [], (err, posts) => {

    if (err) {
        console.log('Something went wrong. Error details: ', err);
        process.exit(1);
    }

    console.log(JSON.stringify(posts, null, 2));
});
