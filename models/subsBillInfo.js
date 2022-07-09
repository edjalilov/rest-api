import moongoose from "mongoose";

const subsBillInfoSchema = new moongoose.Schema({
  tariff: String,
  minutes: Number,
  megabytes: Number,
  sms: Number,
  msisdn: {
    type: Number,
    required: true,
  },
});

export default moongoose.model("subsBillInfo", subsBillInfoSchema);
