import mongoose from 'mongoose';
import ROLE from '../enum/role.enum';

const Schema = mongoose.Schema;
const model = mongoose.model;

const profile_imgs_collections_list = ["shapes"];

const profile_imgs_name_list = [
  "ellipse",
  "ellipseFilled",
  "line",
  "polygon",
  "polygonFilled",
  "rectangle",
  "rectangleFilled",
];

const userSchema = new Schema({
    role: {
        type: String,
        default: ROLE.MEMBER,
        enum: [ROLE.ADMIN,ROLE.INOVATOR,ROLE.MEMBER],
    },
    fullname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : false
    },
    provider : {
        type : String,
        default : 'local'
    },

    profile: {
        type: String,
        // get a random profile image from dicebear
  
        default: () => {
          return `https://api.dicebear.com/9.x/${
            profile_imgs_collections_list[
              Math.floor(Math.random() * profile_imgs_collections_list.length)
            ]
          }/svg?seed=${
            profile_imgs_name_list[
              Math.floor(Math.random() * profile_imgs_name_list.length)
            ]
          }`;
        },
      },

    address: {
        type: String,
        default: "",
      },
    phonenumber: {
            type: String,
            default: "",
    },


    //  password management
    forgotPassword: {
        type: String,
        default: "",
    },
    resetPassword: {
        type: String,
        default: "",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    
})

userSchema.pre('save',function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password,10,
            function(err,hashedPassword){
                if(err){
                    next(err);
                }else{
                    document.password = hashedPassword;
                    next();
                }
            }
        )
    }else{
        next();
    }
})

userSchema.index({
    email: 1,
    username: 1,
  },
  {
    unique: true,
 }
)
const UserModel = model('users',userSchema);

UserModel.createIndexes()
export default UserModel;
