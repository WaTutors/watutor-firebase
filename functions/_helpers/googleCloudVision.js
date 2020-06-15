// NOTE function name derived from https://vision.googleapis.com/v1/images:annotate

exports.annotate = async (gcsSourceUri) => {
    const { ImageAnnotatorClient } = require('@google-cloud/vision');
    // const client = new ImageAnnotatorClient();
    // FIXME
    const client = new ImageAnnotatorClient({
        keyFilename: '/Users/jessechick/Work/watutor/watutors-1-firebase-adminsdk-b98g3-e7cc53afec.json'
    });
    try {
        const [result] = await client.textDetection(gcsSourceUri);
        return result;
    } catch (err) {
        console.error(err);
        return result;
    }
};

