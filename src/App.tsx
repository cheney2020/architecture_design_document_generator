/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './pages/ProjectList';
import ProjectEdit from './pages/ProjectEdit';
import ExportPreview from './pages/ExportPreview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/project/:id" element={<ProjectEdit />} />
        <Route path="/project/:id/export" element={<ExportPreview />} />
      </Routes>
    </BrowserRouter>
  );
}
