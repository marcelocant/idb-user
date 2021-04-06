var api = {}

api.listUsers = function(req, res) {
    var currentUsers = users.filter(function(user) {
        return user.data;
    });
    res.json(currentUsers);
};

api.createUser = function(req, res) {

   console.log(req.body);
   req.body.data = new Date(req.body.data.replace(/-/g,'/'));
   users.push(req.body);
   res.status(200).json("Negociação recebida");

};



module.exports = api;