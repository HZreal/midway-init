import {
    Controller,
    Get,
    Query,
    ALL,
    Inject,
    Logger,
    Post,
    Files,
    Fields,
    Config,
    sleep,
    // sleep,
} from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { pageSortDTO } from '../model/dto/common.dto';
import { ILogger } from '@midwayjs/logger';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/demo')
export class DemoController {
    @Inject()
    ctx;

    @Config('baseDir')
    baseDir;

    @Inject()
    logger: ILogger;

    // 应用级别的日志记录
    @Logger()
    appLogger: ILogger;

    @Logger('httpLogger')
    httpLogger: ILogger;

    @Get('/validate')
    @Validate()
    async validate(@Query(ALL) query: pageSortDTO) {
        console.log('query;  ---->  ', query);
        return 'for test ';
    }

    @Get('/logger')
    @Validate()
    async log() {
        // 两者等价
        this.logger.info('');
        this.ctx.logger.info('');

        // 应用级别的日志记录
        this.appLogger.info('');

        return 'for logger demo ';
    }

    /**
     * 文件上传
     * 流式接收前端的文件，通过管道存到写流
     * 此方式需要循环检测写流文件的大小。当达到最大值（需要前端传递文件大小值）时才能响应，否则会因为过早响应导致无法完全写入
     * @param files
     * @param fields
     */
    @Post('/upload')
    async upload(@Files() files, @Fields() fields) {
        if (!files || files?.length === 0) {
            return { msg: 'No files' };
        }
        if (!fields || fields?.size === undefined) {
            return { msg: 'size not specified' };
        }

        const [file] = files;
        const { size } = fields;

        const readStream = file.data;
        const _path = path.join(this.baseDir, 'public', file.filename);
        const writeStream = fs.createWriteStream(_path);
        readStream.pipe(writeStream);
        // await sleep(4000); // 文件流传输需要时间。

        let _size = 0;
        do {
            // 每 0.5 s 检测一次文件大小，达到最大值则认为文件流传输完成
            await sleep(500);
            const f = fs.statSync(_path);
            _size = f.size;
        } while (_size < size);

        return { code: 0 };
    }

    /**
     * 文件上传
     * 流式接收前端的文件，通过管道存到写流
     * 此方式需要监控写文件流的流关闭事件。当流写入通道关闭时才能响应，否则会因为过早响应导致无法完全写入
     * 此方式较上一种，无需前端传递文件大小
     * @param files
     * @param fields
     */
    @Post('/upload2')
    async upload2(@Files() files) {
        if (!files || files?.length === 0) {
            return { msg: 'No files' };
        }

        const [file] = files;

        const readStream = file.data;
        const _path = path.join(this.baseDir, 'public', file.filename);
        const writeStream = fs.createWriteStream(_path);
        readStream.pipe(writeStream);
        // await sleep(4000); // 文件流传输需要时间。

        let isWriteStreamClosed = false;
        writeStream.on('close', () => {
            isWriteStreamClosed = true;
        });

        do {
            // 每 0.5 s 检测一次文件流是否关闭，当 isWriteStreamClosed=true 时退出循环
            await sleep(500);
        } while (!isWriteStreamClosed);

        return { code: 0 };
    }

    /**
     * 文件下载（全量）
     */
    @Get('/getStream')
    async entireStream() {
        const videoPath = path.join(this.baseDir, 'public', '348.MP4');

        // this.ctx.set('Content-Range', `bytes ${start}-${end}/${videoSize}`);
        // this.ctx.set('Accept-Ranges', 'bytes');
        // this.ctx.set('Content-Length', String(contentLength));
        this.ctx.set('Content-Type', 'video/mp4');
        const videoStream = fs.createReadStream(videoPath);
        return videoStream;
    }

    /**
     * 文件下载（间断传输）
     */
    @Get('/getStreamInRange')
    async stream() {
        const range = this.ctx.get('range');
        const videoPath = '/Users/huang/Downloads/348.MP4';

        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        this.ctx.status = 206;
        this.ctx.set('Content-Range', `bytes ${start}-${end}/${videoSize}`);
        this.ctx.set('Accept-Ranges', 'bytes');
        this.ctx.set('Content-Length', String(contentLength));
        this.ctx.set('Content-Type', 'video/mp4');
        const videoStream = fs.createReadStream(videoPath, { start, end });
        return videoStream;
    }
}
