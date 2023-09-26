import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewURlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Connected Succesfully`);
  } catch (err) {
    console.log(`DB error: ${err}`);
  }
};

export default dbConnection;
