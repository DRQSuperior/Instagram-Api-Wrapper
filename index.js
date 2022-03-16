const request = require('request');
const json = require('json');

//working
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

//working
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

//working
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

//working
function getPostsAmount(username) {
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

//working
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

//working
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

//working
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

//not sure if works
function getLikes(username, postId) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/p/${postId}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.shortcode_media.edge_media_preview_like.count);
            }
        });
    });
}

//not sure if works
function getComments(username, postId) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/p/${postId}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.shortcode_media.edge_media_to_comment.count);
            }
        });
    });
}

//not sure if works
function getPostPicture(username, postId) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/p/${postId}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.shortcode_media.display_url);
            }
        });
    });
}

//not sure if works
function getPostVideo(username, postId) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/p/${postId}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.shortcode_media.video_url);
            }
        });
    });
}

//not sure if works
function getPostType(username, postId) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/p/${postId}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                let type = JSON.parse(body).graphql.shortcode_media.is_video ? 'video' : 'picture';
                resolve(type);
            }
        });
    });
}

//not sure if works
function getPostId(url) {
    return new Promise((resolve, reject) => {
        let id = url.split('/')[4];
        resolve(id);
    });
}

//not working
function getAccountCreatedDate(username) {
    return new Promise((resolve, reject) => {
        let url = `https://www.instagram.com/${username}/?__a=1`;
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).graphql.user.edge_owner_to_timeline_media.edges[0].node.taken_at_timestamp);
            }
        });
    });
}
