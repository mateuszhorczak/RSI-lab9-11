import { create } from 'xmlbuilder2';
interface Message {
  id: number,
  name: string,
  text: string,
}
function arrayToXML(items: Message[]) {
  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('items');

  items.forEach(item => {
    root.ele('item')
      .ele('id').txt(item.id.toString()).up()
      .ele('name').txt(item.name).up()
      .ele('text').txt(item.text).up()
  });

  return root.end({ prettyPrint: true });
}

export default defineEventHandler(async (event) => {
  const items = [
    { id: 1, name: "Item 1", text: 'pierwsza wiadomosc' },
    { id: 2, name: "Item 2", text: 'druga wiadomosc' },
    { id: 3, name: "Item 3", text: 'trzecia wiadomosc' },
  ];

  const xml = arrayToXML(items);

  setHeader(event, 'Content-Type', 'application/xml');
  return xml;
});
