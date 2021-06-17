const User = require('./User');
const Band = require('./Band');
const Comment = require('./Comment');
const Role = require('./Role');
const Genre = require('./Genre');
const Show = require('./Show');


// User.hasMany(Show, {
//     foreignKey: 'user_id'
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// });

// User.hasOne(Role, {
//     foreignKey: 'role_id'
// });

// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// Comment.belongsTo(Band, {
//     foreignKey: 'band_id'
// });

// Comment.belongsTo(Role, {
//     foreignKey: 'role_id'
// });

// Role.belongsTo(User, {
//     foreignKey: 'role_id'
// });

// Band.belongsTo(Show, {
//     foreignKey: 'band_id'
// });

// Show.hasMany(Genre, {
//     foreignKey: 'genre'
// });

// Genre.belongsTo(Show);

module.exports = { User, Band, Comment, Genre, Role, Show};