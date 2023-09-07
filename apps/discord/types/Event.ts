import Client from "../Client";

type Event = {
  name: string;
  callback: (client: Client, ...args: any[]) => void;
};

export default Event;
