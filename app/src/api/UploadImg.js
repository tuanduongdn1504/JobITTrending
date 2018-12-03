import { ImageEditor, Image } from 'react-native';

export default async function uploadImage(img) {
  const uri = await cropImage(img);
  console.log('uri', uri);
  // call upload api here
}

function cropImage(uri) {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (x, y) => {
        const cropData = {
          size: { width: x, height: y },
          displaySize: { width: 100, height: (y * 100) / x },
          resizeMode: 'contain',
        };
        ImageEditor.cropImage(
          uri,
          cropData,
          (successURI) => {
            resolve(successURI);
          },
          (err) => {
            // console.log(err);
            reject(err);
          },
        );
      },
      (err) => {
        // console.log(err);
        reject(err);
      },
    );
  });
}
