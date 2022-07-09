import subsPass from "../models/subsPass.js";
import bcrypt from "bcryptjs";

// ====== Get all subscribers password ====== //
export const subsGetPass = async (req, res) => {
  const allSubsPass = await subsPass.find();
  res.status(200).json(allSubsPass);
};

// ======== Create subscriber password ========= //
export const subsCreatePass = async (req, res) => {
  // Checking if the subscriber msisdn is already in the database
  const msisdnExist = await subsPass.findOne({ msisdn: req.body.msisdn });
  if (msisdnExist)
    return res
      .status(400)
      .send(`This msisdn: ${msisdnExist.msisdn} already exists`);

  // Hash passwords
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newSubs = new subsPass({
    msisdn: req.body.msisdn,
    password: hashedPassword,
  });
  try {
    await newSubs.save();
    return res
      .status(200)
      .send(`Subscriber with msisdn: ${newSubs.msisdn} successfully created`);
  } catch (err) {
    return res.status(400).send(`Msisdn is required`);
  }
};

// ====== Get with msisdn ======== //
export const subsGetPassByMsisdn = async (req, res) => {
  const foundMsisdn = await subsPass.findOne({ msisdn: req.params.msisdn });
  if (foundMsisdn == null) {
    return res.send(`Subscriber with msisdn: ${req.params.msisdn} not found`);
  }
  return res.status(200).json(foundMsisdn);
};

// ======= Delete by msisdn ====== //
export const subsDeletePass = async (req, res) => {
  try {
    const foundSubs = await subsPass.findOneAndDelete({
      msisdn: req.params.msisdn,
    });
    return res
      .status(200)
      .send(`Subscriber with msisdn: ${foundSubs.msisdn} deleted`);
  } catch (err) {
    return res.status(400).send("Subscriber not found");
  }
};
