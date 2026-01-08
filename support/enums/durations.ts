export const seconds = (n: number) => n * 1000;
export const minutes = (n: number) => seconds(n) * 60;

export enum Durations {
  HALF_SECOND = 500,
  ONE_SECOND = seconds(1),
  TWO_SECONDS = seconds(2),
  FIVE_SECONDS = seconds(5),
  TEN_SECONDS = seconds(10),
  THIRTY_SECONDS = seconds(30),
  ONE_MINUTE = minutes(1),
  TWO_MINUTES = minutes(2),
}