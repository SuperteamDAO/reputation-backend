import { IsNotEmpty, IsString } from 'class-validator';

class XpBySkillDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
export default XpBySkillDto;
