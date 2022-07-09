import moongoose from "mongoose";

const subsPassSchema = new moongoose.Schema({
  msisdn: {
    type: Number,
    required: true,
  },
  password: String,
});

export default moongoose.model("subsPass", subsPassSchema);
