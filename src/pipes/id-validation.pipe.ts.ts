import { ArgumentMetadata, BadGatewayException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ID_VALIDATION_PIPE_ERROR } from './pipes.constant';

@Injectable()
export class IdValidPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if(metadata.type !== 'param'){
            return value;
        }
        if(!Types.ObjectId.isValid(value)){
            throw new BadGatewayException(ID_VALIDATION_PIPE_ERROR)
        }
        return value
    }
}