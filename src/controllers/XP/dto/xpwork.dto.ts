import { IsNotEmpty, IsString } from 'class-validator';
/**
 * @openapi
 * components:
 *  schemas:
 *    XpByWork:
 *      type: object
 *      required:
 *        - name
 *
 *      properties:
 *        name:
 *          type: string
 *          default: Kash#4240
 *
 *
 *
 */

class XpByWorkDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
export default XpByWorkDto;
