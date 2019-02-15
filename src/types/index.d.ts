interface IRenderOptions {
  prev: IMonthChange;
  next: IMonthChange;
  selectedDate: IMonthChange;
}

interface ILocaleData {
  [key: string]: string[];
}

interface IDataObject {
  [key: string]: any;
}

interface IDateOptions {
  startDay: IDateObject;
  endDay: IDateObject;
}

interface IDateObject {
  [key: string]: any;
}

type IMonthChange = (date: IDateOptions) => any;

type IRenderHeader = (control: IRenderOptions) => any;
