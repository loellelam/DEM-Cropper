/*
* This file serves as the entry point for the application.
*/

import { initTabs } from './tab-switching.js';
import { accordianMenu } from './accordian-menu.js';
import { initDrawingTools } from './draw-tools.js';
import { fileHandler } from './file-handler.js';
import { initExporter } from './exporter.js';

// import { initRenderMaskOnCanvas } from './renderMaskOnCanvas.js';

initTabs();
accordianMenu();
initDrawingTools();
fileHandler();
initExporter();

// initRenderMaskOnCanvas();