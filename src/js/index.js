/*
* This file serves as the entry point for the application.
*/

import { initTabs } from './tab-switching.js';
import { accordianMenu } from './accordian-menu.js';
import { initDrawingTools } from './draw-tools.js';
import { fileHandler } from './file-handler.js';
import { initRegenerateModel } from './model-options.js';
import { initExporter } from './exporter.js';
import { setupModelDimensionSync } from './model-dimension-sync.js';
import { initToggleVerticalExaggeration } from './toggle-vertical-exaggeration.js';

// import { initRenderMaskOnCanvas } from './renderMaskOnCanvas.js';

initTabs();
accordianMenu();
initDrawingTools();
fileHandler();
initRegenerateModel();
initExporter();

document.addEventListener('DOMContentLoaded', () => {
  setupModelDimensionSync();
  initToggleVerticalExaggeration();
});

// initRenderMaskOnCanvas();