export default defineEventHandler(async (event) => {
  return [
    { id: 1, name: "Item 1", text: 'pierwsza wiadomosc' },
    { id: 2, name: "Item 2", text: 'druga wiadomosc' },
    { id: 3, name: "Item 3", text: 'trzecia wiadomosc' },
  ];
});
