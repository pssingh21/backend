module.exports = function(user, userDetails) {
    if (userDetails.username)
        user.username = userDetails.username;
    if (userDetails.address)
        user.address = userDetails.address;
    if (userDetails.contactNumber)
        user.contactNumber = userDetails.contactNumber;
    if (userDetails.email)
        user.email = userDetails.email;
    if (userDetails.activeStatus)
        user.onlineStatus = true;
    if (userDetails.inActiveStatus)
        user.onlineStatus = false;
    if (userDetails.role)
        user.role = userDetails.role;
    if (userDetails.roles)
        user.roles = userDetails.roles;
    return user;

}