import React, { useState } from 'react';
import { boolean, withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell
} from '.';
import guid from '../../utils/helpers/guid';

export default {
  title: 'Test/Flat Table',
  component: FlatTable,
  decorators: [withKnobs]
};

export const basic = () => {
  const hasStickyHead = boolean('hasStickyHead', false);
  const hasHeaderRow = boolean('hasHeaderRow', false);
  const hasClickableRows = boolean('hasClickableRows', false);
  const colorTheme = select('colorTheme', [...OptionsHelper.flatTableThemes], 'transparent');
  const processed = getTableData();
  // used to show how the table behaves constrained or on lower resolutions
  const tableSizeConstraints = {
    height: 'auto',
    width: 'auto',
    overflowX: 'auto'
  };
  let onClickFn;
  let rowWithInputs;

  if (hasStickyHead) {
    tableSizeConstraints.height = '300px';
  }

  if (hasHeaderRow) {
    tableSizeConstraints.width = '600px';
  }

  if (hasClickableRows) {
    onClickFn = action('click');
    rowWithInputs = getRowWithInputs(onClickFn, hasHeaderRow);
  }

  return (
    <div style={ tableSizeConstraints }>
      <FlatTable
        colorTheme={ colorTheme }
        hasStickyHead={ hasStickyHead }
      >
        <FlatTableHead>
          {
            <FlatTableRow key={ processed.headData.id }>
              {
                processed.headData.data.map((cellData, index) => {
                  let Component = FlatTableHeader;

                  if (index === 0 && hasHeaderRow) {
                    Component = FlatTableRowHeader;
                  }

                  return (
                    <Component key={ cellData.id }>
                      {cellData.content}
                    </Component>
                  );
                })
              }
            </FlatTableRow>
          }
        </FlatTableHead>
        <FlatTableBody>
          {rowWithInputs}
          {
            processed.bodyData.map(rowData => (
              <FlatTableRow key={ rowData.id } onClick={ onClickFn }>
                {
                  rowData.data.map((cellData, index) => {
                    let Component = FlatTableCell;

                    if (index === 0 && hasHeaderRow) {
                      Component = FlatTableRowHeader;
                    }

                    return (
                      <Component key={ cellData.id } align={ cellData.align }>
                        {cellData.content}
                      </Component>
                    );
                  })
                }
              </FlatTableRow>
            ))
          }
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const Sortable = () => {
  const headData = ['Client', 'Total'];
  const bodyData = [{
    client: 'Jason Atkinson',
    total: 1349
  },
  {
    client: 'Monty Parker',
    total: 849
  },
  {
    client: 'Blake Sutton',
    total: 3840
  },
  {
    client: 'Tyler Webb',
    total: 280
  }];

  const [data, setData] = useState(bodyData);

  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <FlatTable colorTheme='dark'>
      <FlatTableHead>
        <FlatTableRow>
          {
            headData.map((dataItem) => {
              return (
                <FlatTableHeader onClick={ handleClick } key={ dataItem }>
                  {dataItem}
                </FlatTableHeader>
              );
            })
          }
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {
          data.map((dataItem) => {
            return (
              <FlatTableRow key={ dataItem.client }>
                <FlatTableRowHeader>{dataItem.client}</FlatTableRowHeader>
                <FlatTableRowHeader>{dataItem.total}</FlatTableRowHeader>
              </FlatTableRow>
            );
          })
        }
      </FlatTableBody>
    </FlatTable>
  );
};

basic.story = {
  name: 'Basic',
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    }
  }
};

const headRowData = {
  client: 'Client',
  clientType: 'Client Type',
  categories: 'Categories',
  products: 'Products',
  finalAccDue: 'Final Account Due',
  corpTaxDue: 'Corp Tax Due',
  vatDue: 'VAT due'
};

const rowData = {
  client: (<div><h5 style={ { margin: 0 } }>Soylent Corp</h5>John Doe</div>),
  clientType: 'business',
  categories: 'Group1, Group2, Group3',
  products: 'Accounting',
  finalAccDue: '12/12/20',
  corpTaxDue: '20/12/20',
  vatDue: '25/12/20'
};

function getRowWithInputs(onClickFn, hasHeaderRow) {
  let firstRow = <FlatTableCell>Row with inputs</FlatTableCell>;

  if (hasHeaderRow) {
    firstRow = <FlatTableRowHeader>Row with inputs</FlatTableRowHeader>;
  }

  return (
    <FlatTableRow key='rowWithInputs' onClick={ onClickFn }>
      {firstRow}
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
    </FlatTableRow>
  );
}

function getTableData() {
  return processJsonData({
    labels: headRowData,
    clients: renderBody(8)
  });
}

function renderBody(rowCount) {
  const rows = [...Array(rowCount)];

  return rows.map(() => {
    return rowData;
  });
}

function processJsonData({ labels, clients }) {
  return {
    headData: {
      id: guid(),
      data: processRowData(labels, 'header')
    },
    bodyData: clients.map((row) => {
      return {
        id: guid(),
        data: processRowData(row, 'cell')
      };
    })
  };
}

function processRowData(row, cellType) {
  return Object.keys(row).map((columnKey) => {
    let align = 'left';

    if (['finalAccDue', 'corpTaxDue', 'vatDue'].includes(columnKey)) {
      align = 'right';
    }

    return {
      id: guid(),
      content: row[columnKey],
      cellType,
      align
    };
  });
}
