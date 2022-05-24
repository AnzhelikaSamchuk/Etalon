export default interface IClassifierDto {
  id: string;
  name: string;
  children?: readonly IClassifierDto[];
}