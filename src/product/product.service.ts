import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PRODUC_NAME_EXIST_ERROR } from './constants/product.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) { }

    async getAllProduct() {
        return await this.productModel.find().exec()
    }

    async getProductById(id: string) {
        return await this.productModel.findById(id).exec()
    }

    async getProductByUserId(userId: string) {
        return await this.productModel.find( {userId} ).exec()
    }

    async createNewProduct(createProductDto: CreateProductDto){
        const candidate = await this.productModel.findOne( { name: createProductDto.name } )
        if(candidate){
            throw new BadGatewayException(PRODUC_NAME_EXIST_ERROR)
        }
        return await this.productModel.create(createProductDto)
    }

    async updateProductById(id: string, updateProductDto: CreateProductDto){
        const candidate = await this.productModel.findOne({ name: updateProductDto.name })
        if (candidate) {
            throw new BadGatewayException(PRODUC_NAME_EXIST_ERROR)
        }
        return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true } )
    }

    async deleteProductById(id: string){
        return await this.productModel.findByIdAndDelete(id)
    }
}
