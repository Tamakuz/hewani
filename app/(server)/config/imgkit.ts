import ImageKit from "imagekit";

// Buat instance ImageKit dengan kredensial yang sudah ada
const imagekit = new ImageKit({
  publicKey: "public_AehC/obgZBbd2iGqKO7/9pc3TXY=",
  privateKey: "private_EVMmtwvqAKA6/K0EVuqG/bEhBpQ=",
  urlEndpoint: "https://ik.imagekit.io/tamakuz",
});

export default imagekit;
