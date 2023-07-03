import { Connection, PublicKey } from '@_koi/web3.js';

const stakingKeyToPublicKey = async (stakingKey) => {
  try {
    const connection = new Connection('https://k2-testnet.koii.live');
    const publicKey = new PublicKey(stakingKey);

    const response = await connection.getConfirmedSignaturesForAddress2(publicKey, {
      commitment: 'confirmed'
    });

    const feePayer = await getConfirmedTransaction(response[0].signature, connection);
    return feePayer;

  } catch (error) {
    console.error(error);
  }
};

const getConfirmedTransaction = async (signature, connection) => {
  try {
    const transaction = await connection.getConfirmedTransaction(signature, 'confirmed');
    return transaction.transaction.feePayer;
  } catch (error) {
    console.error(error);
  }
};

const convertToString = (publicKey) => {
  if (!publicKey) {
    throw new Error('Invalid public key provided.');
  }

  const hexString = publicKey._bn.toString('hex');
  return hexString;
};

const convertToBase58 = (publicKeyString) => {
  const publicKeyBytes = Buffer.from(publicKeyString, 'hex');
  const base58Key = bs58.encode(publicKeyBytes);
  return base58Key;
};
const getKey = async (key) => {
  try {
    const publicKey = await stakingKeyToPublicKey(key);
    return publicKey;
  } catch (error) {
    console.error('Error occurred while converting address to key:', error);
    return '';
  }
};

(async () => {
  const address = '2aBZicguCRfp5ivhm3n1yZv6KAJvkbkFQV94hQvnP2Mg';
  const key = await getKey(address);
  console.log(`Key for the address ${address} is: ${key}`);
})().catch(console.error);
