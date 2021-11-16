import multer, { StorageEngine } from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

import { env } from '@shared/env';
import AppError from '@shared/errors/AppError';
import { i18n } from '@shared/internationalization';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3' | 'digitalOcean';
  tmpFolder: string;
  uplodsFolder: string;
  multer: {
    storage: StorageEngine;
    limits: {
      fileSize: number;
    };
  };
  config: {
    disk: any;
    aws: {
      bucket: string;
    };
    digitalOcean: {
      bucket: string;
    };
  };
}

const uploadConfig = {
  driver: env?.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uplodsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      async filename(request, file, callback) {
        if (!file) {
          return callback(new AppError(i18n('validations.enter_the_data_file')), '');
        }
        const fileTypeExtension: any[] = file.mimetype.split('/');
        if (!fileTypeExtension || fileTypeExtension.length < 1) {
          return callback(new AppError(i18n('validations.invalid_file')), '');
        }
        const typeFile: string = fileTypeExtension[0];
        if (typeFile !== 'image') {
          return callback(new AppError(i18n('validations.invalid_file')), '');
        }
        const extensionFile: string = fileTypeExtension[1];
        const validExtensions = ['png', 'jpg', 'jpeg', 'ico'];
        if (!extensionFile || !validExtensions.includes(extensionFile.toLowerCase())) {
          return callback(new AppError(`${i18n('validations.invalid_extension')} ${validExtensions.join(', ')}`), '');
        }
        const fileName = `${uuid()}.${extensionFile.toLowerCase()}`;
        return callback(null, fileName);
      },
    }),
    limits: {
      fileSize: Number(env?.STORAGE_MAX_SIZE_MEGABYTES || 10) * 1024 * 1024,
    },
  },

  config: {
    disk: {},
    aws: {
      bucket: env.AWS_BUCKET,
    },
    digitalOcean: {
      bucket: env.DIGITAL_OCEAN_BUCKET,
    },
  },
} as IUploadConfig;

export { uploadConfig };
