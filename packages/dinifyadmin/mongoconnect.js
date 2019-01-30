import mongoose from 'mongoose';

const mongoURL = 'mongodb://piquerg:KsVN4896bYdGLDBJ@35.204.100.96:27017/main';

export default mongoose.connect(mongoURL, { useNewUrlParser: true });
