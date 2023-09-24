import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseSource } from "src/database/interface/database.interface";
import { PrimaryDataSource } from "src/database/primary/primary.data-source";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "./.env"
        }),
        TypeOrmModule.forRootAsync({
            name: DatabaseSource.Primary,
            useFactory: () => ({}),
            dataSourceFactory: async () => {
                return await PrimaryDataSource.initialize();
            },
        }),
    ],
})
export class AppModule { }