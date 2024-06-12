/**
 * @author huang
 * @date 2024-03-22
 * @File: sync.job.ts.py
 * @Description:
 */
import { Job, IJob } from '@midwayjs/cron';
import { FORMAT } from '@midwayjs/core';

@Job('syncJob', {
    cronTime: FORMAT.CRONTAB.EVERY_PER_5_SECOND,
    // cronTime: '*/2 * * * * *',    // 每隔 2s 执行
    start: true,
})
export class DataSyncCheckerJob implements IJob {
    async onTick() {
        // ...
        console.log('111  ---->  ', 111);
    }
}
