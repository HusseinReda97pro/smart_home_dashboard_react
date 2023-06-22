import React from 'react';

const Table = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>

        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;