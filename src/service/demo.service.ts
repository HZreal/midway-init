import { Inject, Provide } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class DemoService {
    @Inject()
    redisService: RedisService;

    async redisDemo() {
        // https://midwayjs.org/docs/extensions/redis

        // 获取
        const value = await this.redisService.get('key');
        console.log('value  ---->  ', value);

        // 设置
        await this.redisService.set('key', 'value');
        // 设置过期时间，单位秒
        await this.redisService.set('foo', 'bar', 'EX', 10);
    }
}
