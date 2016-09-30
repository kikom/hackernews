# Hacker news scrapper

Little script that parses haker news site and forms list of posts with necessary data in JSON format.

## Installation
`(note) All of this installation steps decribed for debian distributives. If you have another OS type, you can google how to do it for your system`

First of all you need to clone this repo to your computer:

```sh
$ cd /your/workspace/directory
$ git clone https://github.com/kikom/hackernews.git
$ cd hackernews
```

This script needs latest LTS node.js, so you can install it in this way:

```sh
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Next step - you need to install dependencies of app:
```sh
$ npm install
```

And at last you  can run script by this command(quantity of necessary posts you need specify in --posts argument):

```sh
$ node hakernews.js --posts 10
```

## Tests

To run tests you need install mocha library(globally):

```sh
$ sudo npm install mocha -g
```

You can run tests simply by typing

```sh
$ npm test
```

## Docker

You can also run this script in docker container. To do this you have to be installed docker in system. How to do it you can find here: https://docs.docker.com/engine/installation/linux/ubuntulinux/

Firts of all you need to build image:

```sh
$ docker build -t hackernews .
```

Then you can run container:

```sh
$ docker run hackernews --posts 10
```

## Tech
This script uses several npm packages:
 - `yargs` - used to simpe parsing of command line args
 - `request` - used to make simple requests 
 - `cheerio` - helps to navigate over HTML DOM(like jquery, but on serverside)
 - `jsonschema` - helps to validate objects 