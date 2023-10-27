import {IsNotEmpty} from "class-validator";

export class UserDto {

    @IsNotEmpty({message: "昵称不能为空!"})
    public nickName: string;

    @IsNotEmpty({message: "密码不能为空!"})
    public password: string;
}
