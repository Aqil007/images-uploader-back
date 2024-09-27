const mongoose = require("mongoose")
const bcrypt= require("bcrypt")


const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "User already exist"],   
    },
    password:{
        type:String,
        
    }
})

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
userSchema.methods.comparePassword = async function(candidatePassword) {
 return await bcrypt.compare(candidatePassword, this.password);
};
     


module.exports = mongoose.model("users",userSchema)