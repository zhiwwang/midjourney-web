
const success = {
    code: 1, description: '成功', result: '8498455807619990'
};
const failed = {
    code: 9, description: '失败'
};
export default [
    {
        url: '/api/mj/trigger/submit',
        method: 'post',
        response: ({ body }) => {
            const {action, prompt, taskId, index} = body
            // 绘图
            if (action === 'IMAGINE' && prompt) {
                return success
            }
            // 选中放大
            if (action === 'UPSCALE' && taskId && index) {
                return success
            }
            // 选中变换
            if (action === 'VARIATION' && taskId && index) {
                return success
            }
            return failed;
        }
    },
    {
        url: /^\/api\/mj\/task\/(\w+)\/fetch$/,
        method: 'get',
        response: ({ url }) => {
            const id = url.match(/^\/api\/mj\/task\/(\w+)\/fetch$/)[1];
            return {
                // 动作: IMAGINE（绘图）、UPSCALE（选中放大）、VARIATION（选中变换）
                action: 'IMAGINE',
                // 任务ID
                id: id,
                // 绘图参数
                prompt: 'XX',
                // 执行的命令
                description: '/imagine XX',
                // 生成图片的url, 成功时有值
                imageUrl: 'https://cdn.discordapp.com/attachments/1109538147416682579/1113051311978590258/zhiw.wang_4278333846596866_red_hat_f11da11d-a3e5-41ae-9a52-bd97f1b65af9.png',
                // 任务状态: NOT_START（未启动）、SUBMITTED（已提交处理）、IN_PROGRESS（执行中）、FAILURE（失败）、SUCCESS（成功）
                status: '@pick(["IN_PROGRESS", "FAILURE", "SUCCESS"])',
                // 失败原因, 失败时有值
                failReason: 'MJ处理异常'
            }
        }
    }
]