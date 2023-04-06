import { Controller, Get, Query, ALL } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { pageSortDTO } from '../dto/pageSort.dto';

@Controller('/demo')
export class DemoController {
    @Get('/validate')
    @Validate()
    async validate(@Query(ALL) query: pageSortDTO) {
        console.log('query;  ---->  ', query);
        return 'for test ';
    }
}
