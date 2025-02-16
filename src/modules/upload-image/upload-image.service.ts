import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload-image.response';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadImageService {
  // uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
  //   return new Promise<CloudinaryResponse>((resolve, reject) => {
  //     const uploadStream = cloudinary.uploader.upload_stream(
  //       (error, result) => {
  //         if (error) reject(error);
  //         resolve(result);
  //       },
  //     );
  //     streamifier.createReadStream(file.buffer).pipe(uploadStream);
  //   });
  // }

  async updateProductImage(
    productId: string,
    file: Express.Multer.File
  ): Promise<CloudinaryResponse> {
    try {
      // if (!file.mimetype.startsWith('image/')) {
      //   throw new BadRequestException('El archivo debe ser una imagen');
      // }

      const fullPublicId = `pos-nest/products/product-${productId}`;
      try {
        await this.deleteImage(fullPublicId);
      } catch (error) {
        // Si no existe una imagen previa, continuamos sin problemas
        console.log('No se encontró imagen previa para eliminar');
      }

      return await this.uploadImage(file, productId);
    } catch (error) {
      throw new BadRequestException(
        `Error al actualizar la imagen del producto ${productId}: ${error.message}`
      );
    }
  }

  private async uploadImage(
    file: Express.Multer.File,
    productId: string
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'pos-nest/products',
          public_id: `product-${productId}`,
          overwrite: true,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  private async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Error al eliminar la imagen: ${error.message}`);
    }
  }
}
