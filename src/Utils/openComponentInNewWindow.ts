// utils/openInNewWindow.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

export function openComponentInNewWindow(Component: React.ReactNode, title = 'Nueva Ventana') {
  const newWindow = window.open('', '_blank', 'width=600,height=600');

  if (newWindow) {
    newWindow.document.title = title;

    const div = newWindow.document.createElement('div');
    newWindow.document.body.appendChild(div);

    const root = ReactDOM.createRoot(div);
    root.render(Component);
  } else {
    alert('No se pudo abrir la nueva ventana. ¿Está bloqueada por el navegador?');
  }
}
