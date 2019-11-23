import React from 'react';
import 'react-native';
import Table from '../screens/Table.js';
import renderer from 'react-test-renderer';

// test('Table snapshot', () => {
//     const snap = renderer.caeate(<Table />).toJSON();
//     expect(snap).toMatchSnapshot();
// });

it('check function and state', () => {
    let TableData = renderer.create(<Table />).getInstance();
    // console.log(TableData.change(5))
    expect(TableData.change(5)).toEqual(50)
})
