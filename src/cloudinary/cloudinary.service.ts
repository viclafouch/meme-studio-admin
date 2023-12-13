import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2
} from 'cloudinary'
import { Injectable } from '@nestjs/common'
import toStream = require('buffer-to-stream')
import { MemoryStoredFile } from 'nestjs-form-data'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {}

  private getAuthV2() {
    v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET')
    })

    return v2
  }

  async uploadImage(
    file: MemoryStoredFile,
    options: UploadApiOptions = {}
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.getAuthV2().uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            return reject(error)
          }

          return resolve(result!)
        }
      )
      toStream(file.buffer).pipe(upload)
    })
  }

  async removeFile(publicId: string) {
    return v2.uploader.destroy(publicId, {
      invalidate: true,
      resource_type: 'image'
    })
  }
}
