export enum Operator {
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Divide = "/",
  SquarePower = "x²",
  SquareRoot = "√",
  Modulo = "%",
  Backspace = "⌫",
  Clear = "⮌",
  Solve = "=",
}

export enum Symbol {
  Zero = "0",
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Comma = ",",
  ParenthesisLeft = "(",
  ParenthesisRight = ")",
}

export type Token = Operator | Symbol;

export function tokenToString(token: Token): string {
  if (token in Operator) {
    return Operator[token as unknown as keyof typeof Operator];
  } else {
    return Symbol[token as unknown as keyof typeof Symbol];
  }
}
