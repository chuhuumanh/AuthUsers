function checkValidate(req,user){
req.checkBody('email',"Email không được bỏ trống").notEmpty();
req.checkBody('email',"Email không hợp lệ").matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
req.checkBody('password',"Password không được bỏ trống").notEmpty();
req.checkBody('password',"Pass  ngắn quá rồi").len(7)
return req.validationErrors();
};
module.exports = {
    checkValidate : checkValidate
}