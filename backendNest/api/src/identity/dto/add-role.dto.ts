import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: "Должно быть строкой"})
    readonly name: string;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly identityId: number;
}