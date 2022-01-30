import mongoose from "mongoose";

const assetListerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /[\w]+?@[\w]+?\.[a-z]{2,4}/,
        "The value of path {PATH} ({VALUE}) is not a valid email address.",
      ],
    },
    first_name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    lister_type: {
    type: String,
    enum: {
      values: ['Investors', 'Asset listers'],
      message: '{VALUE} is not supported'
    }
  },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AssetLister = mongoose.model("assetlisters", assetListerSchema);

export default AssetLister;
