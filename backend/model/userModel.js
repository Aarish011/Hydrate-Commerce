import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    cartData: {
      type: Object,
      default: {},
    },

    // Address field for storing user's shipping address
    address: {
      firstName: {
        type: String,
        default: '',
      },
      lastName: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        default: '',
      },
      street: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
      state: {
        type: String,
        default: '',
      },
      zipcode: {
        type: String,
        default: '',
      },
      country: {
        type: String,
        default: '',
      },
      phone: {
        type: String,
        default: '',
      },
    },

    // Phone field for direct access (optional - can use address.phone instead)
    phone: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
