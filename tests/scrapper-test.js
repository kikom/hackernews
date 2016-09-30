'use strict';
const chai = require('chai'),
    expect = chai.expect;

const getPosts = require('../scrapper');

describe('getPosts', () => {
    it('should return determined quantity of valid posts', (done) => {
        getPosts(1, 10, [], (err, posts) => {
            expect(posts.length).to.equal(10);
            done();
        })
    })
});

