const catchAsync = require('../utils/catchAsync');
const { google } = require('googleapis');
const AppError = require('../utils/AppError');
const { Readable } = require('stream');
const pkey = require('../pk.json');
const folder = "1ed5C1_0kFJrptpdO0VeXHjZHqO1y5h-y";
const buffetToStream = (buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};
exports.seedImage = catchAsync(async (req,res,next)=>{
    if (!req.file){
        return res.status(400).send('image must be uploaded.');
    }
    const auth = new google.auth.GoogleAuth({
        credentials: {
            type: pkey.type,
            project_id: pkey.project_id,
            private_key_id: pkey.private_key_id,
            private_key:pkey.private_key,
            client_email: pkey.client_email,
            client_id: pkey.client_id,
            auth_uri: pkey.auth_uri,
            token_uri: pkey.token_uri,
            auth_provider_x509_cert_url:pkey.auth_provider_x509_cert_url,
            client_x509_cert_url: pkey.client_x509_cert_url,
        },
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const driveService = google.drive({
        version: 'v3',
        auth,
    });
    const fileMetaDataSeed = {
        name: `${req.body.name} Seed ${Date.now()}`,
        parents: [folder],
    };
    const mediaSeed = {
        mimeType: req.file.mimetype,
        body: buffetToStream(req.file.buffer),
    };
    const response = await driveService.files.create({
        resource: fileMetaDataSeed,
        media: mediaSeed,
        fields: 'id, webViewLink',
    });
    const url = `https://drive.google.com/thumbnail?id=${response.data.id}&sz=w1000`;
    req.url = url;
    next();
});
exports.uploadFilesDrive = catchAsync(async (req, res, next) => {
    
    if (!req.files || !req.files['farmerCard'] || !req.files['profile']) {
        return res.status(400).send('Both images must be uploaded.');
      }
   
    const fileFarmerCard = req.files["farmerCard"][0];
    const fileProfile = req.files["profile"][0];
    const auth = new google.auth.GoogleAuth({
        credentials: {
            type: pkey.type,
            project_id: pkey.project_id,
            private_key_id: pkey.private_key_id,
            private_key:pkey.private_key,
            client_email: pkey.client_email,
            client_id: pkey.client_id,
            auth_uri: pkey.auth_uri,
            token_uri: pkey.token_uri,
            auth_provider_x509_cert_url:pkey.auth_provider_x509_cert_url,
            client_x509_cert_url: pkey.client_x509_cert_url,
        },
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const driveService = google.drive({
        version: 'v3',
        auth,
    });
    const fileMetaDataFarmerCard = {
        name: `${req.body.nationalId} farmerCard ${Date.now()}`,
        parents: [folder],
    };
    const fileMetaDataProfile = {
        name: `${req.body.nationalId} Profile ${Date.now()}`,
        parents: [folder],
    };
    const mediaFarmerCard = {
        mimeType: fileFarmerCard.mimetype,
        body: buffetToStream(fileFarmerCard.buffer),
    };
    const mediaProfile = {
        mimeType: fileProfile.mimetype,
        body: buffetToStream(fileProfile.buffer),
    };
    const responseCard = await driveService.files.create({
        resource: fileMetaDataFarmerCard,
        media: mediaFarmerCard,
        fields: 'id, webViewLink',
    });
    const responseProfile = await driveService.files.create({
        resource: fileMetaDataProfile,
        media: mediaProfile,
        fields: 'id, webViewLink',
    });
    console.log(responseProfile);
    const urlCard = `https://drive.google.com/thumbnail?id=${responseCard.data.id}&sz=w1000`;
    const urlProfile = `https://drive.google.com/thumbnail?id=${responseProfile.data.id}&sz=w1000`;
    req.farmerCard = urlCard;
    req.profile = urlProfile;
    next()
});