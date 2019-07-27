const middlewareObj = {
    loggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect("/login");
        }
    },
    
    isUser: function(req, res, next){
        if(req.user.id === req.params.id){
            return next();
        }else{
            req.flash("error", "Can't find profile, or profile is not yours.")
	        return res.redirect("/")
        }
    },
    
    userToLowercase: function(req, res, next){
        req.body.username = req.body.username.toLowerCase();
        next();
    }
};

module.exports = middlewareObj;
