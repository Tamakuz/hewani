import ImageKit from "imagekit";

// Buat instance ImageKit dengan kredensial yang sudah ada
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
});

export default imagekit;
