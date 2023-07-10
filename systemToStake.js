import { Connection, PublicKey } from '@_koi/web3.js';
import bs58 from 'bs58'

const systemKey = async (pubkey) => {
  try {
    const connection = new Connection('https://k2-testnet.koii.live');
    const publicKey = new PublicKey(pubkey);

    const response = await connection.getConfirmedSignaturesForAddress2(publicKey, {
      commitment: 'confirmed'
    });

   // console.log(response)
    const feePayer = await getConfirmedTransaction(response[1].signature, connection);
    const feePayerString = feePayer.toString();
    console.log(feePayerString);

  } catch (error) {
    console.error(error);
  }
};

const getConfirmedTransaction = async (signature, connection) => {
  try {
    const transaction = await connection.getConfirmedTransaction(signature, 'confirmed');
    return(convertToBase58(convertToString(transaction.transaction.signatures[1].publicKey)))
  
  } catch (error) {
    console.error(error);
  }
};

const convertToString = (publicKey) => {
  if (!publicKey) {
    throw new Error("Invalid public key provided.");
  }

  const hexString = publicKey._bn.toString("hex");
  return hexString;
};
const convertToBase58 = (publicKeyString) => {
  const publicKeyBytes = Buffer.from(publicKeyString, "hex");
  const base58Key = bs58.encode(publicKeyBytes);
  return base58Key;
};

systemKey("AaGpuXDz2TSUddKrJoQ1pK92sXF9RbjV2kPRjyJnS8kN");


