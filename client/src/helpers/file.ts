import { FileExtensions } from '../constants/file'

function bytesToMegaBytes(bytes: number) {
  return bytes / (1024 * 1024)
}

export function matchIsExtensions(
  allowedExtension: readonly FileExtensions[],
  filename: string
): boolean {
  return allowedExtension.some((extension) => {
    const ext = filename.split('.').pop()

    if (ext === undefined) {
      return false
    }

    return `.${ext}`.startsWith(extension)
  })
}

function matchIsSizeAccepted(acceptedSizeInMb: number, bytes: number) {
  const fileSizeInMb = bytesToMegaBytes(bytes)

  return fileSizeInMb <= acceptedSizeInMb
}

export function matchIsValidFilesExtension(
  files: readonly File[],
  allowedExtension: readonly FileExtensions[] | '*'
): boolean {
  if (allowedExtension === '*') {
    return true
  }

  return files.every((file) => {
    return matchIsExtensions(allowedExtension, file.name)
  })
}

export function matchIsValidFilesSize(
  files: readonly File[],
  sizeInMb: number
) {
  return files.every((file) => {
    return matchIsSizeAccepted(sizeInMb, file.size)
  })
}

export function joinFileExtensions(extensions: readonly FileExtensions[]) {
  return extensions.join(', ')
}

export function matchIsValidFilesLength(
  files: readonly File[],
  maxLength: number
) {
  if (maxLength === 0) {
    return true
  }

  return files.length === maxLength
}

export function matchIsFile(value: unknown): value is File {
  return value instanceof File
}
