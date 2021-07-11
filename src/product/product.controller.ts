import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth-jwt-guard';
import { IdValidPipe } from 'src/pipes/id-validation.pipe.ts';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @UseGuards(JWTAuthGuard)
    @Get('all')
    async getAllProducts() {
        return this.productService.getAllProduct()
    }

    @UseGuards(JWTAuthGuard)
    @Get(':id')
    async getProductById(@Param('id', IdValidPipe) id: string){
        return this.productService.getProductById(id)
    }

    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    @Get('userId/:userId')
    async getProductByUserId(@Param('userId', IdValidPipe) userId: string) {
        return this.productService.getProductByUserId(userId)
    }

    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async createNewProduct(@Body() createProductDto: CreateProductDto){
        return this.productService.createNewProduct(createProductDto)
    }

    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch('update/:id')
    async updateProductById(@Param('id', IdValidPipe) id: string, @Body() updateProductDto: CreateProductDto){
        return this.productService.updateProductById(id, updateProductDto)
    }

    @UseGuards(JWTAuthGuard)
    @Delete('delete/:id')
    async deleteProductById(@Param('id', IdValidPipe) id: string){
        return this.productService.deleteProductById(id)
    }
}
