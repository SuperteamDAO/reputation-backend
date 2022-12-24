import { IsNotEmpty, IsString } from 'class-validator';

class XpByWorkDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
export default XpByWorkDto;
