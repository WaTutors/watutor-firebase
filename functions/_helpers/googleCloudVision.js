// NOTE function name derived from https://vision.googleapis.com/v1/images:annotate

exports.annotate = async (gcsSourceUri) => {
  const { ImageAnnotatorClient } = require('@google-cloud/vision');
  const client = new ImageAnnotatorClient();
  try {
    const [result] = await client.textDetection(gcsSourceUri);
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};
