const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const getMinifiedRecords = (records) => {
  return (records = records.map((record) => {
    return getMinifiedRecord(record);
  }));
};

// extracting the "fields" key from all the records, because all the rest of airtable meta data is not important
const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const findRecordByFilter = async (id) => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findCoffeeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
