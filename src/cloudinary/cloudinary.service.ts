import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import { Injectable } from '@nestjs/common'
import toStream = require('buffer-to-stream')
import { MemoryStoredFile } from 'nestjs-form-data'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {}

  async uploadImage(
    file: MemoryStoredFile
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET')
      })
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          return reject(error)
        }

        return resolve(result!)
      })
      toStream(file.buffer).pipe(upload)
    })
  }
}
