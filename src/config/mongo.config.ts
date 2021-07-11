import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';


export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions()
    }
};

const getMongoString = (configService: ConfigService) =>
    'mongodb+srv://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    '/' +
    configService.get('MONGO_DATABASE') +
    "?retryWrites=true&w=majority";

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})