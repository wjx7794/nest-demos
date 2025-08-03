import { ReflectionService } from '@grpc/reflection';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    // Protobuf 包名称 (与 .proto 文件定义的相匹配)，必须的
    package: 'hero',
    // .proto 文件的绝对或相对路径，必须的
    protoPath: join(__dirname, './proto/hero.proto'),
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
    /*
      1. 添加 url，否则 postman 调试不了
      2. 这里的端口不要与 main.ts 的端口一致，否则 http 服务无法使用
    */
    // 定义传输器连接的地址/端口，可选的
    url: 'localhost:30010',
  },
};
