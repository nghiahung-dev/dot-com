import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from './Chat.tsx';
import ChatSettings from './ChatSettings.tsx';
import ChatLayout from './layout/ChatLayout.tsx';
import ChatDetail from './ChatDetail.tsx';
import File from './File.tsx';
import AppLayout from './layout/AppLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<App />} />

          <Route path="chat" element={<ChatLayout />}>
            <Route index element={<Chat />} />
            <Route path=":chatId" element={<ChatDetail />} />
            <Route path="settings" element={<ChatSettings />} />
          </Route>

          <Route path="files/*" element={<File />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
