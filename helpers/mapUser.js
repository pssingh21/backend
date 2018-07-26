module.exports = function(user,userDetails){
	if(userDetails.username)
		user.username = userDetails.username;
	if(userDetails.dateOfBirth)
		user.dateOfBirth = userDetails.dateOfBirth;
	if(userDetails.address)
		user.address = userDetails.address;
	if(userDetails.contactNumber)
		user.contactNumber = userDetails.contactNumber;
	if(userDetails.email)
		user.email = userDetails.email;
	if(userDetails.activeStatus)
		user.onlineStatus =true;
	if(userDetails.inActiveStatus)
		user.onlineStatus = false;
	if(userDetails.role)
		user.role = userDetails.role;

	return user;

}