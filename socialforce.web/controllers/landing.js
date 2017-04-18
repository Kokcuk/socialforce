exports.index = function(req, res){
    if(req.user){
        res.redirect("/dashboard");
    } else {
        res.render("landing/index", {layout:"layouts/layout_landing"});
    }
};