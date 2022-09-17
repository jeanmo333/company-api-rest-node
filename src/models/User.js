import pkg from 'mongoose';
const {Schema, model} = pkg;
import bcrypt from "bcryptjs";


const userSchema =new Schema({
    username:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
      },
    roles:[{
        type: Schema.Types.ObjectId,
        ref: "roles"
    }]
},
{
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  userSchema.methods.comparePassword = async function (
    passwordFormulario
  ) {
    return await bcrypt.compare(passwordFormulario, this.password);
  };



export default model('Users', userSchema);