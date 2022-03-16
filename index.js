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


