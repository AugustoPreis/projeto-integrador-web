import React from 'react';

export default function ItemRender({ title, children }) {

  return (
    <React.Fragment>
      <div>
        <b style={{ opacity: 0.9 }}>
          {title}
        </b>
      </div>
      {children}
    </React.Fragment>
  );
}