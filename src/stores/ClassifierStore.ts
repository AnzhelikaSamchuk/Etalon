import { makeObservable, observable } from "mobx";
import IClassifierDto from "../shared/interfaces/IClassifierDto";

class ClassifierStore {
  public waiting = false;

  //public classifier: ClassifierModel[] = [];

  public data: IClassifierDto = {
    id: 'root',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1',
      },
      {
        id: '2',
        name: 'Child - 2',
        children: [
          {
            id: '3',
            name: 'Child - 3',
            children: [
              {
                id: '4',
                name: 'Child - 4',
              },
              {
                id: '5',
                name: 'Child - 5',
              },
            ],
          },
        ],
      },
    ],
  };


  constructor() {
    makeObservable(this, {
      waiting: observable,
      /*classifier: observable,*/
      data: observable,
    });
  }
}

export default new ClassifierStore();
