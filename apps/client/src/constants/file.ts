export enum FileExtensions {
  png = '.png',
  jpeg = '.jpeg',
  jpg = '.jpg',
  mp4 = '.mp4',
  xlsx = '.xlsx',
  csv = '.csv',
  mkv = '.mkv',
  avi = '.avi',
  flv = '.flv',
  mov = '.mov',
  wmv = '.wmv',
  mpeg = '.mpeg',
  gif = '.gif',
  svg = '.svg',
  pdf = '.pdf',
  json = '.json'
}

export const DEFAULT_IMAGE_EXTENSIONS = [
  FileExtensions.png,
  FileExtensions.jpeg,
  FileExtensions.jpg
] as const satisfies FileExtensions[]

export const DEFAULT_VIDEO_EXTENSIONS = [
  FileExtensions.mp4
] as const satisfies FileExtensions[]

export const KNOWN_FILE_TYPES = {
  video: [
    FileExtensions.mp4,
    FileExtensions.mkv,
    FileExtensions.avi,
    FileExtensions.flv,
    FileExtensions.mov,
    FileExtensions.wmv,
    FileExtensions.mpeg
  ],
  image: [
    FileExtensions.png,
    FileExtensions.jpg,
    FileExtensions.jpeg,
    FileExtensions.gif,
    FileExtensions.svg
  ]
} as const satisfies Record<string, FileExtensions[]>
