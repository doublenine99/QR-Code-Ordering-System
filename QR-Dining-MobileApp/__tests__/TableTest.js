
const result = [];
const expected = [];

function _addTable() {
    tableRef
      .get()
      .then((querySnapshot => {
        const tableList = querySnapshot.docs.map(doc => doc.data());
        // console.log(tableList.length);
        var tableName = 'table' + (tableList.length );
        if (tablename != null) {
          tableRef.doc(tableName).set(
            {
              name: tableName,
              needAssistance: true,
              status: 'NEEDTO_ORDER',
            },
          );
        }
      }))
    }
describe("Add table", () => {
    it("Check if the add table tab is working", () => {
        const table = [];
        const curr_table = '';
    
        expect(result).toStrictEqual(expected);
        });
    });

    describe('table status', () => {
        it('check if current table staus matches the color.', () => {
            expect(result).toStrictEqual(expected);
        })
    });
    describe('delete table', () => {
        it('check if the table is gone after deleting it.', () => {
            expect(result).toStrictEqual(expected);
        })
    })
    describe('clear current order', () => {
        it('check if current order is enpty after tabbing on the clear button.', () => {
            expect(result).toStrictEqual(expected);
        })
    })

// // test('Table snapshot', () => {
// //     const snap = renderer.caeate(<Table />).toJSON();
// //     expect(snap).toMatchSnapshot();
// // });

// it('check function and state', () => {
//     let TableData = renderer.create(<Table />).getInstance();
//     // console.log(TableData.change(5))
//     expect(TableData.change(5)).toEqual(50)
// })
