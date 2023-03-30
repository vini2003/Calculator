import React, { useRef, useState } from "react";
import "./App.scss";
import Button from "./components/button/Button";
import * as math from "mathjs";
import { Operator, Symbol, Token } from "./math/Operation";
import Input from "./components/input/Input";
import History from "./components/history/History";

export interface AppState {
  content?: string;
  setContent?: (content: string) => void;
}

export const AppStateContext = React.createContext<AppState>(undefined);

export const useAppContext = () => React.useContext(AppStateContext);

function App() {
  const appState: AppState = {
  };

  const [history, setHistory] = useState<string[]>([]);

  const compound = useRef<Token>(undefined);

  function handleOnClick(token: Token) {
    if (token == Operator.Solve) {
      if (appState.content && appState.content.length > 0) {
        const evalute = math.evaluate(appState.content).toString();
        appState.setContent(evalute);

        setTimeout(() => {
          appState.setContent('');
        }, 1000);

        history.unshift(appState.content + " = " + evalute);
        setHistory([ ...history ]);
      }
    } else if (token == Operator.Clear) {
      appState.setContent("");
    } else if (token == Operator.Backspace) {
      if (appState.content && appState.content.length > 0) {
        appState.setContent(appState.content.slice(0, -1));
      }
    } else if (token == Operator.SquareRoot || token == Operator.SquarePower) {
      if (compound.current == undefined) {
        compound.current = token;
      }
    } else {
      if (compound.current == Operator.SquareRoot) {
        appState.setContent(appState.content + "sqrt(" + token + ")");
        compound.current = undefined;
      } else if (compound.current == Operator.SquarePower) {
        appState.setContent(appState.content + "pow(" + token + ", 2)");
        compound.current = undefined;
      } else {
        appState.setContent(appState.content + token);
      }
    }
  }

  return (
    <AppStateContext.Provider value={appState}>
      <div className="list w-full h-32">
        {
          history.reverse().map((value, index) => {
            console.log(value);
            return <History content={value} key={index} />;
          })
        }
      </div>
      <Input></Input>
      <br />
      <div className="grid grid-cols-6 gap-[0.5rem]">
        <Button label={"7"} key={Symbol.Seven} onClick={() => handleOnClick(Symbol.Seven)} />
        <Button label={"8"} key={Symbol.Eight} onClick={() => handleOnClick(Symbol.Eight)} />
        <Button label={"9"} key={Symbol.Nine} onClick={() => handleOnClick(Symbol.Nine)} />
        <Button label={"÷"} key={Operator.Divide} onClick={() => handleOnClick(Operator.Divide)} />
        <Button label={"⮌"} key={Operator.Clear} onClick={() => handleOnClick(Operator.Clear)} />
        <Button label={"⌫"} key={Operator.Backspace} onClick={() => handleOnClick(Operator.Backspace)} />
        <Button label={"4"} key={Symbol.Four} onClick={() => handleOnClick(Symbol.Four)} />
        <Button label={"5"} key={Symbol.Five} onClick={() => handleOnClick(Symbol.Five)} />
        <Button label={"6"} key={Symbol.Six} onClick={() => handleOnClick(Symbol.Six)} />
        <Button label={"*"} key={Operator.Multiply} onClick={() => handleOnClick(Operator.Multiply)} />
        <Button label={"("} key={Symbol.ParenthesisLeft} onClick={() => handleOnClick(Symbol.ParenthesisLeft)} />
        <Button label={")"} key={Symbol.ParenthesisRight} onClick={() => handleOnClick(Symbol.ParenthesisRight)} />
        <Button label={"1"} key={Symbol.One} onClick={() => handleOnClick(Symbol.One)} />
        <Button label={"2"} key={Symbol.Two} onClick={() => handleOnClick(Symbol.Two)} />
        <Button label={"3"} key={Symbol.Three} onClick={() => handleOnClick(Symbol.Three)} />
        <Button label={"-"} key={Operator.Subtract} onClick={() => handleOnClick(Operator.Subtract)} />
        <Button label={"x²"} key={Operator.SquarePower} onClick={() => handleOnClick(Operator.SquarePower)} />
        <Button label={"√"} key={Operator.SquareRoot} onClick={() => handleOnClick(Operator.SquareRoot)} />
        <Button label={"0"} key={Symbol.Zero} onClick={() => handleOnClick(Symbol.Zero)} />
        <Button label={","} key={Symbol.Comma} onClick={() => handleOnClick(Symbol.Comma)} />
        <Button label={"%"} key={Operator.Modulo} onClick={() => handleOnClick(Operator.Modulo)} />
        <Button label={"+"} key={Operator.Add} onClick={() => handleOnClick(Operator.Add)} />
        <div className="col-span-2">
          <Button label={"="} key={Operator.Solve} onClick={() => handleOnClick(Operator.Solve)}
                  important={true}></Button>
        </div>
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
