import { ALL, Controller, Fields, Get, Post } from '@midwayjs/core';
import { ApiResponse } from '@midwayjs/swagger';
import { CommonResponse } from '../interface';
import { successWithData, successWithoutData } from '../common/response';
import { UserFormDTO } from '../dto/user.dto';
import { Validate } from '@midwayjs/validate';
import { Inject } from '@midwayjs/decorator';
import { SysService } from '../service/sys.service';

@Controller('/sys')
export class SysController {
    @Inject()
    sysService: SysService;
    // 注册
    @Post('/register')
    @ApiResponse({})
    async register(@Fields(ALL) form: UserFormDTO): Promise<CommonResponse> {
        await this.sysService.register(form);
        return successWithoutData();
    }

    @Post('/login')
    @Validate()
    async login(@Fields() form: UserFormDTO): Promise<CommonResponse> {
        const result = await this.sysService.login(form);
        return successWithData(result);
    }
}

@Controller('/')
export class IndexController {
    @Get('/')
    async home(): Promise<string> {
        return 'Hello Midway!';
    }
}
