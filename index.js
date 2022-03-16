//import file insta_wrapper.js
const instagram = require('./insta_wrapper');
const { Client, Intents, Collection , MessageAttachment, MessageEmbed} = require('discord.js');
const { prefix, token } = require("./config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });
const fs = require("fs");
const request = require('request');

function getAvatarByUrl(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.profile_pic_url_hd);
            }
        });
    });
}

function getFollowers(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.edge_followed_by.count);
            }
        });
    });
}

function getFollowing(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.edge_follow.count);
            }
        });
    });
}

function getPosts(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.edge_owner_to_timeline_media.count);
            }
        });
    });
}

function isPrivate(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.is_private);
            }
        });
    });
}

function getBio(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.biography);
            }
        });
    });
}

function getName(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.full_name);
            }
        });
    });
}

//getavatar
client.on('message', async message => {
    if (message.content.startsWith(prefix + "getavatar")) {
        let args = message.content.split(" ");
        let username = args[1];
        if (!username) {
            message.channel.send("Please enter a username");
        } else {
            getAvatarByUrl(username).then(avatar => {
                message.channel.send(avatar);
            }).catch(err => {
                message.channel.send("Error: " + err);
            });
        }
    }
});


client.on("ready", () => {
  console.log('CODED BY DRQSuperior © 2023')
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`ego | Made by DRQSuperior`, { type: "LISTENING"})
});

//create a check command that checks instagram
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "check") {
        const username = args.join(" ");
        if (!username) return message.channel.send("Please enter a username");
        const avatar = await getAvatarByUrl(username);
        const followers = await getFollowers(username);
        const following = await getFollowing(username);
        const posts = await getPosts(username);
        const isPrivate = await isPrivate(username);
        const embed = new MessageEmbed()
            .setTitle(`${username}'s Instagram Profile`)
            .setColor("#00ff00")
            .setThumbnail(avatar)
            .addField("Followers", followers, true)
            .addField("Following", following, true)
            .addField("Posts", posts, true)
            .addField("Is Private", isPrivate, true);
        message.channel.send(embed);
    }
});


client.login(token);