import moongoose from "mongoose";

const subsInfoSchema = new moongoose.Schema({
  msisdn: {
    type: Number,
    required: true,
  },
  fullname: {
    type: String,
    required: true
  },
  lang: String,
});

export default moongoose.model("subsInfo", subsInfoSchema);
