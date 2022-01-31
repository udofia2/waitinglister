
const ListerController = (
  AssetListerModel,
  InvestorModel,
  Mail,
  nodemailer,
  nodemailerSendgrid,
  log
) => {
  const signup = async (req, res) => {
    log(req, res);
    const { email, fullname, lister_type, description } =
      req.body;


    //Declaration of accepted lister types
    const accepted_lister_types = ["investor", "asset lister"];

    try {
      //Check for email and full name
      if (!email || !fullname || lister_type)
        return res.status(442).json({
          status: "fail",
          message:
            "Please confirm that [ email ], [lister_type]  and [ fullname ] is provided",
        });

      //Check that fullname has both first name and last name
      const namechecker = fullname.trim().split(" ");

      if (namechecker.length < 2)
        return res.status(442).json({
          status: "fail",
          message:
            "Please provide your full name [both first and last names], seperated by a space",
        });

      // Checks if lister type is an accepted lister type
    const lister_typeToLowerCase = lister_type.toLowerCase();

      if (
        !lister_type ||
        !accepted_lister_types.includes(lister_typeToLowerCase)
      )
        return res.status(442).json({
          status: "fail",
          message: !lister_typeToLowerCase
            ? "[ lister_type ] required. Accepted list_types include [ 'Investor' or 'Asset lister']"
            : `The provided lister_type [ ${lister_type} ] is not an accepted lister_type. Accepted list_types include [ 'Investor' or 'Asset lister']`,
        });

      // signing up an Asset Lister
      if (lister_typeToLowerCase == accepted_lister_types[1]) {
        // checking for description in asset lister type
        if (!description)
          return res.status(442).json({
            status: "fail",
            message: "asset Description is required",
          });

        const listerExist = await AssetListerModel.findOne({ email: email });

        console.log(listerExist);

        if (listerExist && listerExist.lister_type == accepted_lister_types[1])
          return res.status(400).json({
            status: "fail",
            message: `The lister [ ${email} ] is already registered as ${accepted_lister_types[1]}. Please choose a different email or choose a different lister_type["investor" or "asset lister"]`,
          });

        const lister = new AssetListerModel({
          email,
          fullname,
          lister_type: lister_typeToLowerCase,
          description,
        });

        Mail(req, lister, nodemailer,
  nodemailerSendgrid,);

        await lister.save();

        return res.json(lister);
      }

      // signing up an Investor lister type
      const listerExist = await InvestorModel.findOne({ email: email });

      req.log.info(listerExist);

      if (listerExist && listerExist.lister_type == accepted_lister_types[0])
        return res.status(400).json({
          status: "fail",
          message: `lister [ ${email} ] already registered as ${accepted_lister_types[0]}. Please choose a different email or choose a different lister_type["investor" or "asset lister"]`,
        });

      const lister = new InvestorModel({
        email,
        fullname,
        lister_type: lister_typeToLowerCase,
      });

      await lister.save();

      res.json(lister);
    } catch (error) {
      req.log.info(error);
      res.json(error);
    }
  };

  return {
    signup,
  };
};

export default ListerController;
