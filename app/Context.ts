import { Context, createContext } from "vm";

const contextDefault: any = null

export const AppContext:Context = createContext({contextDefault})