import subsBillInfo from "../models/subsBillInfo.js";

// ====== Get all billing info ====== //
export const subsGetBillInfo = async (req, res) => {
  const allBillInfos = await subsBillInfo.find();
  res.status(200).json(allBillInfos);
};

// ======== Create billing info ========= //
export const subsCreateBillInfo = async (req, res) => {
  const msisdnExist = await subsBillInfo.findOne({ msisdn: req.body.msisdn });
  if (msisdnExist)
    return res
      .status(400)
      .send(`This msisdn: ${msisdnExist.msisdn} already exists`);

  const newBillInfo = new subsBillInfo(req.body);
  try {
    await newBillInfo.save();
    return res.status(200).send(`Subscriber billing info successfully created`);
  } catch (err) {
    return res.status(400).send(`Msisdn is required`);
  }
};

// ====== Get with msisdn ======== //
export const subsGetBillInfoByMsisdn = async (req, res) => {
  const foundMsisdn = await subsBillInfo.findOne({
    msisdn: req.params.msisdn,
  });
  if (foundMsisdn == null) {
    return res.send(
      `Subscriber billing info with msisdn: ${req.params.msisdn} not found`
    );
  }

  return res.status(200).json(foundMsisdn);
};

// ======= Delete by msisdn ====== //
export const subsDeleteBillInfo = async (req, res) => {
  try {
    const foundMsisdn = await subsBillInfo.findOneAndDelete({
      msisdn: req.params.msisdn,
    });
    return res
      .status(200)
      .send(
        `Subscriber billing info with msisdn: ${foundMsisdn.msisdn} deleted`
      );
  } catch (err) {
    return res.status(400).send(`Subscriber not found`);
  }
};
