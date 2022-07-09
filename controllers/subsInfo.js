import subsInfo from "../models/subsInfo.js";

// ====== Get all subscriber info ====== //
export const subsGetInfo = async (req, res) => {
  const allSubsInfos = await subsInfo.find();
  res.status(200).json(allSubsInfos);
};

// ======== Create subscriber info ========= //


export const subsCreateInfo = async (req, res) => {
  const msisdnExist = await subsInfo.findOne({ msisdn: req.body.msisdn });
  if (msisdnExist)
    return res
      .status(400)
      .send(`This msisdn: ${msisdnExist.msisdn} already exists`);

  const newSubsInfo = new subsInfo(req.body);
  try {
    await newSubsInfo.save();
    return res
      .status(200)
      .send(
        `Subscriber with the msisdn: ${newSubsInfo.msisdn} successfully created`
      );
  } catch (err) {
    return res.status(400).send(`Msisdn is required`);
  }
};

// ====== Get with msisdn ======== //
export const subsGetByMsisdn = async (req, res) => {
  const foundMsisdn = await subsInfo.findOne({ msisdn: req.params.msisdn });
  if (foundMsisdn == null) {
    return res
      .status(400)
      .send(`Subscriber with msisdn: ${req.params.msisdn} not found`);
  }

  return res.status(200).json(foundMsisdn);
};

// ====== Delete by msisdn ======//
export const subsDeleteInfo = async (req, res) => {
  try {
    const foundMsisdn = await subsInfo.findOneAndDelete({
      msisdn: req.params.msisdn,
    });
    return res
      .status(200)
      .send(`Subscriber with msisdn: ${foundMsisdn.msisdn} deleted`);
  } catch (err) {
    return res.status(400).send(`Subscriber not found`);
  }
};

// ====== Update by msisdn ======//
export const subsUpdateInfo = async (req, res) => {
  try {
    await subsInfo.updateOne({ msisdn: req.params.msisdn }, { $set: req.body });
    return res
      .status(200)
      .send(`Subscriber with msisdn: ${req.params.msisdn} has been updated`);
  } catch (err) {
    return res.status(400).send("Subscriber not found");
  }
};
