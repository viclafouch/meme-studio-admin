import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile
} from 'nestjs-form-data'

export class MemeDto {
  @IsFile()
  @MaxFileSize(1e8)
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile

  width: number

  height: number
}
