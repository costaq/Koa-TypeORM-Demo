type Config = {
    morgan: string;
    port: number;
}

const config: Config = {
    morgan: 'tiny', // 日志类型
    port: 4500
}

export default config;